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
    <div class="header sticky-top">
      <div class="d-flex align-items-center gap-4">
        <Link
          to="/dashboard"
          class="d-flex align-items-center mb-3 text-white text-decoration-none"
        >
          <img src="https://img.icons8.com/ios-filled/24/ffffff/shopping-cart.png" />
          <span class="fs-4 ms-2">fastcart</span>
        </Link>
        {/* <input
          class="form-control form-control-sm search "
          type="search"
          placeholder="Search..."
          style={{ width: "200px" }}
        /> */}
      </div>
      <div
        class="d-flex justify-content-center
      align-items-center gap-3"
      >
        <div class="icon-badge"></div>
        <div class="">{userName}</div>
        <div onClick={handleLogout} style={{ cursor: "pointer" }}>
          Logout
        </div>
      </div>
    </div>
  );
};
export default Header;
