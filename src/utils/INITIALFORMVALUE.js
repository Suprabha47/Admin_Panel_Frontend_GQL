import * as Yup from "yup";

export const INITIALFORMVALUE = () => {
  const initial = {
    productName: "",
    productDescription: "",
    price: "",
    image: "",
    category: "",
    discountPrice: "",
    seoTitle: "",
    seoDescription: "",
  };
  return initial;
};

export const FORMIKSCHEMA = (isEditMode = false) => {
  return Yup.object({
    productName: Yup.string().required("Product name required."),
    productDescription: Yup.string().required(
      "Product description is required."
    ),
    price: Yup.number().required("Product price is required."),
    image: Yup.string(),
    category: Yup.string().required("Choose a category"),
    discountPrice: Yup.number().required("Add discount price"),
    seoTitle: Yup.string().required("Seo title required"),
    seoDescription: Yup.string().required("Required"),
  });
};
