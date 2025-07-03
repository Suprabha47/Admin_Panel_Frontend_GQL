import { Formik, Form } from "formik";
import * as Yup from "yup";
import InformationSection from "./InformationSection";
import CategorySection from "./CategorySection";
import { toast, ToastContainer } from "react-toastify";
import SEOSection from "./SEOSection";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const validationSchema = Yup.object({
  productName: Yup.string().required("Required"),
  productDescription: Yup.string().required("Required"),
  price: Yup.number().required("Required"),
  image: Yup.mixed().required("Image Required"),
  discountPrice: Yup.number().required("Required"),
  seoTitle: Yup.string().required("Required"),
  seoDescription: Yup.string().required("Required"),
});

const AddProduct = () => {
  const navigate = useNavigate();

  const [initialData, setInitialData] = useState({
    productName: "",
    productDescription: "",
    price: "",
    image: "",
    discountPrice: "",
    seoTitle: "",
    seoDescription: "",
  });
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/api/products/${id}`)
        .then((res) => {
          console.log("product details: ", res.data.data);
          setInitialData(res.data.data);
          console.log("initial data: ", initialData);
        })
        .catch((err) => console.log("product detail error: ", err));
    }
  }, [id]);

  const handleSubmit = async (values) => {
    let imageName;

    if (values.image instanceof File) {
      const formData = new FormData();
      formData.append("image", values.image);
      try {
        const image = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/api/upload/`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        imageName = image.data.imageUrl.split("/").pop();
        console.log(imageName);
      } catch (err) {
        console.log("error occured: ", err);
      }
    }
    console.log("image-name to be sent: ", imageName);
    delete values["image"];

    const payload = { ...values, image: imageName };
    console.log("payload url: ", payload);

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
        .put(`${process.env.REACT_APP_BACKEND_URL}/api/products/edit-product`, {
          _id: id,
          p: payload,
        })
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

    setInitialData({
      productName: "",
      productDescription: "",
      price: "",
      image: null,
      discountPrice: "",
      seoTitle: "",
      seoDescription: "",
    });
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center m-3 ">
        <h4>Products</h4>
        <button className="btn btn-primary px-4">Cancel</button>
      </div>
      <Link to="/products" className="text-blue text-decoration-none mx-3  ">
        Back
      </Link>

      <Formik
        initialValues={initialData}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values }) => (
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
        )}
      </Formik>
      <ToastContainer />
    </>
  );
};
export default AddProduct;
