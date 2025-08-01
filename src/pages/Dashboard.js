import { useSelector } from "react-redux";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Navigate, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const Dashboard = () => {
  const { name, status, photoUrl } = useSelector((state) => state.user);

  if (!status) return <Navigate to="/sign-in" replace />;
  return (
    <div className="d-flex flex-column">
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
          <Outlet />
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
