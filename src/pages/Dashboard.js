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
      <Header userName={name} />
      <div className="d-flex ">
        <Sidebar />
        <Outlet />
        <ToastContainer />
      </div>
    </div>
  );
};
export default Dashboard;
