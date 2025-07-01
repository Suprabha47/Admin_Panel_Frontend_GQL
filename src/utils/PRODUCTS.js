import axios from "axios";

const PRODUCTS = () => {
  return axios
    .get("http://localhost:3001/products")
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
