import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";
import { removeUser } from "../utils/userSlice";
import { removeFeed } from "../utils/feedSlice";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const { firstName, photoUrl } = user || {};
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlelogo = () => {
  if (user) {
    navigate("/feed");
  } else {
    navigate("/login");
  }
};

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      dispatch(removeFeed());
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      navigate("/login");
    }
  };
  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="flex-1">
        <button onClick={handlelogo} className="btn btn-ghost text-xl">
          👩‍💻 devTinder
        </button>
      </div>
      <div className="flex gap-2">
        {user && (
          <div className="dropdown dropdown-end mx-6 flex">
            <p className="pt-1.5 pr-3.5">Hi {firstName}</p>
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="user's photo" src={photoUrl} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-12 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                </Link>
              </li>
              <li>
                <Link to={"/connection"}>Connections</Link>
              </li>
               <li>
                <Link to={"/request"}>Requests</Link>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
