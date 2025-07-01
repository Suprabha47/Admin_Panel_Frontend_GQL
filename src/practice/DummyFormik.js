import { Field, Form, Formik } from "formik";
import * as Yup from "yup";

const DummyFormik = () => {
  ///////////////////////////////
  const mySchema = Yup.object({
    email: Yup.string().email("Invalid Email!").required("Email is required!"),
    password: Yup.string()
      .min(6, "should be more than 6 chars")
      .max(30)
      .required("Enter password!"),
    remember: false,
  });

  return (
    <>
      <Formik
        initialValues={{ email: "", password: "" }} // form values
        validationSchema={mySchema}
        onSubmit={(values) =>
          console.log(`Form submitted with values: ${values}`)
        }
      >
        {({ errors, touched }) => (
          <Form>
            <label>Email:</label>
            <Field name="email" />
            {errors.email && touched.email && <div>{errors.email}</div>}
            <br></br>
            <label>Password:</label>
            <Field name="password" />
            {errors.password && touched.password && (
              <div>{errors.password}</div>
            )}
            <br></br>

            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </>
  );
};
export default DummyFormik;
