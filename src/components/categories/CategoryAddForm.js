import { useState } from "react";
import axios from "axios";

const CategoryAddForm = ({ onTrigger }) => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        `${process.env.REACT_APP_LOCAL_BACKEND_URL}/api/categories/add-category`,
        { categoryName, categoryDescription }
      )
      .then((res) => onTrigger())
      .catch((err) => console.log("error occured: ", err));
    // axios
    // .put(
    //   `${process.env.REACT_APP_LOCAL_BACKEND_URL}/api/categories/update-category/${id}`,
    //   { categoryName, categoryDescription }
    // )
    // .then((res) => onTrigger())
    // .catch((err) => console.log("error occured: ", err));

    setCategoryName("");
    setCategoryDescription("");
  };

  return (
    <div
      className="modal fade"
      id="addCategoryModal"
      tabIndex="-1"
      aria-labelledby="addCategoryModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title" id="addCategoryModalLabel">
                Add Category
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
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CategoryAddForm;
