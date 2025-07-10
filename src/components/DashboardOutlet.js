import { useEffect } from "react";
const DashboardOutlet = () => {
  // Sample data for the dashboard
  const statsData = [
    {
      title: "Revenue",
      value: "$10.54",
      change: "22.45%",
      changeType: "increase",
      icon: "📈",
      color: "primary",
    },
    {
      title: "Orders",
      value: "1,056",
      change: "15.34%",
      changeType: "decrease",
      icon: "📦",
      color: "info",
    },
    {
      title: "Unique Visits",
      value: "5,420",
      change: "10.24%",
      changeType: "increase",
      icon: "👥",
      color: "warning",
    },
    {
      title: "New Users",
      value: "1,650",
      change: "15.34%",
      changeType: "increase",
      icon: "👤",
      color: "success",
    },
    {
      title: "Existing User",
      value: "9,653",
      change: "22.45%",
      changeType: "increase",
      icon: "📊",
      color: "primary",
    },
  ];

  const recentTransactions = [
    {
      name: "Jagarnath S.",
      date: "24.05.2023",
      amount: "$124.97",
      status: "Paid",
    },
    {
      name: "Anand G.",
      date: "23.05.2023",
      amount: "$55.42",
      status: "Pending",
    },
    { name: "Kartik S.", date: "23.05.2023", amount: "$89.90", status: "Paid" },
    {
      name: "Rakesh S.",
      date: "22.05.2023",
      amount: "$144.84",
      status: "Pending",
    },
    { name: "Anup S.", date: "22.05.2023", amount: "$70.52", status: "Paid" },
  ];

  const topProducts = [
    { name: "Men Grey Hoodie", price: "$49.90", units: 204, image: "🧥" },
    { name: "Women Striped T-Shirt", price: "$34.90", units: 155, image: "👕" },
    { name: "Wome White T-Shirt", price: "$40.90", units: 120, image: "👚" },
    { name: "Men White T-Shirt", price: "$49.90", units: 204, image: "👔" },
    { name: "Women Red T-Shirt", price: "$34.90", units: 155, image: "👗" },
  ];

  useEffect(() => {
    const tooltipTriggerList = document.querySelectorAll(
      '[data-bs-toggle="tooltip"]'
    );
    tooltipTriggerList.forEach((tooltipTriggerEl) => {
      new window.bootstrap.Tooltip(tooltipTriggerEl);
    });
  }, []);

  return (
    <div
      className="container-fluid p-4"
      style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}
    >
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold mb-0">Dashboard</h2>
        <button className="btn btn-outline-primary btn-sm" disabled>
          <i className="bi bi-gear"></i> Manage
        </button>
      </div>

      {/* Stats Cards */}
      <div className="row mb-4">
        {statsData.map((stat, index) => (
          <div key={index} className="col-md-2 col-sm-6 mb-3">
            <div
              className="card h-100 border-0 shadow-sm stat-card"
              style={{ transition: "transform 0.2s, box-shadow 0.2s" }}
            >
              <div className="card-body p-3">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <div>
                    <h6 className="card-subtitle mb-1 text-muted small">
                      {stat.title}
                    </h6>
                    <h4 className="card-title mb-0 fw-bold">{stat.value}</h4>
                  </div>
                  <div
                    className={`text-${stat.color} fs-4`}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title={stat.title}
                  >
                    <i className={`bi ${stat.icon}`}></i>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <span
                    className={`badge ${
                      stat.changeType === "increase"
                        ? "bg-success"
                        : "bg-danger"
                    } me-1`}
                  >
                    {stat.changeType === "increase" ? "↗" : "↘"} {stat.change}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Charts Section */}
      <div className="row g-3 mb-4">
        {/* Orders Over Time */}
        <div className="col-lg-8">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-header bg-white border-bottom d-flex justify-content-between">
              <h5 className="mb-0 fw-semibold">📦 Orders Over Time</h5>
              <button className="btn btn-sm btn-outline-secondary">
                Last 12 Hours
              </button>
            </div>
            <div className="card-body">
              <div className="row text-center mb-4">
                <div className="col">
                  <h4 className="fw-bold">645</h4>
                  <div className="text-muted small">May 22</div>
                </div>
                <div className="col">
                  <h4 className="fw-bold">472</h4>
                  <div className="text-muted small">May 21</div>
                </div>
              </div>
              {/* Simulated Chart */}
              <div
                className="position-relative bg-light rounded"
                style={{ height: 200 }}
              >
                <svg width="100%" height="100%">
                  <polyline
                    fill="none"
                    stroke="#0d6efd"
                    strokeWidth="2"
                    points="20,150 60,120 100,100 140,80 180,60 220,90 260,70 300,50 340,80 380,60 420,40 460,60"
                  />
                  <polyline
                    fill="none"
                    stroke="#6c757d"
                    strokeWidth="2"
                    points="20,170 60,160 100,140 140,130 180,120 220,140 260,130 300,110 340,130 380,120 420,100 460,120"
                  />
                </svg>
              </div>
              <div className="d-flex justify-content-center mt-3 gap-4">
                <div className="d-flex align-items-center">
                  <div
                    className="bg-secondary rounded-circle me-2"
                    style={{ width: 10, height: 10 }}
                  ></div>
                  <small className="text-muted">May 21</small>
                </div>
                <div className="d-flex align-items-center">
                  <div
                    className="bg-primary rounded-circle me-2"
                    style={{ width: 10, height: 10 }}
                  ></div>
                  <small className="text-muted">May 22</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Last 7 Days Sales */}
        <div className="col-lg-4">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-header bg-white border-bottom">
              <h5 className="mb-0 fw-semibold">🛒 Last 7 Days Sales</h5>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <h4 className="fw-bold">1,259</h4>
                <div className="text-muted small">Items Sold</div>
              </div>
              <div className="mb-3">
                <h4 className="fw-bold">$12,546</h4>
                <div className="text-muted small">Revenue</div>
              </div>
              {/* Simulated Bars */}
              <div
                className="d-flex align-items-end justify-content-between"
                style={{ height: 120 }}
              >
                {[40, 60, 45, 80, 70, 90, 100].map((height, i) => (
                  <div key={i} className="text-center">
                    <div
                      className={`rounded-top ${
                        i === 6 ? "bg-success" : "bg-secondary"
                      }`}
                      style={{ width: 12, height }}
                    ></div>
                    <small className="text-muted d-block mt-1">{15 + i}</small>
                  </div>
                ))}
              </div>
              <div className="text-center mt-3">
                <span className="badge bg-dark px-3 py-2">$2,525</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tables Section */}
      <div className="row g-3">
        {/* Recent Transactions */}
        <div className="col-lg-6">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-header bg-white border-bottom">
              <h5 className="mb-0 fw-semibold">💰 Recent Transactions</h5>
            </div>
            <div className="card-body p-0">
              <table className="table table-hover table-borderless mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Name</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTransactions.map((txn, idx) => (
                    <tr key={idx}>
                      <td>{txn.name}</td>
                      <td className="text-muted">{txn.date}</td>
                      <td className="fw-semibold">{txn.amount}</td>
                      <td>
                        <span
                          className={`badge rounded-pill ${
                            txn.status === "Paid"
                              ? "bg-success"
                              : "bg-warning text-dark"
                          }`}
                        >
                          {txn.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Top Products */}
        <div className="col-lg-6">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-header bg-white border-bottom">
              <h5 className="mb-0 fw-semibold">⭐ Top Products</h5>
            </div>
            <div className="card-body p-0">
              <table className="table table-hover table-borderless mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Units</th>
                    <th>Icon</th>
                  </tr>
                </thead>
                <tbody>
                  {topProducts.map((product, idx) => (
                    <tr key={idx}>
                      <td>{product.name}</td>
                      <td>{product.price}</td>
                      <td>{product.units}</td>
                      <td>{product.image}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOutlet;
