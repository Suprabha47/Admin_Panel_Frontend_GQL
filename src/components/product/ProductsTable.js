import { useEffect, useState } from "react";
import PRODUCTS from "../../utils/PRODUCTS";
import axios from "axios";
import { Link } from "react-router-dom";
import CATEGORIES from "../../utils/CATEGORIES";
import { toast } from "react-toastify";
import ProductRow from "./ProductRow";

const TableHeader = () => (
  <div className="d-flex justify-content-between align-items-center m-3 ">
    <h4>Products</h4>
    <div>
      <button className="btn btn-outline-primary me-2" disabled>
        Export
      </button>
      <Link to="add-product">
        <button className="btn btn-primary">+ Add Product</button>
      </Link>
    </div>
  </div>
);

const ProductsTable = () => {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  // filtering products based on category
  useEffect(() => {
    const filterCategory = selectedCategory.toLowerCase().trim();

    if (filterCategory === "") {
      setProducts(allProducts);
      return;
    }
    const filteredList = allProducts.filter((p) =>
      p.category.toLowerCase().trim().includes(filterCategory)
    );
    setProducts(filteredList);
  }, [selectedCategory, allProducts]);

  const fetchProducts = async () => {
    const res = await PRODUCTS();
    setProducts(res);
    setAllProducts(res);
  };

  const fetchCategories = async () => {
    const list = await CATEGORIES();
    setCategories(list);
  };

  // for searching product items
  const handleChange = (e) => {
    const searchItem = e.target.value.toLowerCase().replace(/\s+/g, "");

    if (searchItem === "") {
      setProducts(allProducts);
      return;
    }
    const searchList = allProducts.filter((p) =>
      p.productName.toLowerCase().replace(/\s+/g, "").includes(searchItem)
    );

    setProducts(searchList);
  };
  // to delete item from the list
  const handleDel = (_id) => {
    axios
      .delete(`${process.env.REACT_APP_BACKEND_URL}/api/products/${_id}`, {})
      .then((res) => {
        const updated = allProducts.filter((p) => p._id !== _id);
        toast.success(`Product ${res.data.result.productName} deleted!`, {
          autoClose: 3000,
        });
        setAllProducts(updated);
        setProducts(updated);
      })
      .catch((err) => console.log(err));
  };

  if (!allProducts || allProducts.length === 0)
    return (
      <>
        {" "}
        <TableHeader />
        <hr></hr>
        <div class="d-flex justify-content-center">
          <div class="spinner-border  text-primary" role="status"></div>
        </div>
      </>
    );
  return (
    <>
      <TableHeader />
      <div className="container mt-4 shadow-md bg-light p-4 m-2 w-100">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <select
            className="form-select"
            style={{ width: "150px" }}
            onChange={(e) => {
              const sel = e.target.value;
              setSelectedCategory(sel);
            }}
            value={selectedCategory}
          >
            <option value="">Categories</option>
            {categories.map((c) => (
              <option key={c._id} value={c.categoryName}>
                {c.categoryName}
              </option>
            ))}
          </select>

          <input
            type="text"
            className="form-control"
            placeholder="Search..."
            style={{ width: "250px" }}
            onChange={handleChange}
          />
        </div>

        <table className="table table-hover align-middle">
          <thead>
            <tr>
              <th>S. no.</th>
              <th>Product</th>
              <th>Category</th>
              <th>Price</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <h4>No Products to Show.</h4>
            ) : (
              products.map((p, index) => (
                <ProductRow
                  key={p._id}
                  index={index}
                  p={p}
                  handleDel={handleDel}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ProductsTable;
