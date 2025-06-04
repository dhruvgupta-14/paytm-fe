import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Appbar } from "./component/Appbar";
import { Balance } from "./component/Balance";
import { Users } from "./component/Users";
import toast from "react-hot-toast";
import axios from "axios";

export const Dashboard = () => {
  const [balance, setBalance] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;
  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("token");
      if (!token) return navigate("/signin");

      try {
        const response = await axios.get(apiUrl + "/me", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });

        if (response.data.success) {
          setFirstName(response.data.firstName);
          setLastName(response.data.lastName);
          setBalance(response.data.balance)
          return;
        }
      } catch (e) {
        console.log(e);
        toast.error("Signin again token expired");
        localStorage.removeItem("token");
        navigate("/signin");
        return;
      }
    })();
  }, []);

  return (
    <div>
      <Appbar firstName={firstName} lastName={lastName} />
      <div className="m-8">
        <Balance value={balance} />
        <Users/> 
      </div>
    </div>
  );
};
