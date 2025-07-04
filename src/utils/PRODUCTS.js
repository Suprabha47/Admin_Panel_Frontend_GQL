import axios from "axios";

const PRODUCTS = () => {
  return axios
    .get(`${process.env.REACT_APP_LOCAL_BACKEND_URL}/api/products`)
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
