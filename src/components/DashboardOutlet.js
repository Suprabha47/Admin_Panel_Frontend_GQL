import StatsSection from "./dashboard/StatsSection";
import TopCustomers from "./dashboard/TopCutomers";

const Header = () => (
  <div className="  d-flex justify-content-between align-items-center mb-4">
    <h2 className="fw-bold mb-0">Dashboard</h2>
    <button className="btn btn-outline-primary btn-sm" disabled>
      <i className="bi bi-gear"></i> Manage
    </button>
  </div>
);
const DashboardOutlet = () => {
  // const recentTransactions = [
  //   {
  //     name: "Jagarnath S.",
  //     date: "24.05.2023",
  //     amount: "$124.97",
  //     status: "Paid",
  //   },
  //   {
  //     name: "Anand G.",
  //     date: "23.05.2023",
  //     amount: "$55.42",
  //     status: "Pending",
  //   },
  //   { name: "Kartik S.", date: "23.05.2023", amount: "$89.90", status: "Paid" },
  //   {
  //     name: "Rakesh S.",
  //     date: "22.05.2023",
  //     amount: "$144.84",
  //     status: "Pending",
  //   },
  //   { name: "Anup S.", date: "22.05.2023", amount: "$70.52", status: "Paid" },
  // ];

  return (
    <div
      className="container-fluid content-container p-4"
      style={{ minHeight: "100vh" }}
    >
      <Header />
      <StatsSection />
      {/* Charts Section */}
      <div className="row g-3 mb-4">
        {/* Orders Over Time */}
        <div className="col-lg-8">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-header border-bottom d-flex justify-content-between">
              <h5 className="mb-0 fw-semibold">
                <i className="bi bi-box-fill"></i> Orders Over Time
              </h5>
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
                className="position-relative  rounded"
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
            <div className="card-header border-bottom">
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

      {/* Tables Section
      <div className="row g-3">
      
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

        <TopCustomers />
      </div>*/}
    </div>
  );
};

export default DashboardOutlet;
