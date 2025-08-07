import { useSelector } from "react-redux";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Navigate, Outlet } from "react-router-dom";

const Dashboard = () => {
  const { name, status, photoUrl } = useSelector((state) => state.user);

  if (!status) return <Navigate to="/sign-in" replace />;
  return (
    <div className=" content-container d-flex flex-column">
      <div className="d-flex " style={{ minHeight: "100vh" }}>
        <Sidebar />
        <div
          className="d-flex flex-column flex-wrap mt-0"
          style={{
            marginTop: "0px",
            marginLeft: "240px",
            width: "100%",
          }}
        >
          <Header userName={name} photoUrl={photoUrl} />

          <div className="content-container">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
