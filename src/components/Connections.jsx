import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { Link } from "react-router-dom";

const Connection = () => {
  const connections = useSelector((store) => store.connection);
  const dispatch = useDispatch();
  const fetchData = async () => {
    try {
      const res = await axios.get(BASE_URL + "/request/connection", {
        withCredentials: true,
      });
      dispatch(addConnections(res?.data?.connections));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!connections) return;
  if (connections.length === 0) {
    return (
      <strong>
        <p className="flex justify-center my-10 text-3xl">
          No Connection Found
        </p>
      </strong>
    );
  }
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center text-white">
        Connections
      </h2>
      <ul className="grid gap-4 md:grid-cols-2">
        {connections.map((conn) => {
          const { _id, firstName, lastName, about, photoUrl } = conn;
          return (
            <li
              key={_id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={
                    photoUrl ||
                    "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/user-profile-icon.png"
                  }
                  alt={`${firstName} ${lastName}`}
                  className="w-16 h-16 rounded-full object-cover border"
                />
                <div>
                  <p className="text-lg font-semibold text-black">
                    {firstName} {lastName}
                  </p>
                  <p className="text-sm text-gray-800 mt-1">{about}</p>
                </div>
              </div>
              <div className="mt-4 text-right">
                <Link to={"/chat/" + _id}>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                    Chat
                  </button>
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Connection;
