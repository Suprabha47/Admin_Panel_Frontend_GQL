import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { CUSTOMER_LISTING } from "../../apollo/customers/customerQuery";
import { useNavigate } from "react-router-dom";

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
        <hr></hr>
        <div class="d-flex justify-content-center my-4">
          <div class="spinner-border  text-primary" role="status"></div>
        </div>
      </>
    );
  }

  return (
    <div className="container mt-4">
      <SearchFilter />
      {/* Customer Table */}
      <table className="table table-hover align-middle">
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Orders</th>
            <th>Spent</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer, index) => (
            <tr
              key={customer.id}
              onClick={() => navigate(`profile/${customer.id}`)}
              className=" cursor-pointer"
            >
              <td className="d-flex align-items-center gap-2">
                {customer.customerName}
              </td>
              <td>{customer.location}</td>
              <td>{customer.orders.length}</td>
              <td>
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
