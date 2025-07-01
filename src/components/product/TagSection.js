import { Field } from "formik";

const TagSection = () => (
  <div className="card mb-3">
    <div className="card-body">
      <h5 className="card-title">Tags</h5>
      <Field
        name="tags"
        className="form-control"
        placeholder="Add comma-separated tag"
      />
    </div>
  </div>
);

export default TagSection;
