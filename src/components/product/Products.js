import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";

const Products = () => {
  return (
    <div className="w-100 d-flex flex-column">
      <Toaster />
      <Outlet />
    </div>
  );
};
export default Products;
