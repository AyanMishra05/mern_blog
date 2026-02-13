import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { TextInput, Button, Label, Alert, Spinner } from "flowbite-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  signInStart,
  signInFailure,
  signInSuccess,
} from "../redux/user/userSlice.js";
import { useSelector } from "react-redux";

const SignIn = () => {
  const [formData, setFormData] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error: errorMessage } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value.trim(),
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("All fields are required"));
    }
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }
      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (err) {
      dispatch(signInFailure(err.message));
    }
  };
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* left-side */}
        <div className="flex-1">
          <Link to="/" className=" font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              BELLA's
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5 font-medium ">
            New here? Sign in to unlock full access and start your journey with
            us.
          </p>
        </div>
        {/*right */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label
                value="Your username"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                {" "}
                Your email
              </Label>
              <TextInput
                type="text"
                placeholder="Email"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label
                value="Your Password"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Your password
              </Label>
              <TextInput
                type="password"
                placeholder="********"
                id="password"
                onChange={handleChange}
              />
            </div>
            <Button
              className="w-95 h-10 relative inline-flex items-center justify-center p-0.5
                overflow-hidden text-sm font-medium rounded-lg
                text-white dark:text-white
                bg-gradient-to-br from-purple-600 to-pink-500
                hover:text-white
                focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm">
                    <span className="pl-3">Loading...</span>
                  </Spinner>
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Dont have an account?</span>
            <Link to="/sign-up" className="text-blue-500">
              Sign Up
            </Link>
          </div>
          {errorMessage && (
            <Alert color="failure" className="mt-5">
              {errorMessage}
            </Alert>
          )}
          ;
        </div>
      </div>
    </div>
  );
};

export default SignIn;
