import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div class="sidebar d-flex flex-column p-3 sidebar text-white custom_sticky_bar">
      <ul class="nav nav-pills flex-column mb-4">
        <li>
          <Link to="/dashboard" class="nav-link text-white ">
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="orders" class="nav-link text-white">
            Orders <span class="badge bg-light text-dark ms-2">16</span>
          </Link>
        </li>
        <li>
          <Link to="products" class="nav-link text-white">
            Products
          </Link>
        </li>
        <li>
          <Link to="categories" class="nav-link text-white">
            Categories
          </Link>
        </li>
        <li>
          <Link to="customers" class="nav-link text-white">
            Customers
          </Link>
        </li>
        <li>
          <Link to="reports" class="nav-link text-white">
            Reports
          </Link>
        </li>
        <li>
          <Link to="coupons" class="nav-link text-white">
            Coupons
          </Link>
        </li>
      </ul>

      <hr class="text-secondary"></hr>
      <h6 class="text-secondary">Settings</h6>
      <ul class="nav nav-pills flex-column">
        <li>
          <Link to="global-settings" class="nav-link text-white">
            Global Settings
          </Link>
        </li>
      </ul>
    </div>
  );
};
export default Sidebar;
