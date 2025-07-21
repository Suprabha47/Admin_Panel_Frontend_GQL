import { useState } from "react";
import CategoryUpdateForm from "./CategoryUpdateForm";

const CategoryCard = (props) => {
  const [showDescription, setShowDescription] = useState(false);
  const { category, id, onDelete, descr, onTrigger } = props;

  return (
    <div
      className="bg-white  border-0 shadow-sm rounded m-4 p-4"
      style={{ width: "40rem" }}
    >
      <div
        className="p-3 category"
        onMouseEnter={() => setShowDescription(true)}
        onMouseLeave={() => setShowDescription(false)}
      >
        <div className=" mb-1 position-relative">
          <h6>{category}</h6>
          <p className={`description-box ${showDescription ? "show" : ""}`}>
            {descr}
          </p>
        </div>
        <div>
          <button
            className="btn btn-outline-secondary me-2"
            data-bs-toggle="modal"
            data-bs-target={`#updateCategoryModal${id}`}
          >
            <i className="bi bi-pencil-square"></i>
          </button>
          <CategoryUpdateForm
            id={id}
            handleTrigger={onTrigger}
            name={category}
            descr={descr}
          />
          <button
            className="btn btn-outline-danger"
            onClick={() => onDelete(id, category)}
          >
            <i className="bi bi-trash"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
