import { Field } from "formik";

const CategorySection = () => (
  <div className="card mb-3">
    <div className="card-body">
      <h5 className="card-title">Categories</h5>
      <div className="form-check">
        <Field
          type="checkbox"
          name="categories"
          value="Men"
          className="form-check-input"
        />
        <label className="form-check-label">Men</label>
      </div>
      <div className="form-check">
        <Field
          type="checkbox"
          name="categories"
          value="Women"
          className="form-check-input"
        />
        <label className="form-check-label">Women</label>
      </div>
      <div className="form-check">
        <Field
          type="checkbox"
          name="categories"
          value="T-Shirt"
          className="form-check-input"
        />
        <label className="form-check-label">T-Shirt</label>
      </div>
      <div className="form-check">
        <Field
          type="checkbox"
          name="categories"
          value="Hoodie"
          className="form-check-input"
        />
        <label className="form-check-label">Hoodie</label>
      </div>
      <div className="form-check">
        <Field
          type="checkbox"
          name="categories"
          value="dress"
          className="form-check-input"
        />
        <label className="form-check-label">Dress</label>
      </div>
    </div>
  </div>
);

export default CategorySection;
