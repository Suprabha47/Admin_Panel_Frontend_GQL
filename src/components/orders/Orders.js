import OrderTable from "./OrderTable";
import { handleOrderExport } from "../../utils/dataExport";
import { useQuery } from "@apollo/client";

import { useEffect, useState } from "react";
import { ORDER_LISTING } from "../../apollo/orders/orderQuery";

const OrderHeader = () => {
  const [orders, setOrders] = useState([]);
  const { data, loading, error } = useQuery(ORDER_LISTING, {
    fetchPolicy: "cache-and-network",
  });
  useEffect(() => {
    if (!loading && data?.getAllOrders) {
      setOrders(data.getAllOrders);
    }
  }, [loading, data]);

  return (
    <div className="d-flex justify-content-between align-items-center m-3 ">
      <h4>Orders</h4>
      <div>
        <button
          className="btn btn-outline-primary me-2"
          onClick={() => handleOrderExport(orders)}
        >
          Export
        </button>
      </div>
    </div>
  );
};
const Orders = () => {
  return (
    <div className="w-100">
      <OrderHeader />
      <OrderTable />
    </div>
  );
};
export default Orders;
