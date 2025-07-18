import { Outlet } from "react-router-dom";
import CustomerTable from "./CustomerTable";
const CustomerHeader = () => (
  <div className="d-flex justify-content-between align-items-center m-3 ">
    <h4>Customers</h4>
    <div>
      <button className="btn btn-outline-primary me-2" disabled>
        Export
      </button>
    </div>
  </div>
);
const Customers = () => {
  return (
    <div className="w-100">
      <CustomerHeader />
      <Outlet />
    </div>
  );
};
export default Customers;
