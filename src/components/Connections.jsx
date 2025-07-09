import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connection = () => {
  const connections = useSelector((store) => store.connection);
  const dispatch = useDispatch();
  const fetchData = async () => {
    try {
      const res = await axios.get(BASE_URL + "/request/connection", {
        withCredentials: true,
      });
      console.log(res?.data?.connections);
      dispatch(addConnections(res?.data?.connections));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!connections) return;
  if (connections.length === 0) return <p>"No Connection Found"</p>;
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 flex justify-center">
        Connections
      </h2>
      <ul className="space-y-2">
        {connections.map((conn) => {
          const { firstName, lastName, about, photoUrl } = conn;
          return (
            <li key={conn._id} className="bg-gray-500 p-3 rounded">
              <div className="flex items-center gap-4">
                <img
                  src={photoUrl}
                  alt={`${firstName} ${lastName}`}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <p>
                    <strong>Name:</strong> {firstName} {lastName}
                  </p>
                  <p>
                    <strong>About:</strong> {about}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Connection;
