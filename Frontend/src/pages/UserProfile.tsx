import { useEffect, useState } from "react";
const PROFILE_API_URL = import.meta.env.VITE_PROFILE_API_URL;
import type UserProfile from "../interfaces/UserProfileInterface";
import { useSelector } from "react-redux";

const profile = () => {
  const token = useSelector((state: any) => state.auth.jwtToken);
  const [userData, setUserData] = useState<UserProfile | null>(null);

  useEffect(() => {
    if (!token) return;

    fetch(PROFILE_API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setUserData(data))
      .catch((err) => console.log("Error :", err.message));
  }, [token]);

  return (
    <div>
      <h2>User Profile</h2>
      <p>{userData?.message}</p>
      <p>Name: {userData?.name}</p>
    </div>
  );
};

export default profile;
