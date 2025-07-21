import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CATEGORIES from "../../utils/CATEGORIES";
import ProductRow from "./ProductRow";
import { useMutation, useQuery } from "@apollo/client";
import { PRODUCT_LISTING } from "../../apollo/products/productQuery";
import { DELETE_PRODUCT } from "../../apollo/products/productMutation";
import { handleProductsExport } from "../../utils/dataExport";

const TableHeader = ({ products }) => (
  <div className="d-flex justify-content-between align-items-center m-3 ">
    <h4>Products</h4>
    <div>
      <button
        className="btn btn-outline-primary me-2"
        onClick={() => handleProductsExport(products)}
      >
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
  const [deleteProduct] = useMutation(DELETE_PRODUCT);

  const { data, loading, error, refetch } = useQuery(PRODUCT_LISTING, {
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    fetchCategories();
    if (!loading && data?.getAllProducts) {
      setAllProducts(data.getAllProducts);
      setProducts(data.getAllProducts);
    }
  }, [loading, data]);

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
  const handleDel = async (id) => {
    const { data } = await deleteProduct({
      variables: {
        id,
      },
    });
    console.log("delete data: ", data.deleteProduct);
    const refetched = await refetch();
    setAllProducts(refetched.data.getAllProducts);
    setProducts(refetched.data.getAllProducts);
  };

  if (loading)
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
      <TableHeader products={allProducts} />
      <div className="container mt-4 shadow-md bg-light p-4 m-2 w-100">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <select
            className="form-select"
            style={{ width: "200px" }}
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

        {products.length === 0 ? (
          <h5 className="my-5">No Products to Show.</h5>
        ) : (
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
                <ProductRow
                  key={p.id}
                  index={index}
                  p={p}
                  handleDel={handleDel}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default ProductsTable;
