import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [showtoast, setShowToast] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(res.data));
      return navigate("/feed");
    } catch (err) {
      // console.error(err);
      const message =
        err?.response?.data?.message ||
        err?.response?.data ||
        err?.message ||
        "Something went Wrong";
      setError(`Login failed: ${message}`);
      setShowToast(true);
    }
  };

  return (
    <div className="flex justify-center m-5">
      <div className="card card-border bg-base-300 justify-center w-90">
        <div className="card-body">
          <h1 className="card-title text-3xl">Welcome back</h1>
          <p className="justify-center font-semibold text-gray-600">
            Welcome back! Please enter your details.
          </p>
          <fieldset className="fieldset mt-5">
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

          <div className="text-purple-400 font-medium flex justify-end my-2 hover:underline cursor-pointer">
            <a>Forget Password ?</a>
          </div>
          {showtoast && (
            <div className="toast toast-top toast-center">
              <div className="alert alert-error">
                <span>{error}</span>
              </div>
            </div>
          )}
          <div className="card-actions justify-center">
            <button className="btn btn-primary w-full" onClick={handleLogin}>
              Sign In
            </button>
          </div>
          <div className="mt-5 text-center">
            <p>
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-purple-400 hover:underline cursor-pointer"
              >
                Create an Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
