import axios from "axios";
const uploadImage = async (file) => {
  // const formData = new FormData();
  // formData.append("image", file);
  // const image = await axios.post(
  //   `${process.env.REACT_APP_BACKEND_URL}/api/upload/`,
  //   formData,
  //   {
  //     headers: { "Content-Type": "multipart/form-data" },
  //   }
  // );
  // return image.data.imageUrl.split("/").pop();
};
export default uploadImage;
