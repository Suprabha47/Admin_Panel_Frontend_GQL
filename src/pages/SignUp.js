import { useState, useEffect } from "react";
import SignUpInBtn from "../components/SignUpInBtn";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { useMutation } from "@apollo/client";
import { SIGN_UP } from "../apollo/userAuthentication/userMutations";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(true);

  const [signUp] = useMutation(SIGN_UP);
  const navigate = useNavigate();
  const userState = useSelector((state) => state.user.status);

  useEffect(() => {
    if (userState) setTimeout(() => navigate("/"), 500);
  }, [userState]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    try {
      const { data } = await signUp({
        variables: {
          firstName,
          lastName,
          email,
          password,
        },
      });
      console.log(data);
      navigate("/sign-in");
    } catch (err) {
      const msg = err?.message
        ?.split(" ")
        ?.slice(5)
        ?.join(" ")
        ?.replaceAll("`", "");
      toast.error(msg);
    }
  };

  if (userState) return null;

  return (
    <div className="bg-light min-vh-100 d-flex justify-content-center align-items-center position-relative overflow-hidden ">
      {/* Background circles */}
      <div
        className="position-absolute rounded-circle bg-info bg-gradient"
        style={{
          width: "300px",
          height: "300px",
          top: "-100px",
          right: "-100px",
        }}
      />
      <div
        className="position-absolute rounded-circle bg-primary bg-gradient opacity-50"
        style={{
          width: "200px",
          height: "200px",
          bottom: "-100px",
          left: "-100px",
        }}
      />

      {/* Form Card */}
      <div
        className="bg-white rounded p-5 shadow my-4 px-4 mx-2"
        style={{ width: "100%", maxWidth: "450px", zIndex: 1 }}
      >
        <div className="text-center mb-4">
          <h2 className="text-center fw-bold mb-2">Create an Account</h2>
        </div>
        <p className="text-center text-muted ">
          Already have an Account?{" "}
          <Link to="/sign-in" className="text-primary text-decoration-none">
            Login
          </Link>
        </p>
        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-check mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              checked={agreeTerms}
              onChange={() => setAgreeTerms(!agreeTerms)}
              id="termsCheck"
              required
            />
            <label className="form-check-label" htmlFor="termsCheck">
              I agree to all the Terms & Condition
            </label>
          </div>

          <button className="btn btn-primary w-100 mb-3" type="submit">
            Sign up
          </button>
        </form>
        <hr className="my-4" />
        <p className="text-center mb-3">Or create an account using:</p>
        <SignUpInBtn />
      </div>

      <ToastContainer />
    </div>
  );
};

export default SignUp;
