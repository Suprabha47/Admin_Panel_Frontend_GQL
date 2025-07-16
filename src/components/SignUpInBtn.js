import { signInWithPopup, auth, googleProvider } from "../utils/firebase";
import { useMutation } from "@apollo/client";
import { useDispatch } from "react-redux";
import { GOOGLE_AUTH } from "../apollo/userAuthentication/userMutations";
import { changeUserState } from "../redux/userSlice";

const SignUpInBtn = () => {
  const dispatch = useDispatch();
  const [googleAuth] = useMutation(GOOGLE_AUTH);

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const { uid, displayName, email, photoUrl } = user;

      const nameParts = displayName?.trim()?.split(" ") || ["User", "Name"];

      const firstName = nameParts[0];
      const lastName = nameParts.splice(1).join(" ");

      const { data } = await googleAuth({
        variables: {
          googleId: uid,
          firstName,
          lastName,
          email,
          photoUrl,
        },
      });

      const { firstName: name, photoUrl: url } = await data.googleAuth;
      dispatch(changeUserState({ name: name, status: true }));
    } catch (err) {
      console.log("Error: ", err);
    }
  };

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
