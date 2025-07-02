import { useEffect, useState } from "react";
import SignUpInBtn from "../components/SignUpInBtn";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeUserState } from "../redux/userSlice";
import { toast, ToastContainer } from "react-toastify";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user.status);

  useEffect(() => {
    console.log("sign-in: ", userState);
    if (userState) navigate("/");
  }, [userState]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/sign-in`, {
        email,
        password,
      })
      .then((response) => {
        if (response.status === 200) {
          const name = response.data;
          console.log("in response block");
          return (
            dispatch(changeUserState({ name, status: true })) && navigate("/")
          );
        }
      })
      .catch((err) => {
        console.log("error block!");
        console.log(err);
        toast.error("Invalid Credentials");
        setEmail("");
        setPassword("");
      });
  };
  if (userState) return <></>;
  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <form
        onSubmit={handleSubmit}
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
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="form-check mb-3">
          <input
            className="form-check-input"
            type="checkbox"
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
          <Link className="text-decoration-none">Forgot your password?</Link>
        </div>

        <hr />

        <p className="text-center">Or sign in using:</p>

        <SignUpInBtn />
      </form>
      <ToastContainer />
    </div>
  );
};
export default SignIn;
