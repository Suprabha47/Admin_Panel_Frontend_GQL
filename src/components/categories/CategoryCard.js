import { useState } from "react";
import CategoryUpdateForm from "./CategoryUpdateForm";

const CategoryCard = (props) => {
  const [showDescription, setShowDescription] = useState(false);
  const { category, id, onDelete, descr, onTrigger, img } = props;

  return (
    <div className="bg-white  border-0 d-inline-block shadow-sm rounded m-4 p-1 w-25">
      <div className="card ">
        <div className="position-relative">
          <img
            className="card-img-top"
            style={{
              maxHeight: "12rem",
              minHeight: "12rem",
              objectFit: "cover",
            }}
            src={img}
            alt={`Category-Image-${category}`}
          />
          <div className="position-absolute top-50 start-50 translate-middle d-flex gap-2 opacity-0 hover-overlay">
            <button
              className="btn btn-outline-primary btn-sm"
              data-bs-toggle="modal"
              data-bs-target={`#updateCategoryModal${id}`}
            >
              <i className="bi bi-pencil"></i> Edit
            </button>
            <button
              className="btn btn-outline-danger btn-sm"
              onClick={() => onDelete(id, category)}
            >
              <i className="bi bi-trash"></i> Delete
            </button>
          </div>
        </div>

        <div class="card-body" style={{ height: "8rem" }}>
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

            <CategoryUpdateForm
              id={id}
              handleTrigger={onTrigger}
              name={category}
              img={img}
              descr={descr}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
