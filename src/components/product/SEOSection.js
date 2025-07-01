import { Field } from "formik";

const SEOSection = () => (
  <div className="card mb-3">
    <div className="card-body">
      <h5 className="card-Description">SEO Settings</h5>
      <div className="mb-3">
        <label>Title</label>
        <Field name="seoTitle" className="form-control" />
      </div>
      <div className="mb-3">
        <label>Description</label>
        <Field name="seoDescription" as="textarea" className="form-control" />
      </div>
    </div>
  </div>
);

export default SEOSection;
