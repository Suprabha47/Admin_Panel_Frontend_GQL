import { useState } from "react";
import CategoryCard from "./CategoryCard";
import { useEffect } from "react";
import CATEGORIES from "../../utils/CATEGORIES";
import CategoryAddForm from "./CategoryAddForm";
import axios from "axios";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    fetchData();
    console.log(categories);
  }, [trigger]);

  const fetchData = async () => {
    const data = await CATEGORIES();
    setCategories(data);
  };
  const handleDelete = (id) => {
    axios
      .delete(`${process.env.REACT_APP_BACKEND_URL}/api/categories/${id}`)
      .then((res) => {
        console.log(res);
        setTrigger(!trigger);
      })
      .catch((err) => console.log(err));
  };
  const handleTrigger = () => {
    setTrigger((prev) => !prev);
    console.log("trigggered");
  };

  //if (categories.length === 0) return <>Loading</>;
  return (
    <div className="w-100">
      <div className="d-flex justify-content-between align-items-center m-3 ">
        <h4>Categories</h4>
        <div>
          <button
            className="btn btn-primary m-3"
            data-bs-toggle="modal"
            data-bs-target="#addCategoryModal"
          >
            + Add Category
          </button>
        </div>
        <CategoryAddForm onTrigger={handleTrigger} mode="add" />
      </div>
      {categories.length === 0 ? (
        <>
          {" "}
          <hr></hr>
          <div class="d-flex justify-content-center">
            <div class="spinner-border  text-primary" role="status"></div>
          </div>
        </>
      ) : (
        categories.map((c) => (
          <CategoryCard
            key={c._id}
            category={c.categoryName}
            descr={c.categoryDescription}
            id={c._id}
            onDelete={handleDelete}
            onTrigger={handleTrigger}
          />
        ))
      )}
    </div>
  );
};
export default Categories;
