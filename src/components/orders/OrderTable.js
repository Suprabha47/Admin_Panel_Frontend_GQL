import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ORDER_LISTING } from "../../apollo/orders/orderQuery";
import { UPDATE_ORDER_STATUS } from "../../apollo/orders/orderMutation";

const OrderTable = () => {
  const [orders, setOrders] = useState([]);
  const [updateOrderStatus] = useMutation(UPDATE_ORDER_STATUS);
  const { data, loading, error } = useQuery(ORDER_LISTING, {
    fetchPolicy: "no-cache",
  });
  const status = ["PENDING", "SHIPPED", "DELIVERED", "CANCELLED"];

  useEffect(() => {
    if (!loading && data?.getAllOrders) {
      console.log("ordersss: ", data.getAllOrders);
      setOrders(data.getAllOrders);
    }
  }, [loading, data]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const { data } = await updateOrderStatus({
        variables: {
          id,
          status: newStatus,
        },
      });
      console.log("update:? ", data.updateOrderStatus);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === id ? { ...order, status: newStatus } : order
        )
      );
    } catch (err) {
      console.log("error occurred: ", err);
    }
  };

  if (loading)
    return (
      <>
        <hr></hr>
        <div class="d-flex justify-content-center my-4">
          <div class="spinner-border  text-primary" role="status"></div>
        </div>
      </>
    );
  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <input
          type="text"
          className="form-control w-25"
          placeholder="Search..."
        />
      </div>

      <table className="table table-hover align-middle">
        <thead>
          <tr>
            <th>Order</th>
            <th>Date</th>
            <th>Customer</th>
            <th>Order Status</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="text-primary">#{order.id}</td>
              <td>
                {new Date(parseInt(order.createdAt)).toLocaleDateString()}
              </td>
              <td>{order.customer.customerName}</td>
              <td className="flex justify-content-between">
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order.id, e.target.value)}
                  style={{
                    color:
                      (order.status === "PENDING" && "orange") ||
                      (order.status === "SHIPPED" && "blue") ||
                      (order.status === "DELIVERED" && "green") ||
                      (order.status === "CANCELLED" && "red"),
                  }}
                >
                  {status.map((s, i) => (
                    <option key={i} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </td>
              <td>${order.totalAmount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
