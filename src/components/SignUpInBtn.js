import { signInWithPopup, auth, googleProvider } from "../utils/firebase";
import { useMutation } from "@apollo/client";
import { useDispatch } from "react-redux";
import { GOOGLE_AUTH } from "../apollo/userAuthentication/userMutations";
import { changeUserState } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

const SignUpInBtn = () => {
  const dispatch = useDispatch();
  const [googleAuth] = useMutation(GOOGLE_AUTH);
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const userData = result.user;

      const { uid, displayName, email, photoURL } = userData;
      const nameParts = displayName?.trim()?.split(" ") || ["User", "Name"];

      const firstName = nameParts[0];
      const lastName = nameParts.splice(1).join(" ");

      const { data } = await googleAuth({
        variables: {
          googleId: uid,
          firstName,
          lastName,
          email,
          photoUrl: photoURL,
        },
      });

      const { user, token } = await data.googleAuth;
      localStorage.setItem("token", token);
      dispatch(
        changeUserState({
          name: user.firstName,
          status: true,
          photoUrl: user.photoUrl,
        })
      );

      navigate("/", { replace: true });
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  return (
    <div className="d-grid gap-2">
      <button className="btn btn-outline-danger" onClick={handleGoogleLogin}>
        <i className="bi bi-google me-2"></i> Continue with Google
      </button>
    </div>
  );
};
export default SignUpInBtn;
