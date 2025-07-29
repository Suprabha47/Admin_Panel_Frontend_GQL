import { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [active, setActive] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    {
      key: "dashboard",
      label: "Dashboard",
      route: "/",
      iconClass: "bi bi-house-door",
    },
    {
      key: "orders",
      label: "Orders",
      route: "orders",
      iconClass: "bi bi-list-task",
    },
    {
      key: "products",
      label: "Products",
      route: "products",
      iconClass: "bi bi-tag",
    },
    {
      key: "categories",
      label: "Categories",
      route: "categories",
      iconClass: "bi bi-folder",
    },
    {
      key: "customers",
      label: "Customers",
      route: "customers",
      iconClass: "bi bi-people",
    },
    {
      key: "reports",
      label: "Report",
      disabled: true,
      iconClass: "bi bi-bar-chart",
    },
    {
      key: "coupons",
      label: "Coupons",
      route: "coupons",
      iconClass: "bi bi-star",
    },
  ];

  return (
    <>
      {/* Sidebar */}
      <div
        className={`sidebar  text-white px-4 py-2 position-fixed vh-100 ${
          collapsed ? "d-none" : "d-block"
        } d-md-block`}
        style={{
          width: "240px",
          minWidth: "240px",
          maxHeight: "100%",
          backgroundColor: "rgb(59 130 246 / 0.5);",
        }}
      >
        <div>
          <img src="https://img.icons8.com/ios-filled/24/ffffff/shopping-cart.png" />
          <span class="fs-4 ms-2 fst-italic mt-2 ">fastcart</span>
        </div>
        <hr></hr>
        <ul className="nav nav-pills flex-column mb-4">
          {navItems.map((item) => (
            <li
              key={item.key}
              className={`nav-item mb-2  ${
                active === item.key ? "bg-secondary rounded" : ""
              }`}
              onClick={() => !item.disabled && setActive(item.key)}
            >
              {item.disabled ? (
                <span className="nav-link text-white">
                  <i className={`${item.iconClass} me-2`}> </i>

                  {item.label}
                </span>
              ) : (
                <Link to={item.route} className="nav-link  text-white">
                  <i className={`${item.iconClass} me-2`}> </i>
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>

        <hr className="text-secondary" />
        <h6 className="text-secondary">Settings</h6>
        <ul className="nav nav-pills flex-column">
          <li
            className={`nav-item ${
              active === "global" ? "bg-secondary rounded" : ""
            }`}
            onClick={() => {
              /*setActive("global")*/
            }}
          >
            <span className="nav-link text-white">
              <i className="bi bi-gear me-2"> </i>Global Settings
            </span>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
