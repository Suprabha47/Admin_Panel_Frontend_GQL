import { useState, useEffect } from "react";
import SignUpInBtn from "../components/SignUpInBtn";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const navigate = useNavigate();
  const userState = useSelector((state) => state.user.status);

  useEffect(() => {
    if (userState) navigate("/");
  }, [userState]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/sign-up`, {
        firstName,
        lastName,
        email,
        password,
      })
      .then((response) => {
        response.status === 201 && navigate("/sign-in");
      })
      .catch((err) => {
        if (err.status === 409) {
          alert(err.response.data);
          navigate("/sign-in");
        }
      });
  };
  if (userState) return <></>;
  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-5 rounded shadow-sm"
        style={{ width: "100%", maxWidth: "30rem" }}
      >
        <h2 className="text-center fw-bold mb-2">Create an Account</h2>
        <p className="text-center text-muted mb-4">
          Have an Account?{" "}
          <Link to="/sign-in" className="text-primary text-decoration-none">
            Sign In
          </Link>
        </p>
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            className="form-control "
            placeholder="Enter First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            className="form-control "
            placeholder="Enter Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="form-control "
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
            id="password"
            className="form-control"
            placeholder="Create Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="d-grid mb-3">
          <button className="btn btn-dark" type="submit">
            Create Account
          </button>
        </div>

        <p className="text-center text-muted small">
          By creating account, you agree to our{" "}
          <Link className="text-primary">Terms of Service</Link>
        </p>

        <hr className="my-4" />

        <p className="text-center mb-3">Or create an account using:</p>

        <SignUpInBtn />
      </form>
    </div>
  );
};
export default SignUp;
