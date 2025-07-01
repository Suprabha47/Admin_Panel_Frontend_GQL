import { Link, Outlet } from "react-router-dom";

const Products = () => {
  return (
    <div className="w-100 d-flex flex-column">
      <Outlet />
    </div>
  );
};
export default Products;
