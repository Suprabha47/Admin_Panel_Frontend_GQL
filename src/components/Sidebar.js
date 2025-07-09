import { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [active, setActive] = useState("dashboard");

  return (
    <div class="sidebar d-flex flex-column p-3 sidebar text-white custom_sticky_bar">
      <ul class="nav nav-pills flex-column mb-4">
        <li
          className={`sidebar-link ${
            active === "dashboard" && "bg-grey-transparent"
          } me-2`}
          onClick={() => setActive("dashboard")}
        >
          <Link to="/" class="nav-link text-white ">
            Dashboard
          </Link>
        </li>
        <li
          className={` ${active === "orders" && "bg-grey-transparent"} me-2`}
          onClick={() => setActive("orders")}
        >
          <Link to="orders" class="nav-link text-white">
            Orders <span class="badge bg-light text-dark ms-2">16</span>
          </Link>
        </li>
        <li
          className={` ${active === "products" && "bg-grey-transparent"} me-2`}
          onClick={() => setActive("products")}
        >
          <Link to="products" class="nav-link text-white">
            Products
          </Link>
        </li>
        <li
          className={` ${
            active === "categories" && "bg-grey-transparent"
          } me-2`}
          onClick={() => setActive("categories")}
        >
          <Link to="categories" class="nav-link text-white">
            Categories
          </Link>
        </li>
        <li
          className={` ${active === "customers" && "bg-grey-transparent"} me-2`}
          onClick={() => setActive("customers")}
        >
          <Link to="customers" class="nav-link text-white">
            Customers
          </Link>
        </li>
        <li
          className={` ${active === "reports" && "bg-grey-transparent"} me-2`}
          onClick={() => setActive("reports")}
        >
          <Link to="reports" class="nav-link text-white">
            Reports
          </Link>
        </li>
        <li
          className={` ${active === "coupons" && "bg-grey-transparent"} me-2`}
          onClick={() => setActive("coupons")}
        >
          <Link to="coupons" class="nav-link text-white">
            Coupons
          </Link>
        </li>
      </ul>

      <hr class="text-secondary"></hr>
      <h6 class="text-secondary">Settings</h6>
      <ul class="nav nav-pills flex-column">
        <li
          className={` ${active === "global" && "bg-grey-transparent"} me-2`}
          onClick={() => setActive("global")}
        >
          <Link to="global-settings" class="nav-link text-white">
            Global Settings
          </Link>
        </li>
      </ul>
    </div>
  );
};
export default Sidebar;
