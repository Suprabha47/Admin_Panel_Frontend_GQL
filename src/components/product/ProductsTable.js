import { useEffect, useState } from "react";
import PRODUCTS from "../../utils/PRODUCTS";
import axios from "axios";
import { Link } from "react-router-dom";

const TableHeader = () => (
  <div className="d-flex justify-content-between align-items-center m-3 ">
    <h4>Products</h4>
    <div>
      <button className="btn btn-outline-primary me-2">Export</button>
      <Link to="add-product">
        <button className="btn btn-primary">+ Add Product</button>
      </Link>
    </div>
  </div>
);

const ProductsTable = () => {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await PRODUCTS();
    setProducts(res);
    setAllProducts(res);
  };

  // for searching product items
  const handleChange = (e) => {
    const searchItem = e.target.value;
    console.log(searchItem);

    if (searchItem === "") setProducts(allProducts);
    const searchList = allProducts.filter((p) =>
      p.productName
        .toLowerCase()
        .replace(/\s+/g, "")
        .includes(searchItem.toLowerCase().replace(/\s+/g, ""))
    );

    setProducts(searchList);
  };
  // to delete item from the list
  const handleDel = (_id) => {
    const id = _id;
    axios
      .delete("https://ecommerce-backend-369e.onrender.com/products", {
        data: { id },
      })
      .then((res) => {
        console.log(res.data.message);
        fetchProducts();
      })
      .catch((err) => console.log(err));
  };

  if (allProducts.length === 0)
    return (
      <>
        {" "}
        <TableHeader />
        <hr></hr>
        <h5 className="m-3">No products to show!</h5>
      </>
    );
  return (
    <>
      <TableHeader />
      <div className="container mt-4 shadow-md bg-light p-4 m-2 w-100">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <select className="form-select" style={{ width: "150px" }}>
            <option>Category 1</option>
            <option>Category 2</option>
            <option>Category 3</option>
            <option>Category 4</option>
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
            {products.map((p, index) => (
              <tr key={p._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="d-flex align-items-center ">
                    <img
                      src={`${process.env.REACT_APP_BACKEND_URL}/p.image`}
                      alt={p.productName}
                      className="me-2 rounded"
                      style={{
                        width: 40,
                        maxHeight: 40,
                        objectFit: "contain",
                      }}
                    />

                    <div>
                      <div>{p.productName}</div>
                      <small className="text-muted"></small>
                    </div>
                  </div>
                </td>
                <td>―</td>
                <td>₹{p.price}</td>
                <td>
                  <Link to={`update-product/${p._id}`} state={p}>
                    <button className="btn btn-outline-secondary me-2">
                      <i className="bi bi-pencil-square"></i>
                    </button>
                  </Link>
                </td>
                <td>
                  <button className="btn btn-outline-danger">
                    <i
                      className="bi bi-trash"
                      onClick={() => handleDel(p._id)}
                    ></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ProductsTable;
