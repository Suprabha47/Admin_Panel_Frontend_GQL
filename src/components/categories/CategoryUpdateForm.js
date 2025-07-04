import { useEffect, useState } from "react";
import axios from "axios";

const CategoryUpdateForm = ({ name, descr, id, handleTrigger }) => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  console.log("description: ", descr);
  console.log("categoryDescription: ", categoryDescription);
  useEffect(() => {
    setCategoryName(name);
    setCategoryDescription(descr);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(
        `${process.env.REACT_APP_BACKEND_URL}/api/categories/update-category/${id}`,
        { categoryName, categoryDescription }
      )
      .then(() => handleTrigger())
      .catch((err) => console.log("error occured: ", err));
  };

  return (
    <div
      className="modal fade"
      id={`updateCategoryModal${id}`}
      tabIndex="-1"
      aria-labelledby="updateCategoryModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title" id="updateCategoryModalLabel">
                Edit Category
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Category Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Category Description</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={categoryDescription}
                  onChange={(e) => setCategoryDescription(e.target.value)}
                  required
                ></textarea>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="submit"
                className="btn btn-primary"
                data-bs-dismiss="modal"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CategoryUpdateForm;
