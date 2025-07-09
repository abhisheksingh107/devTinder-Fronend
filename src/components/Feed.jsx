import axios from "axios";
import UserCard from "./UserCard";
import { BASE_URL } from "../utils/constant";
import { useEffect } from "react";
import { addFeed } from "../utils/feedSlice";
import { useDispatch, useSelector } from "react-redux";
const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const getFeed = async () => {
    try {
      if (feed) {
        return;
      }
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data));
      // console.log(res.data);
    } catch (error) {
      // console.error(error);
    }
  };

  useEffect(() => {
    getFeed();
  });

  return feed && (
    <div className="flex justify-center my-5">
      <UserCard user = {feed[0]}/>
    </div>
  );
};

export default Feed;
