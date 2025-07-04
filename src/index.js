import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import { store } from "./redux/store";
import Orders from "./components/Orders";
import Products from "./components/product/Products";
import Categories from "./components/categories/Categories";
import Customers from "./components/Customers";
import Reports from "./components/Reports";
import Coupons from "./components/Coupons";
import GlobalSettings from "./components/GlobalSettings";
import AddProduct from "./components/product/AddProduct";
import ProductsTable from "./components/product/ProductsTable";
import DashboardOutlet from "./components/DashboardOutlet";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/" element={<Dashboard />}>
          <Route path="/dashboard" element={<DashboardOutlet />} />
          <Route path="orders" element={<Orders />} />
          <Route path="products" element={<Products />}>
            <Route index element={<ProductsTable />} />
            <Route path="add-product" element={<AddProduct />} />
            <Route path="update-product/:id" element={<AddProduct />} />
          </Route>
          <Route path="categories" element={<Categories />} />
          <Route path="customers" element={<Customers />} />
          <Route path="reports" element={<Reports />} />
          <Route path="coupons" element={<Coupons />} />
          <Route path="global-settings" element={<GlobalSettings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
