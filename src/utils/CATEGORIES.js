import { CATEGORIES_LIST } from "../apollo/categories/categoryQuery";
import client from "../apollo/client";

const CATEGORIES = async () => {
  const { data } = await client.query({
    query: CATEGORIES_LIST,
    fetchPolicy: "no-cache",
  });
  console.log("inside: ", data);
  console.log("inside: ", data.getAllCategories);
  return data.getAllCategories;
};

export default CATEGORIES;
