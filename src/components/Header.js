import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeUserState } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { persistor } from "../redux/store";

const Header = ({ userName }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(changeUserState({ name: "", status: false }));
    persistor.purge();
    navigate("/sign-in");
  };

  return (
    <div className="header sticky-top ">
      <div className="container-fluid">
        <div className="d-flex justify-content-between align-items-center">
          {/* Left content (like logo or menu toggle) */}
          <div className="fw-bold fs-5"></div>

          {/* Right content */}
          <div className="d-flex align-items-center gap-3">
            <div className="me-3">
              <i class="bi bi-person-circle pe-2"></i>
              {userName}
            </div>
            <div onClick={handleLogout} style={{ cursor: "pointer" }}>
              <i class="bi bi-box-arrow-left pe-2"></i>
              Logout
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
