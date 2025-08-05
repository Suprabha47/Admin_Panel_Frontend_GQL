import { useRef, useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_CATEGORY } from "../../apollo/categories/categoryMutations";

import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

const CategoryAddForm = ({ onTrigger }) => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [categoryImage, setCategoryImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [createCategory] = useMutation(CREATE_CATEGORY);
  const imageRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await createCategory({
        variables: {
          categoryName,
          categoryDescription,
          categoryImage,
        },
      });
      console.log("data: ", data?.createCategory);
      onTrigger();
      setCategoryName("");
      setCategoryDescription("");
      setCategoryImage(null);
      toast.success(`Category added.`);
    } catch (err) {
      console.log("error: ", err);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "unsigned_preset");
    formData.append("cloud_name", "dzfwdfzaz");

    axios
      .post("https://api.cloudinary.com/v1_1/dzfwdfzaz/image/upload", formData)
      .then((res) => {
        setCategoryImage(res.data?.secure_url);
        if (imageRef.current) imageRef.current.value = "";
      })
      .catch((err) => console.log("error occured: ", err.message))
      .finally(() => setIsUploading(false));
  };

  return (
    <div
      className="modal fade"
      id="addCategoryModal"
      tabIndex="-1"
      aria-labelledby="addCategoryModalLabel"
      aria-hidden="true"
    >
      <Toaster />
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
              <div className="mb-3">
                <input
                  type="file"
                  className="form-control"
                  ref={imageRef}
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="submit"
                className="btn save-btn"
                disabled={!categoryName.trim() || isUploading || !categoryImage}
                data-bs-dismiss="modal"
              >
                {isUploading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <i className="bi bi-tags-fill pe-2"></i>Save
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CategoryAddForm;
