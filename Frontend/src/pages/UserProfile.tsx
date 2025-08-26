import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { jwtTokenAction } from "../redux/reducer/AuthReducer";
import type UserProfile from "../interfaces/UserProfileInterface";

const PROFILE_API_URL = import.meta.env.VITE_PROFILE_API_URL;
const REFRESHTOKEN = import.meta.env.VITE_REFRESHTOKEN;

const Profile = () => {
  const dispatch = useDispatch();
  const token = useSelector((state: any) => state.auth.jwtToken);
  const [userData, setUserData] = useState<UserProfile | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      let currentToken = token;
      console.log("Initial token:", currentToken); // Debug

      if (!currentToken) {
        try {
          const res = await fetch(REFRESHTOKEN, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          });
          const data = await res.json();
          console.log("Refresh response:", data);
          if (data.accessToken) {
            dispatch(jwtTokenAction(data.accessToken));
            currentToken = data.accessToken;
            console.log("Updated token:", currentToken); 
          } else {
            console.log("No access token in response");
            return;
          }
        } catch (err: any) {
          console.log("Refresh failed:", err.message);
          return;
        }
      }

      try {
        const res = await fetch(PROFILE_API_URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentToken}`,
          },
          credentials: "include",
        });
        const data = await res.json();
        console.log("Profile response:", data); 
        setUserData(data);
      } catch (err: any) {
        console.log("Profile fetch error:", err.message);
      }
    };

    fetchData();
  }, [token, dispatch]);

  return (
    <div>
      <h2>User Profile</h2>
      <p>{userData?.message}</p>
      <p>Name: {userData?.name}</p>
    </div>
  );
};

export default Profile;
