import { useState } from "react";
const couponData = [
  {
    id: 1,
    name: "Summer discount 10% off",
    code: "Summer2020",
    usage: 15,
    status: "Active",
    date: "May 5, 2020 - May 15, 2020",
  },
  {
    id: 2,
    name: "Free shipping on all items",
    code: "Shipfreemotee15",
    usage: 42,
    status: "Active",
    date: "May 5, 2020 - May 15, 2020",
  },
  {
    id: 3,
    name: "Discount for women clothes 5%",
    code: "Womenclothing5",
    usage: 76,
    status: "Expired",
    date: "Feb 14, 2020 - Feb 20, 2020",
  },
  // Add more dummy entries as needed
];

const Coupons = () => {
  const [tab, setTab] = useState("All");

  const filteredData =
    tab === "All"
      ? couponData
      : couponData.filter((item) => item.status === tab);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Coupons</h4>
        <button className="btn btn-primary">
          <i className="bi bi-plus-lg me-1"></i>Create
        </button>
      </div>

      {/* Tabs */}
      <ul className="nav nav-tabs mb-3">
        {["All", "Active", "Expired"].map((t) => (
          <li className="nav-item" key={t}>
            <button
              className={`nav-link ${tab === t ? "active" : ""}`}
              onClick={() => setTab(t)}
            >
              {t} Coupons
            </button>
          </li>
        ))}
      </ul>

      {/* Filter + Search */}
      <div className="d-flex justify-content-between mb-3">
        <select className="form-select w-auto">
          <option>Filter</option>
        </select>
        <input
          type="text"
          className="form-control w-25"
          placeholder="Search..."
        />
      </div>

      {/* Table */}
      <table className="table table-hover align-middle">
        <thead>
          <tr>
            <th>
              <input type="checkbox" />
            </th>
            <th>Coupon Name</th>
            <th>Usage</th>
            <th>Status</th>
            <th>Date</th>
            <th className="text-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((coupon) => (
            <tr key={coupon.id}>
              <td>
                <input type="checkbox" />
              </td>
              <td>
                <i className="bi bi-tag-fill text-primary me-2"></i>
                <strong>{coupon.name}</strong>
                <br />
                <small>{coupon.code}</small>
              </td>
              <td>{coupon.usage} times</td>
              <td>
                <span
                  className={`badge ${
                    coupon.status === "Active" ? "bg-success" : "bg-secondary"
                  }`}
                >
                  {coupon.status}
                </span>
              </td>
              <td>{coupon.date}</td>
              <td className="text-end">
                <button className="btn btn-outline-primary btn-sm me-2">
                  <i className="bi bi-pencil-square"></i>
                </button>
                <button className="btn btn-outline-danger btn-sm">
                  <i className="bi bi-trash3"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="d-flex justify-content-between align-items-center">
        <span>120 Results</span>
        <nav>
          <ul className="pagination mb-0">
            <li className="page-item disabled">
              <button className="page-link">&laquo;</button>
            </li>
            {[1, 2, 3, 4, 5].map((num) => (
              <li className="page-item" key={num}>
                <button className="page-link">{num}</button>
              </li>
            ))}
            <li className="page-item">
              <button className="page-link">&raquo;</button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Coupons;
