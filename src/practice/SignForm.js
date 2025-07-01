import { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import SignUpInBtn from "../components/SignUpInBtn";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeUserState } from "../redux/userSlice";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);

  useEffect(() => {
    if (userState) navigate("/dashboard");
  }, [userState, navigate]);

  // ✅ Validation schema
  const SignInSchema = Yup.object().shape({
    email: Yup.string().email("Invalid Email!").required("Email is required!"),
    password: Yup.string()
      .min(6, "Minimum 6 characters")
      .required("Password is required!"),
    remember: Yup.boolean(),
  });

  // ✅ Form submission handler
  const handleSubmit = (values, { resetForm }) => {
    axios
      .post("http://localhost:3001/sign-in", {
        email: values.email,
        password: values.password,
      })
      .then((response) => {
        if (response.status === 200) {
          dispatch(changeUserState(true));
          navigate("/dashboard");
        }
      })
      .catch((err) => {
        alert("Invalid Credentials");
        resetForm();
      });
  };

  if (userState) return null;

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <Formik
        initialValues={{ email: "", password: "", remember: false }}
        validationSchema={SignInSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form
            className="card shadow-sm p-4"
            style={{ width: "100%", maxWidth: "26rem" }}
          >
            <h3 className="text-center mb-2">Sign In</h3>
            <p className="text-center mb-4">
              New to Our Product? <Link to="/sign-up">Create an Account</Link>
            </p>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <Field
                type="email"
                name="email"
                className="form-control"
                placeholder="Enter Email Address"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-danger"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <Field
                type="password"
                name="password"
                className="form-control"
                placeholder="Enter Password"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-danger"
              />
            </div>

            <div className="form-check mb-3">
              <Field
                type="checkbox"
                name="remember"
                className="form-check-input"
                id="keepSignedIn"
              />
              <label className="form-check-label" htmlFor="keepSignedIn">
                Keep me signed in
              </label>
            </div>

            <div className="d-grid mb-3">
              <button className="btn btn-dark" type="submit">
                Login
              </button>
            </div>

            <div className="text-center mb-3">
              <Link className="text-decoration-none">
                Forgot your password?
              </Link>
            </div>

            <hr />

            <p className="text-center">Or sign in using:</p>
            <SignUpInBtn />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignIn;
