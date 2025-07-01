import axios from "axios";

const PRODUCTS = () => {
  return axios
    .get("https://ecommerce-backend-369e.onrender.com/products")
    .then((res) => {
      console.log("product const: ", res.data);
      return res.data;
    })
    .catch((err) => {
      console.log("error in product const: ", err);
      return;
    });
};
export default PRODUCTS;
