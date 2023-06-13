import { useContext } from "react";
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from "../../../Components/AuthProvider/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
const SocialLogin = () => {
  const { googleLoge } = useContext(AuthContext);
  const navigat = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const handleGoogleSignIn = () => {
    googleLoge().then((res) => {
      const logdUser = res.user;
      console.log(logdUser);
      const collectUser = {
        name: logdUser.displayName,
        email: logdUser.email,
        photo: logdUser.photoURL,
      };
      fetch("http://localhost:5000/users", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(collectUser),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            navigat(from, { replace: true });
          }
        });
    });
  };
  return (
    <div>
      <div className="divider"></div>
      <div className="w-full text-center my-4">
        <button
          onClick={handleGoogleSignIn}
          className="btn btn-circle btn-outline"
        >
          <FaGoogle></FaGoogle>
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
