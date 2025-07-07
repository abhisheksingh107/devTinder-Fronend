import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";

const Login = () => {
  const [emailId, setEmailId] = useState("Abhishek@singh.com");
  const [password, setPassword] = useState("Abhishek@123");
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
    } catch (error) {
      console.error("Login failed:", err.response?.data || err.message);
    }
  };

  return (
    <div className="flex justify-center m-2">
      <div className="card card-border bg-base-300 justify-center w-80">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <fieldset className="fieldset">
            <legend className="fieldset-legend font-semibold">Email ID:</legend>
            <input
              onChange={(e) => {
                setEmailId(e.target.value);
              }}
              type="text"
              className="input"
              placeholder="example@gmail.com"
              value={emailId}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend font-semibold">Password</legend>
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="text"
              className="input"
              value={password}
            />
          </fieldset>

          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
