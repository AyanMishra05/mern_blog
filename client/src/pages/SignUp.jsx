import React from "react";
import { Link } from "react-router-dom";
import { TextInput, Button, Label, Alert, Spinner } from "flowbite-react";

export default function SignUp() {
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
            New here? Sign up to unlock full access and start your journey with
            us.
          </p>
        </div>
        {/*right */}
        <div className="flex-1">
          <form className="flex flex-col gap-4">
            <div>
              <Label
                value="Your username"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Your username
              </Label>

              <TextInput type="text" placeholder="Username" id="username" />
            </div>
            <div>
              <Label
                value="Your username"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                {" "}
                Your email
              </Label>
              <TextInput type="text" placeholder="Email" id="email" />
            </div>
            <div>
              <Label
                value="Your Password"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Your password
              </Label>
              <TextInput type="password" placeholder="Password" id="password" />
            </div>
            <Button gradientDuoTone="purpleToPink" type="submit">
              Sign Up
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account?</span>
            <Link to="/sign-in" className="text-blue-500">
              Sign In
            </Link>
          </div>
          {/* {errorMessage && (
            <Alert color="failure" className="mt-5">
              {errorMessage}
            </Alert>
          )} */}
          ;
        </div>
      </div>
    </div>
  );
}
