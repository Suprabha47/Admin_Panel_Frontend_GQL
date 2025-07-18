import { useRef } from "react";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import "primereact/resources/themes/lara-light-cyan/theme.css";

const CustInfoCard = ({ customer, address, handleDel }) => {
  const toast = useRef(null);
  const accept = () => {
    toast.current.show({
      severity: "warn",
      summary: "Confirmed",
      detail: "Customer Deleted!",
      life: 3000,
    });
    handleDel();
  };

  const confirm = () => {
    confirmDialog({
      message: "Do you want to delete this customer record?",
      header: "Delete Confirmation",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept,
    });
  };

  return (
    <>
      <div className="row g-4">
        {/* Left Column */}
        <div className="col-lg-8">
          {/* Customer Info */}
          <div className="card p-4">
            <div className="d-flex align-items-center mb-3">
              <div
                className="rounded-circle bg-secondary text-white d-flex justify-content-center align-items-center"
                style={{ width: 60, height: 60, fontSize: 24 }}
              >
                {customer?.customerName?.charAt(0) || " "}
              </div>
              <div className="ms-3">
                <h5 className="mb-0">{customer?.customerName || "Customer"}</h5>
                <small className="text-muted d-block">
                  {customer?.location || ""}
                </small>
                <small className="text-muted d-block">
                  {customer.orders?.length || 0} Orders.
                </small>
              </div>
              <div className="ms-auto">⭐⭐⭐⭐</div>
            </div>
          </div>

          {/* Notes */}
          <div className="card p-4 my-3">
            <h6 className="mb-2">Customer Notes</h6>
            <textarea
              className="form-control"
              rows="3"
              placeholder="Add notes about customer"
            ></textarea>
          </div>

          {/* Orders Table */}
          <div className="card p-4">
            <h6 className="mb-3">Customer Orders</h6>
            {customer?.orders?.length === 0 ? (
              "No orders to show"
            ) : (
              <table className="table">
                <thead>
                  <tr>
                    <th>Order</th>
                    <th>Date</th>
                    <th>Order Status</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {customer?.orders?.map((order, i) => (
                    <tr key={i}>
                      <td>{order.id}</td>
                      <td>
                        {new Date(
                          parseInt(order.createdAt)
                        ).toLocaleDateString()}
                      </td>
                      <td>
                        <span>{order.status}</span>
                      </td>
                      <td>${order.totalAmount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Right Column */}
        <div className="col-lg-4">
          {/* Overview */}
          <div className="card p-4 mb-3">
            <p className="mb-1">
              <strong>Address</strong>
            </p>
            <p className="text-muted">
              {!(customer?.orders?.length === 0)
                ? address
                : "No address to show."}
            </p>

            <p className="mb-1">
              <strong>Email Address</strong>
            </p>
            <p className="text-muted">{customer.customerEmailAddress}</p>
            <button
              className="btn btn-link text-danger p-0 mt-2"
              onClick={confirm}
            >
              Delete Customer
            </button>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-end mt-4">
        <button className="btn btn-light me-2">Cancel</button>
        <button className="btn btn-primary">Save</button>
      </div>
      <Toast ref={toast} />
      <ConfirmDialog />
    </>
  );
};

export default CustInfoCard;
