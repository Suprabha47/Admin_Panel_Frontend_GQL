import { Formik, Form } from "formik";
import InformationSection from "./InformationSection";
import CategorySection from "./CategorySection";
import { toast } from "react-toastify";
import SEOSection from "./SEOSection";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { INITIALFORMVALUE, FORMIKSCHEMA } from "../../utils/INITIALFORMVALUE";
import uploadImage from "../../utils/uploadImage";
import { useMutation, useQuery } from "@apollo/client";
import { PRODUCT_BY_ID } from "../../apollo/products/productQuery";
import {
  ADD_PRODUCT,
  UPDATE_PRODUCT,
} from "../../apollo/products/productMutation";

const AddProduct = () => {
  const [initialData, setInitialData] = useState(INITIALFORMVALUE);
  const [createProduct] = useMutation(ADD_PRODUCT);
  const [updateProduct] = useMutation(UPDATE_PRODUCT);
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, loading, error } = useQuery(PRODUCT_BY_ID, {
    variables: { id },
    skip: !id,
  });
  const validationSchema = FORMIKSCHEMA(!!id);

  useEffect(() => {
    try {
      if (!id) return;
      if (loading || error || !data) return;
      console.log("datata receiveddd: ", data?.getProduct);
      setInitialData(data?.getProduct);
    } catch (err) {
      console.log("error: ", err);
    }
  }, [id, loading, error, data]);

  const handleSubmit = async (values) => {
    //let imageName;
    try {
      // if (values.image instanceof File) {
      //   imageName = await uploadImage(values.image);
      //   console.log("image name insideee: ", imageName);
      // } else if (typeof values.image === "string") {
      //   imageName = values.image; // Keep existing image
      // }

      // console.log("Image name outside::");
      // delete values["image"];
      delete values["__typename"];
      const payload = { ...values };

      if (!id) {
        const { data } = await createProduct({
          variables: {
            input: {
              ...payload,
            },
          },
        });
        console.log("dataaaaaaaa: ", data.createProduct);
        toast.success("Product Added!");
      } else {
        const { data } = await updateProduct({
          variables: {
            id,
            input: { ...payload },
          },
        });

        toast.success("Product Updated!\nNavigating to Products page.", {
          autoClose: 3000,
        });
        setTimeout(() => navigate("/products"), 3000);
      }

      setInitialData(INITIALFORMVALUE);
    } catch (err) {
      console.log("some error occured: ", err);
      toast.error(err || "Something went wrong!");
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
        validateOnBlur={false}
        validateOnChange={false}
        context={{ isEditMode: !!id }}
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
              <i class="bi bi-arrow-left-circle pe-2"></i>
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
