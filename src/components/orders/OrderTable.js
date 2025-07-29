import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_PAGINATED_ORDERS } from "../../apollo/orders/orderQuery";
import { UPDATE_ORDER_STATUS } from "../../apollo/orders/orderMutation";

const OrderTable = () => {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5;

  const [updateOrderStatus] = useMutation(UPDATE_ORDER_STATUS);
  const { data, loading, error } = useQuery(GET_PAGINATED_ORDERS, {
    fetchPolicy: "no-cache",
    variables: {
      page,
      limit,
    },
  });
  const status = ["PENDING", "SHIPPED", "DELIVERED", "CANCELLED"];

  useEffect(() => {
    if (!loading && data?.getPaginatedOrders) {
      const { orders, totalPage } = data?.getPaginatedOrders;
      setOrders(orders);
      setTotalPages(totalPage);
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

      <table
        className="table table-hover align-middle"
        style={{ borderCollapse: "separate", borderSpacing: "0 4px" }}
      >
        <thead>
          <tr className="table-header">
            <th className="rounded-start">
              <i class="bi bi-hash pe-2"></i>Order ID
            </th>
            <th>
              <i class="bi bi-calendar-event pe-2"></i>Date
            </th>
            <th>
              <i class="bi bi-person pe-2"></i>Customer
            </th>
            <th>
              <i class="bi bi-truck pe-2"></i>Order Status
            </th>
            <th className="rounded-end">
              {" "}
              <i class="bi bi-currency-dollar pe-2"></i>Total
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="rounded-start align-middle">#{order.id}</td>
              <td className="align-middle">
                {new Date(parseInt(order.createdAt)).toLocaleDateString()}
              </td>
              <td className="align-middle">{order.customer.customerName}</td>
              <td className="flex justify-content-between align-middle">
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order.id, e.target.value)}
                  style={{
                    color: "#fff",
                    border: "none",
                    padding: "2px",
                    opacity: "0.9",
                    backgroundColor:
                      (order.status === "PENDING" && "#d6d60aff") ||
                      (order.status === "SHIPPED" && "#0c64e9ff") ||
                      (order.status === "DELIVERED" && "#12911cff") ||
                      (order.status === "CANCELLED" && "#e93c3cff"),
                  }}
                >
                  {status.map((s, i) => (
                    <option key={i} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </td>
              <td className="rounded-end align-middle">${order.totalAmount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <nav aria-label="Page navigation">
        <ul className=" pagination justify-content-center">
          <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
            >
              Previous
            </button>
          </li>
          {[...Array(totalPages)].map((_, index) => {
            const pageNum = index + 1;
            return (
              <li
                key={index}
                className={`page-item ${page === pageNum ? "active" : ""}`}
              >
                <button className="page-link" onClick={() => setPage(pageNum)}>
                  {pageNum}
                </button>
              </li>
            );
          })}
          <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default OrderTable;
