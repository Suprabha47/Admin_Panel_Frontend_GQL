import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { UPDATE_CATEGORY } from "../../apollo/categories/categoryMutations";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";

const CategoryUpdateForm = ({ name, descr, id, img, handleTrigger }) => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [categoryImage, setCategoryImage] = useState(null);
  const [updateCategory] = useMutation(UPDATE_CATEGORY);

  useEffect(() => {
    setCategoryName(name);
    setCategoryDescription(descr);
    setCategoryImage(img);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await updateCategory({
        variables: {
          id,
          categoryName,
          categoryDescription,
          categoryImage,
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
        console.log("image url: ", res.data?.secure_url);
      })
      .catch((err) => console.log("error occured: ", err.message))
      .finally(() => setIsUploading(false));
  };

  return (
    <div
      className="modal fade"
      id={`updateCategoryModal${id}`}
      tabIndex="-1"
      aria-labelledby="updateCategoryModalLabel"
      aria-hidden="true"
    >
      <Toaster />
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
              <div className="mb-3">
                <label className="form-label">
                  <i class="bi bi-tag-fill pe-2"></i>Image
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="categoryImage"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="submit"
                className="btn save-btn"
                disabled={!categoryName.trim() || isUploading}
                data-bs-dismiss="modal"
              >
                {isUploading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <i className="bi bi-tags-fill pe-2"></i>Update
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

export default CategoryUpdateForm;
