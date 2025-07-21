import { handleCustomersExport } from "../../utils/dataExport";

const CustomerHeader = ({ customers, heading }) => (
  <div className="d-flex justify-content-between align-items-center m-3 ">
    <h4>{heading === "table" ? "Customers" : "Customer Profile"}</h4>
    <div>
      {heading === "table" && (
        <button
          className="btn btn-outline-primary me-2"
          onClick={() => handleCustomersExport(customers)}
        >
          Export
        </button>
      )}
    </div>
  </div>
);

export default CustomerHeader;
