import axios from "axios";
import { useState } from "react";
import { Link, useAsyncError, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const SignUP = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirsttName] = useState("");
  const [lastName, setLastName] = useState("");
  const [showtoast, setShowToast] = useState(false);
  const [errorToast, setErrorToast] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      setShowToast(true);
      console.log("Toast showing:", showtoast);
      setTimeout(() => {
        setShowToast(false);
        navigate("/profile");
      }, 2000);
    } catch (error) {
      console.error(error);
      console.error(error?.response?.data);
      const message = error?.response?.data || "Something went Wrong";
      setError(`${message}`);
      setErrorToast(true);
      setTimeout(() => {
        setErrorToast(false);
      }, 2000);
    }
  };

  return (
    <div className="flex justify-center m-3">
      <div className="card card-border bg-base-300 justify-center w-90 h-[78vh]">
        <div className="card-body">
          <h1 className="card-title text-3xl">Create an account</h1>
          <fieldset className="fieldset mt-3">
            <legend className="fieldset-legend text-lg text-gray-400 font-semibold">
              <strong>First Name *</strong>
            </legend>
            <input
              onChange={(e) => {
                setFirsttName(e.target.value);
              }}
              type="text"
              className="input"
              value={firstName}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-lg text-gray-400 font-semibold">
              <strong>Last Name *</strong>
            </legend>
            <input
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              type="text"
              className="input"
              value={lastName}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-lg text-gray-400 font-semibold">
              <strong>Email *</strong>
            </legend>
            <input
              onChange={(e) => {
                setEmailId(e.target.value);
              }}
              type="text"
              className="input"
              value={emailId}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-lg text-gray-400 font-semibold">
              <strong>Password *</strong>
            </legend>
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="text"
              className="input"
              value={password}
            />
          </fieldset>
          <div className="card-actions justify-center mt-4">
            <button className="btn btn-primary w-full" onClick={handleSignup}>
              Get Started
            </button>
          </div>
          <div className="mt-4 text-center ">
            <p>
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-purple-400 hover:underline cursor-pointer"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
      {showtoast && (
        <div className="fixed top-5 text-center z-50">
          <div className="alert alert-success shadow-lg">
            <span>
              Your account has been created successfully! Please update your
              profile.
            </span>
          </div>
        </div>
      )}
      {errorToast && (
        <div className="fixed top-5 toast-center">
          <div className="alert alert-error">
            <span>{error}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUP;
