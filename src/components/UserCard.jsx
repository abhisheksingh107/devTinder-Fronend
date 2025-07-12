import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const handleSendRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + _id,
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeFeed(_id));
    } catch (error) {
      console.error(error);
    }
  };

  if(!user){return null};

  const { _id, firstName, lastName, photoUrl, age, about, skills } = user;

  return (
    <div>
      <div className="card bg-base-300 w-96 h-[80vh] shadow-sm overflow-hidden">
        <figure>
          <img
            className="w-full h-[50vh] mt-1 object-cover"
            src={
              photoUrl ||
              "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/user-profile-icon.png"
            }
            alt={`${firstName} ${lastName}'s Profile picture`}
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{`${firstName} ${lastName}, ${
            age ? ` ${age} ` : ""
          }`}</h2>
          <p>{about}</p>
          {skills?.length > 0 && (
            <p className="font-semibold">
              Skills: &nbsp;
              <span className="font-light">{skills.join(", ")}</span>
            </p>
          )}
          <div className="card-actions justify-center my-4">
            <button className="btn btn-primary" onClick={() => {handleSendRequest("ignored", _id)}}>Ignore</button>
            <button className="btn btn-secondary" onClick={() => {handleSendRequest("interested", _id)}}>interested</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
