import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";

const Profile = () => {
  const user = useSelector((store) => store.user);

  if (!user) {
    return <div className="text-center text-gray-500">Loading profile...</div>;
  }

  return <EditProfile user={user} />;
};

export default Profile;
