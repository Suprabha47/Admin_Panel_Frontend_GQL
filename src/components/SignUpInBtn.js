import {
  signInWithPopup,
  auth,
  //facebookProvider,
  googleProvider,
} from "../utils/firebase";
import axios from "axios";
import { useDispatch } from "react-redux";
import { changeUserState } from "../redux/userSlice";

const SignUpInBtn = () => {
  const dispatch = useDispatch();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const { uid, displayName, email, photoUrl } = user;
      console.log("user data: ", uid, displayName, email, photoUrl);
      await axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/google-auth`, {
          uid,
          displayName,
          email,
          photoUrl,
        })
        .then((res) => {
          if (res.status === 200 || res.status === 201) {
            const name = res.data.firstName;
            dispatch(changeUserState({ name, status: true }));
          } else {
            console.log("Unexpected status code");
          }
        })
        .catch((err) => console.error("Login Failed ", err));
    } catch (err) {
      console.error("Google login error: ", err);
    }
  };

  // const handleFacebookLogin = async () => {
  //   try {
  //     const result = await signInWithPopup(auth, facebookProvider);
  //     console.log("Facebook user:", result.user);
  //   } catch (err) {
  //     console.error("Facebook login error:", err);
  //   }
  // };

  return (
    <div className="d-grid gap-2">
      <button className="btn btn-outline-danger" onClick={handleGoogleLogin}>
        <i className="bi bi-google me-2"></i> Continue with Google
      </button>
      <button className="btn btn-outline-primary" disabled>
        <i className="bi bi-facebook me-2"></i> Continue with Facebook
      </button>
    </div>
  );
};
export default SignUpInBtn;
