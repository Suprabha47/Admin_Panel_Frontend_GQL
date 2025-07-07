import { Formik, Form } from "formik";
import InformationSection from "./InformationSection";
import CategorySection from "./CategorySection";
import { toast, ToastContainer } from "react-toastify";
import SEOSection from "./SEOSection";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { INITIALFORMVALUE, FORMIKSCHEMA } from "../../utils/INITIALFORMVALUE";
import uploadImage from "../../utils/uploadImage";

const validationSchema = FORMIKSCHEMA();

const AddProduct = () => {
  const navigate = useNavigate();

  const [initialData, setInitialData] = useState(INITIALFORMVALUE);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/api/products/${id}`)
        .then((res) => {
          const data = res.data.data;
          setInitialData(data);
        })
        .catch((err) => console.log("product detail error: ", err));
    }
  }, [id]);

  const handleSubmit = async (values) => {
    let imageName;
    try {
      if (values.image instanceof File) {
        imageName = await uploadImage(values.image);
        console.log("image name: ", imageName);
      }

      delete values["image"];

      const payload = { ...values, image: imageName };

      if (!id) {
        axios
          .post(
            `${process.env.REACT_APP_BACKEND_URL}/api/products/add-product`,
            payload
          )
          .then((res) => {
            toast.success("Product Added!");
          })
          .catch((err) => {
            toast.error(err.response.data);
          });
      } else {
        axios
          .put(
            `${process.env.REACT_APP_BACKEND_URL}/api/products/edit-product`,
            {
              _id: id,
              p: payload,
            }
          )
          .then((res) => {
            toast.success("Product Updated!\nNavigating to Products page.", {
              autoClose: 3000,
            });
            setTimeout(() => navigate("/products"), 3000);
          })
          .catch((err) => {
            toast.error(err.response.data);
          });
      }

      setInitialData(INITIALFORMVALUE);
    } catch (err) {
      console.log("some error occured: ", err);
      toast.error(err.response?.data || "Something went wrong!");
    }
  };

  const handleCancel = (resetForm) => {
    resetForm({ values: INITIALFORMVALUE });
    setInitialData(INITIALFORMVALUE);
  };

  return (
    <>
      <Formik
        initialValues={initialData}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values, resetForm }) => (
          <>
            <div className="d-flex justify-content-between align-items-center m-3 ">
              <h4>Products</h4>
              <button
                className="btn btn-primary px-4"
                onClick={() => {
                  handleCancel(resetForm);
                }}
              >
                Cancel
              </button>
            </div>
            <Link
              to="/products"
              className="text-blue text-decoration-none mx-3  "
            >
              Back
            </Link>
            <Form className="container mt-4">
              <div className="row">
                <div className="col-md-8">
                  <InformationSection />
                </div>

                <div className="col-md-4">
                  <CategorySection />

                  <SEOSection />
                </div>
              </div>
              <div className="text-end mb-3">
                <button type="submit" className="btn btn-primary px-4">
                  Save
                </button>
              </div>
            </Form>
          </>
        )}
      </Formik>
    </>
  );
};
export default AddProduct;
