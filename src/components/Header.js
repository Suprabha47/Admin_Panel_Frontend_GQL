import { useDispatch } from "react-redux";
import { changeUserState } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { persistor } from "../redux/store";
import ThemeToggle from "../utils/ThemeToggle";
import { getAuth, signOut } from "firebase/auth";

const Header = ({ userName, photoUrl }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log("image: ", photoUrl);
  const handleLogout = async () => {
    const auth = getAuth();
    await signOut(auth);
    localStorage.removeItem("token");
    dispatch(changeUserState({ name: "", status: false, photoUrl: "" }));
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
              {!photoUrl || photoUrl === "null" || photoUrl === "undefined" ? (
                <i className="bi bi-person-circle pe-2"></i>
              ) : (
                <img
                  src={String(photoUrl)}
                  alt="User"
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    marginRight: "8px",
                  }}
                />
              )}

              {userName}
            </div>
            <ThemeToggle />
            <div onClick={handleLogout} style={{ cursor: "pointer" }}>
              <i className="bi bi-box-arrow-left pe-2"></i>
              Logout
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
