import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { UPDATE_CATEGORY } from "../../apollo/categories/categoryMutations";
import { toast } from "react-toastify";

const CategoryUpdateForm = ({ name, descr, id, handleTrigger }) => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [updateCategory] = useMutation(UPDATE_CATEGORY);

  useEffect(() => {
    setCategoryName(name);
    setCategoryDescription(descr);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await updateCategory({
        variables: {
          id,
          categoryName,
          categoryDescription,
        },
      });
      toast.success("Category Updated!", {
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      handleTrigger();
    } catch (err) {
      console.log("error: ", err);
    }
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
        <div className="modal-content category-modal text-white">
          <form onSubmit={handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title" id="updateCategoryModalLabel">
                <i class="bi bi-pencil-square pe-2"></i>Edit Category
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
                <label className="form-label">
                  {" "}
                  <i class="bi bi-tag-fill pe-2"></i>Category Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3 ">
                <label className="form-label">
                  {" "}
                  <i class="bi bi-tag-fill pe-2"></i>Category Description
                </label>
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
                className="btn save-btn"
                disabled={!categoryName.trim()}
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
