import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setfirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [about, setAbout] = useState(user.about);
  const [skills, setSkills] = useState(user?.skills);
  const [error, setError] = useState("");
  const [showtoast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  const saveProfile = async () => {
    try {
      setError("");
      const res = await axios.post(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          age,
          photoUrl,
          about,
          skills,
        },
        {
          withCredentials: true,
        }
      );
      console.log(res);
      dispatch(addUser(res.data.user));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 2000);
    } catch (error) {
      console.error(error);
      const message = error?.response?.data || "Something went Wrong";
      setError(`Failed to save profile : ${message}`);
    }
  };

  return (
    <>
      <div className="flex justify-center my-2 gap-10">
        <div className="flex justify-center">
          <div className="card card-border bg-base-300 justify-center w-90">
            <div className="card-body">
              <h2 className="card-title justify-center">Edit Profile</h2>
              <div className="m-1">
                <fieldset className="fieldset">
                  <legend className="fieldset-legend font-bold">
                    First Name
                  </legend>
                  <input
                    onChange={(e) => {
                      setfirstName(e.target.value);
                    }}
                    type="text"
                    className="input"
                    placeholder=""
                    value={firstName}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend font-bold">
                    Last Name
                  </legend>
                  <input
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                    type="text"
                    className="input"
                    placeholder=""
                    value={lastName}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend font-bold">Age</legend>
                  <input
                    onChange={(e) => {
                      setAge(e.target.value);
                    }}
                    type="number"
                    className="input"
                    placeholder=""
                    value={age}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend font-bold">
                    Photo URL
                  </legend>
                  <input
                    onChange={(e) => {
                      setPhotoUrl(e.target.value);
                    }}
                    type="text"
                    className="input"
                    placeholder=""
                    value={photoUrl}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend font-bold">About</legend>
                  <input
                    onChange={(e) => {
                      setAbout(e.target.value);
                    }}
                    type="text"
                    className="input"
                    placeholder=""
                    value={about}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend font-bold">Skills</legend>
                  <input
                    className="input w-full"
                    value={Array.isArray(skills) ? skills.join(", ") : skills}
                    onChange={(e) =>
                      setSkills(e.target.value.split(",").map((s) => s.trim()))
                    }
                    placeholder="e.g. HTML, CSS, JavaScript"
                  />
                </fieldset>
                <p className="text-red-500">{error}</p>
                <div className="card-actions justify-center mt-1">
                  <button className="btn btn-primary" onClick={saveProfile}>
                    Save Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <UserCard
          user={{ firstName, lastName, age, photoUrl, about, skills }}
        />
      </div>
      {showtoast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>profile save successfully</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
