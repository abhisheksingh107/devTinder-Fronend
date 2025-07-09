import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequest } from "../utils/requestSlice";

const Request = () => {
  const requests = useSelector((store) => store.request);
  const dispatch = useDispatch();
  const fetchData = async () => {
    try {
      const res = await axios.get(BASE_URL + "/request/received", {
        withCredentials: true,
      });
      console.log(res?.data?.connectionRequest);
      dispatch(addRequest(res?.data?.connectionRequest));
    } catch (error) {}
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!requests) return;
  if (requests.length === 0) {
    return <p>No request found</p>;
  }

  return (
    <div>
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4 flex justify-center">Requests</h2>
        <ul className="space-y-2">
          {requests.map((req) => {
            const { firstName, lastName, photoUrl, about, skills } =
              req.fromUserId;
            return (
              <li key={req._id} className="bg-gray-800 p-3 rounded">
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
                    <p>
                      <strong>Skills:</strong> {skills.join(", ")}
                    </p>
                    <div className="mt-1 flex justify-center gap-4">
                    <button className="btn btn-primary">Accepted</button>
                    <button className="btn btn-secondary">Rejected</button>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Request;
