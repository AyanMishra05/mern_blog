import { Button } from "flowbite-react";
import React from "react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import app from "../firebase.js";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice.js";
import { useNavigate } from "react-router-dom";

const OAuth = () => {
  const dispatch = useDispatch(); // ✅ Added
  const navigate = useNavigate(); // ✅ Added

  const handleGoogleCClick = async () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);

      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: resultsFromGoogle.user.displayName,
          email: resultsFromGoogle.user.email,
          googlePhotoUrl: resultsFromGoogle.user.photoURL,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        dispatch(signInSuccess(data)); // ✅ Fixed
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Button
      type="button"
      className="w-full h-10 flex items-center justify-center
                text-white
                bg-gradient-to-br from-purple-700 to-blue-600
                hover:from-purple-800 hover:to-blue-700
                focus:ring-4 focus:outline-none focus:ring-blue-300"
      onClick={handleGoogleCClick}
    >
      <AiFillGoogleCircle className="w-6 h-6 mr-2" />
      Sign in with Google
    </Button>
  );
};

export default OAuth;
