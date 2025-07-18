import OrderTable from "./OrderTable";

const OrderHeader = () => (
  <div className="d-flex justify-content-between align-items-center m-3 ">
    <h4>Orders</h4>
    <div>
      <button className="btn btn-outline-primary me-2" disabled>
        Export
      </button>
    </div>
  </div>
);
const Orders = () => {
  return (
    <div className="w-100">
      <OrderHeader />
      <OrderTable />
    </div>
  );
};
export default Orders;
