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

export const FORMIKSCHEMA = () => {
  const yupObj = Yup.object({
    productName: Yup.string().required("Product name required."),
    productDescription: Yup.string().required(
      "Product description is required."
    ),
    price: Yup.number().required("Product price is required."),
    image: Yup.mixed().required("Image Required"),
    category: Yup.string().required("Choose a category"),
    discountPrice: Yup.number().required("Add discount price"),
    seoTitle: Yup.string().required("Seo title required"),
    seoDescription: Yup.string().required("Required"),
  });
  return yupObj;
};
