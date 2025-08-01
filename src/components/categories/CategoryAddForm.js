import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_CATEGORY } from "../../apollo/categories/categoryMutations";
import { toast } from "react-toastify";

const CategoryAddForm = ({ onTrigger }) => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [createCategory] = useMutation(CREATE_CATEGORY);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await createCategory({
        variables: {
          categoryName,
          categoryDescription,
        },
      });
      toast.success(`Category added.`);
      onTrigger();
      setCategoryName("");
      setCategoryDescription("");
    } catch (err) {
      console.log("error: ", err);
    }
  };

  return (
    <div
      className="modal fade"
      id="addCategoryModal"
      tabIndex="-1"
      aria-labelledby="addCategoryModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog  ">
        <div className="modal-content category-modal">
          <form onSubmit={handleSubmit}>
            <div className="modal-header  text-white">
              <h5 className="modal-title" id="addCategoryModalLabel">
                <i class="bi bi-tag-fill pe-2"></i>Add Category
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
                <input
                  type="text"
                  className="form-control"
                  value={categoryName}
                  placeholder="Category Name*"
                  onChange={(e) => setCategoryName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <textarea
                  className="form-control"
                  rows="3"
                  placeholder="Category Description"
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
                <i class="bi bi-tags-fill pe-2"></i>
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
