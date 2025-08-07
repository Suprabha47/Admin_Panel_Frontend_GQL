import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CATEGORIES from "../../utils/CATEGORIES";
import ProductRow from "./ProductRow";
import { useMutation, useQuery } from "@apollo/client";
import { GET_PAGINATED_PRODUCTS } from "../../apollo/products/productQuery";
import { DELETE_PRODUCT } from "../../apollo/products/productMutation";
import { handleProductsExport } from "../../utils/dataExport";
import toast from "react-hot-toast";

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
      <Link to="add-product" className="text-decoration-none">
        <button className="btn btn-primary ">+ Add Product</button>
      </Link>
    </div>
  </div>
);

const ProductsTable = () => {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5;

  const [deleteProduct] = useMutation(DELETE_PRODUCT);
  const { data, loading, error, refetch } = useQuery(GET_PAGINATED_PRODUCTS, {
    fetchPolicy: "cache-and-network",
    variables: { page, limit },
  });

  useEffect(() => {
    fetchCategories();
    if (!loading && data?.getPaginatedProducts) {
      const { products, totalPage } = data?.getPaginatedProducts;
      setAllProducts(products);
      setProducts(products);
      setTotalPages(totalPage);
    }
  }, [loading, data]);

  useEffect(() => {
    refetch({ page, limit });
  }, [page]);

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
    toast.success(`Product deleted.`);
    setAllProducts(refetched.data.getPaginatedProducts.products);
    setProducts(refetched.data.getPaginatedProducts.products);
  };

  if (loading)
    return (
      <>
        {" "}
        <TableHeader />
        <div class="d-flex justify-content-center mt-5">
          <div class="spinner-border  text-primary" role="status"></div>
        </div>
      </>
    );
  return (
    <>
      <TableHeader products={allProducts} />
      <div className="container mt-4 shadow-md p-4 m-2 w-100">
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
            <option value="">All Categories</option>
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
        <div
          style={{ maxHeight: "400px", overflowY: "auto", overflowX: "auto" }}
        >
          {products.length === 0 ? (
            <h5 className="my-5">No Products to Show.</h5>
          ) : (
            <table
              className="table table-hover align-middle"
              style={{ borderCollapse: "separate", borderSpacing: "0 4px" }}
            >
              <thead>
                <tr>
                  <th className="rounded-start  sticky-th">
                    <i class="bi bi-list"></i>
                  </th>
                  <th className="sticky-th">
                    <i class="bi bi-bag-fill pe-2"></i>Product
                  </th>
                  <th className="sticky-th">
                    <i class="bi bi-tag-fill pe-2"></i>Category
                  </th>
                  <th className="sticky-th">
                    <i class="bi bi-currency-dollar pe-2"></i>Price
                  </th>
                  <th className="sticky-th">
                    <i class="bi bi-pencil-square pe-2"></i>Edit
                  </th>
                  <th className="rounded-end  sticky-th">
                    <i class="bi bi-trash-fill pe-2"></i>Delete
                  </th>
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
        <nav aria-label="Page navigation">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
              >
                Previous
              </button>
            </li>
            {[...Array(totalPages)].map((_, index) => {
              const pageNum = index + 1;
              return (
                <li
                  key={index}
                  className={`page-item ${page === pageNum ? "active" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => setPage(pageNum)}
                  >
                    {pageNum}
                  </button>
                </li>
              );
            })}
            <li
              className={`page-item ${page === totalPages ? "disabled" : ""}`}
            >
              <button
                className="page-link"
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default ProductsTable;
