import { useState } from "react";

const TopCustomers = () => {
  const [topCustomers, setTopCustomers] = useState([]);
  return (
    <div className="col-lg-6">
      <div className="card shadow-sm border-0 h-100">
        <div className="card-header bg-white border-bottom">
          <h5 className="mb-0 fw-semibold">⭐ Top Customers</h5>
        </div>
        <div className="card-body p-0">
          <table className="table table-hover table-borderless mb-0">
            <thead className="table-light">
              <tr>
                <th>Customer ID</th>
                <th>Customer Name</th>
                <th>Orders</th>
                <th>Revenue</th>
              </tr>
            </thead>
            <tbody>
              {topCustomers.map((customer, idx) => (
                <tr key={idx}>
                  <td>{customer.id}</td>
                  <td>{customer.customerName}</td>
                  <td>{customer.orders}</td>
                  <td>{customer.revenue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TopCustomers;
