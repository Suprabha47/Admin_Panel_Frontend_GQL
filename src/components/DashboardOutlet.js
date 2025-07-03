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

  return (
    <>
      <div
        className="container-fluid p-4"
        style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}
      >
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold mb-0">Dashboard</h2>
          <button className="btn btn-outline-primary btn-sm">
            <i className="bi bi-gear"></i> Manage
          </button>
        </div>

        {/* Stats Cards Row */}
        <div className="row mb-4">
          {statsData.map((stat, index) => (
            <div key={index} className="col-md-2 col-sm-6 mb-3">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body p-3">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <div>
                      <h6 className="card-subtitle mb-1 text-muted small">
                        {stat.title}
                      </h6>
                      <h4 className="card-title mb-0 fw-bold">{stat.value}</h4>
                    </div>
                    <div className={`text-${stat.color} fs-4`}>{stat.icon}</div>
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

        {/* Charts Row */}
        <div className="row mb-4">
          {/* Orders Over Time Chart */}
          <div className="col-lg-8 mb-3">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-header bg-white border-0 d-flex justify-content-between align-items-center">
                <h5 className="mb-0 fw-bold">Orders Over Time</h5>
                <div className="dropdown">
                  <button
                    className="btn btn-sm btn-outline-secondary dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                  >
                    Last 12 Hours
                  </button>
                </div>
              </div>
              <div className="card-body">
                <div className="row mb-3">
                  <div className="col-6">
                    <h3 className="fw-bold mb-0">645</h3>
                    <small className="text-muted">Orders on May 22</small>
                  </div>
                  <div className="col-6">
                    <h3 className="fw-bold mb-0">472</h3>
                    <small className="text-muted">Orders on May 21</small>
                  </div>
                </div>

                {/* Simple Chart Representation */}
                <div
                  className="position-relative"
                  style={{
                    height: "200px",
                    backgroundColor: "#f8f9fa",
                    borderRadius: "8px",
                  }}
                >
                  <div className="position-absolute top-50 start-50 translate-middle">
                    <div className="badge bg-dark">
                      34 Orders
                      <br />
                      <small>May 22, 8:00AM</small>
                    </div>
                  </div>
                  {/* Chart lines simulation */}
                  <svg
                    width="100%"
                    height="100%"
                    style={{ position: "absolute", top: 0, left: 0 }}
                  >
                    <polyline
                      fill="none"
                      stroke="#007bff"
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

                <div className="d-flex justify-content-center mt-3">
                  <div className="d-flex align-items-center me-3">
                    <div
                      className="bg-secondary rounded-circle me-2"
                      style={{ width: "12px", height: "12px" }}
                    ></div>
                    <small className="text-muted">May 21</small>
                  </div>
                  <div className="d-flex align-items-center">
                    <div
                      className="bg-primary rounded-circle me-2"
                      style={{ width: "12px", height: "12px" }}
                    ></div>
                    <small className="text-muted">May 22</small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Last 7 Days Sales */}
          <div className="col-lg-4 mb-3">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-header bg-white border-0">
                <h5 className="mb-0 fw-bold">Last 7 Days Sales</h5>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <h3 className="fw-bold mb-0">1,259</h3>
                  <small className="text-muted">Items Sold</small>
                </div>
                <div className="mb-3">
                  <h3 className="fw-bold mb-0">$12,546</h3>
                  <small className="text-muted">Revenue</small>
                </div>

                {/* Bar Chart Simulation */}
                <div
                  className="d-flex align-items-end justify-content-between"
                  style={{ height: "120px" }}
                >
                  {[40, 60, 45, 80, 70, 90, 100].map((height, index) => (
                    <div
                      key={index}
                      className="d-flex flex-column align-items-center"
                    >
                      <div
                        className={`${
                          index === 6 ? "bg-success" : "bg-light"
                        } rounded-top`}
                        style={{
                          width: "20px",
                          height: `${height}px`,
                          marginBottom: "5px",
                        }}
                      ></div>
                      <small className="text-muted">{15 + index}</small>
                    </div>
                  ))}
                </div>

                <div className="text-center mt-2">
                  <span className="badge bg-dark">$2,525</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tables Row */}
        <div className="row">
          {/* Recent Transactions */}
          <div className="col-lg-6 mb-3">
            <div className="card border-0 shadow-sm">
              <div className="card-header bg-white border-0">
                <h5 className="mb-0 fw-bold">Recent Transactions</h5>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead className="table-light">
                      <tr>
                        <th className="border-0 fw-semibold">Name</th>
                        <th className="border-0 fw-semibold">Date</th>
                        <th className="border-0 fw-semibold">Amount</th>
                        <th className="border-0 fw-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentTransactions.map((transaction, index) => (
                        <tr key={index}>
                          <td className="border-0">{transaction.name}</td>
                          <td className="border-0 text-muted">
                            {transaction.date}
                          </td>
                          <td className="border-0 fw-semibold">
                            {transaction.amount}
                          </td>
                          <td className="border-0">
                            <span
                              className={`badge ${
                                transaction.status === "Paid"
                                  ? "bg-success"
                                  : "bg-warning"
                              }`}
                            >
                              {transaction.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Top Products */}
          <div className="col-lg-6 mb-3">
            <div className="card border-0 shadow-sm">
              <div className="card-header bg-white border-0">
                <h5 className="mb-0 fw-bold">Top Products by Units Sold</h5>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead className="table-light">
                      <tr>
                        <th className="border-0 fw-semibold">Name</th>
                        <th className="border-0 fw-semibold">Price</th>
                        <th className="border-0 fw-semibold">Units Sold</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topProducts.map((product, index) => (
                        <tr key={index}>
                          <td className="border-0">
                            <div className="d-flex align-items-center">
                              <div className="me-3 fs-4">{product.image}</div>
                              <span>{product.name}</span>
                            </div>
                          </td>
                          <td className="border-0 fw-semibold">
                            {product.price}
                          </td>
                          <td className="border-0 text-muted">
                            {product.units}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardOutlet;
