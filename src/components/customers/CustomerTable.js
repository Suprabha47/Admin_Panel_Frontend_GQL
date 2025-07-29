import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { CUSTOMER_LISTING } from "../../apollo/customers/customerQuery";
import { useNavigate } from "react-router-dom";
import CustomerHeader from "./CustomerHeader";

const SearchFilter = () => (
  <>
    {" "}
    <div className="d-flex gap-2 w-50 my-4">
      <select className="form-select w-25">
        <option>Filter</option>
      </select>
      <input type="text" className="form-control" placeholder="Search..." />
    </div>
  </>
);

const CustomerTable = () => {
  const [customers, setCustomers] = useState([]);
  const { data, loading, error } = useQuery(CUSTOMER_LISTING, {
    fetchPolicy: "cache-and-network",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && data?.getAllCustomers) {
      console.log("datataa:: ", data.getAllCustomers);
      setCustomers(data.getAllCustomers);
      console.log("customersss: ", data.getAllCustomers);
    }
    if (error) return <>Error occurred!</>;
  }, [loading, error, data]);

  if (loading) {
    return (
      <>
        <CustomerHeader heading="table" />
        <div class="d-flex justify-content-center my-4">
          <div class="spinner-border  text-primary" role="status"></div>
        </div>
      </>
    );
  }

  return (
    <div className="container mt-4">
      <CustomerHeader customers={customers} heading="table" />
      <SearchFilter />
      <table
        className="table table-hover align-middle"
        style={{ borderCollapse: "separate", borderSpacing: "0 4px" }}
      >
        <thead>
          <tr className="table-header">
            <th className="rounded-start">
              <i class="bi bi-person-fill pe-2"></i>Name
            </th>
            <th>
              <i class="bi bi-geo-alt-fill pe-2"></i>Location
            </th>
            <th>
              <i class="bi bi-box-fill pe-2"></i>Orders
            </th>
            <th className="rounded-end">
              <i class="bi bi-currency-dollar"></i>Spent
            </th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer, index) => (
            <tr
              key={customer.id}
              onClick={() => navigate(`profile/${customer.id}`)}
              className="cursor-pointer bg-white"
              style={{ borderRadius: "12px", overflow: "hidden" }}
            >
              <td className="rounded-start align-middle">
                <div className="d-flex align-items-center gap-2">
                  {customer.customerName}
                </div>
              </td>
              <td className="align-middle">{customer.location}</td>
              <td className="align-middle">{customer.orders.length}</td>
              <td className="rounded-end align-middle">
                $
                {customer.orders.reduce(
                  (total, order) => total + order.totalAmount,
                  0
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerTable;
