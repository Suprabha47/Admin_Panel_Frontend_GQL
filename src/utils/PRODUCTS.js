import axios from "axios";

const PRODUCTS = () => {
  return axios
    .get(`${process.env.REACT_APP_BACKEND_URL}/products`)
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
