import axios from "axios";
import { Field, ErrorMessage, useFormikContext } from "formik";
import { useState } from "react";

const InformationSection = () => {
  const { setFieldValue, values } = useFormikContext();
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "unsigned_preset");
    formData.append("cloud_name", "dzfwdfzaz");

    axios
      .post("https://api.cloudinary.com/v1_1/dzfwdfzaz/image/upload", formData)
      .then((res) => {
        setFieldValue("image", res.data?.secure_url);
        console.log("Uploaded image URL:", res.data?.secure_url);
      })
      .catch((err) => console.log("error occured: ", err.message))
      .finally(() => {
        setIsUploading(false);
        console.log("image value: ", values.image);
      });
  };

  return (
    <>
      <div className="card mb-3">
        <div className="card-body">
          <h5 className=" my-4">Information</h5>
          <div className="mb-3">
            <label>Product Name</label>
            <Field name="productName" className="form-control" />
            <ErrorMessage
              name="productName"
              component="div"
              className="text-danger"
            />
          </div>
          <div className="mb-3">
            <label>Product Description</label>
            <Field
              name="productDescription"
              as="textarea"
              className="form-control"
            />
            <ErrorMessage
              name="productDescription"
              component="div"
              className="text-danger"
            />
          </div>
          <hr className="my-5"></hr>

          <div>
            <h5 className="my-4">Images</h5>
            <div className="mb-3">
              <input
                type="file"
                name="image"
                className="form-control"
                accept="image/*"
                onChange={handleImageUpload}
              />
              {isUploading && (
                <>
                  <span className="spinner-border spinner-border-sm me-2" />"
                  Uploading..."
                </>
              )}
              <ErrorMessage
                name="image"
                component="div"
                className="text-danger"
              />
            </div>
          </div>
          <hr className="my-5"></hr>
          <div>
            <h5 className=" my-4">Price</h5>
            <div className="d-flex justify-content-between ">
              <div className="mb-3">
                <label>Product Price</label>
                <Field
                  name="price"
                  type="number"
                  className="form-control"
                  placeholder="Enter price"
                />
                <ErrorMessage
                  name="price"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className="mb-3">
                <label>Discount Price</label>
                <Field
                  name="discountPrice"
                  type="number"
                  className="form-control w-100"
                  placeholder="Price at discount"
                />
                <ErrorMessage
                  name="discountPrice"
                  component="div"
                  className="text-danger"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InformationSection;
