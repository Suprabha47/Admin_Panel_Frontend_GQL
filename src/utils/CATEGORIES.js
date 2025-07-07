import axios from "axios";

const CATEGORIES = () => {
  return axios
    .get(`${process.env.REACT_APP_BACKEND_URL}/api/categories/`)
    .then((res) => {
      //console.log(res.data);
      return res.data;
    })
    .catch((err) => console.log("some error occured, ", err));
};

export default CATEGORIES;
