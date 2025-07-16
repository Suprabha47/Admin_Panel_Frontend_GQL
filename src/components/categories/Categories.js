import { useState } from "react";
import CategoryCard from "./CategoryCard";
import { useEffect } from "react";
import CATEGORIES from "../../utils/CATEGORIES";
import CategoryAddForm from "./CategoryAddForm";
import { toast, ToastContainer } from "react-toastify";
import { useMutation } from "@apollo/client";
import { DELETE_CATEGORY } from "../../apollo/categories/categoryMutations";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [trigger, setTrigger] = useState(false);
  const [deleteCategory] = useMutation(DELETE_CATEGORY);

  useEffect(() => {
    fetchData();
    console.log(categories);
  }, [trigger]);

  const fetchData = async () => {
    const data = await CATEGORIES();
    setCategories(data);
    console.log("categories: ", categories);
  };
  const handleDelete = async (id, category) => {
    try {
      const { data } = await deleteCategory({
        variables: {
          id,
        },
      });
      toast.success(`Category ${category} deleted.`, {
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      handleTrigger();
    } catch (err) {
      console.log("Error: ", err);
      toast.error("Error occurred");
    }
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
      {!categories || categories.length === 0 ? (
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
            key={c.id}
            category={c.categoryName}
            descr={c.categoryDescription}
            id={c.id}
            onDelete={handleDelete}
            onTrigger={handleTrigger}
          />
        ))
      )}
      <ToastContainer />
    </div>
  );
};
export default Categories;
