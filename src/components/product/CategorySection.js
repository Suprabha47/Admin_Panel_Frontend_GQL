import { Field } from "formik";
import CATEGORIES from "../../utils/CATEGORIES";
import { useEffect, useState } from "react";

const CategorySection = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const data = await CATEGORIES();
    setCategories(data);
  };
  if (categories.length === 0) return <>Loading</>;

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">Categories</h5>
        <div className="form-check">
          {categories.map((c) => (
            <div key={c._id}>
              <Field
                type="radio"
                name="category"
                value={c.categoryName}
                className="form-check-input"
              />
              <label className="form-check-label">{c.categoryName}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategorySection;
