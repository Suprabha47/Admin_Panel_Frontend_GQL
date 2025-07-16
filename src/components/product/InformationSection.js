import { Field, ErrorMessage, useFormikContext } from "formik";

const InformationSection = () => {
  const { setFieldValue } = useFormikContext();
  return (
    <>
      <div className="card mb-3">
        <div className="card-body">
          <h5 className="text-black my-4">Information</h5>
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

          {/* <div>
            <h5 className="text-black my-4">Images</h5>
            <div className="mb-3">
              <input
                type="file"
                name="image"
                className="form-control"
                onChange={(e) =>
                  setFieldValue("image", e.currentTarget.files[0])
                }
              />
              <ErrorMessage
                name="image"
                component="div"
                className="text-danger"
              />
            </div>
          </div>
          <hr className="my-5"></hr> */}
          <div>
            <h5 className="text-black my-4">Price</h5>
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
