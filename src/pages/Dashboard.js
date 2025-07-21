import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const Dashboard = () => {
  const { name, status } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!status) {
      navigate("/sign-in");
    }
  }, [status]);

  if (!status) return <></>;

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
          <Header userName={name} />
          <Outlet />
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
