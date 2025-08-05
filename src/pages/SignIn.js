import { useState } from "react";
import SignUpInBtn from "../components/SignUpInBtn";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeUserState } from "../redux/userSlice";
import { SIGN_IN } from "../apollo/userAuthentication/userMutations";
import { useMutation } from "@apollo/client";
import { Toaster, toast } from "react-hot-toast";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signIn] = useMutation(SIGN_IN);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await signIn({
        variables: {
          email,
          password,
        },
      });
      const { user, token } = await data.signIn;
      localStorage.setItem("token", token);
      dispatch(changeUserState({ name: user.firstName, status: true }));
      navigate("/", { replace: true });
    } catch (err) {
      toast.error(err.message);
      console.log("error: ", err.message);
    }
  };

  return (
    <div className="bg-light min-vh-100 d-flex justify-content-center align-items-center position-relative overflow-hidden">
      {/* Background circles */}
      <div
        className="position-absolute rounded-circle bg-info bg-gradient opacity-75"
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
          width: "250px",
          height: "250px",
          bottom: "-100px",
          left: "-100px",
        }}
      />
      <div
        className="position-absolute rounded-circle bg-primary bg-gradient opacity-25"
        style={{ width: "30px", height: "30px", top: "60%", right: "10%" }}
      />
      <div
        className="position-absolute rounded-circle bg-info bg-gradient opacity-50"
        style={{ width: "15px", height: "15px", top: "20%", left: "15%" }}
      />

      <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded shadow p-5"
          style={{ width: "100%", maxWidth: "400px", zIndex: 1 }}
        >
          <div className="text-center mb-4">
            <h3 className="mt-2 fw-bold">Sign In</h3>
            <p className="text-center  mb-4">
              New to Our Product? <Link to="/sign-up">Create an Account</Link>
            </p>
          </div>

          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              id="email"
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
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-check">
            <input type="checkbox" className="form-check-input" id="remember" />
            <label htmlFor="remember" className="form-check-label">
              Remember me?
            </label>
          </div>

          <div className="d-grid my-3 ">
            <button className="btn btn-primary w-100 mb-3" type="submit">
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
        <Toaster position="top-right" reverseOrder={true} />
      </div>
    </div>
  );
};
export default SignIn;
