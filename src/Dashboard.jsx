import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Appbar } from "./component/Appbar";
import { Balance } from "./component/Balance";
import { Users } from "./component/Users";
import toast from "react-hot-toast";
import axios from "axios";
import { Button } from "./component/Button";

export const Dashboard = () => {
  const [balance, setBalance] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;
  const wsUrl = import.meta.env.VITE_WS_URL;
  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchUser = async () => {
      try {
        const response = await axios.get(apiUrl + "/me", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });

        if (response.data.success) {
          const { firstName, lastName, balance, userId } = response.data;
          setFirstName(firstName);
          setLastName(lastName);
          setBalance(balance);
          setUserId(userId);
          const socket = new WebSocket(wsUrl);

          socket.addEventListener("open", () => {
            socket.send(
              JSON.stringify({
                type: "register",
                userId: userId,
              })
            );
          });

          socket.addEventListener("message", (e) => {
            const message = JSON.parse(e.data);
            if (message.type === "moneyReceived") {
              setBalance((prev) => prev + Number(message.data.amount));
              toast.success(
                `💰 You received ₹${message.data.amount} from ${message.data.sender}`
              );
            }
          });

          socket.addEventListener("close", () => {
            toast.error("For now you dont receive notification");
            console.log("WebSocket disconnected");
          });

          socket.addEventListener("error", (err) => {
            console.error("WebSocket error", err);
          });
        }
      } catch (e) {
        console.log(e);
        toast.error("Signin again, token expired");
        localStorage.removeItem("token");
        navigate("/signin");
      }
    };

    fetchUser();
  }, []);
  const generate = async () => {
    try {
      const response = await axios.get(apiUrl + "/account/generate", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      if (response.data.success) {
        setBalance(response.data.balance);
        toast.success("5000 amount is added to your wallet")
      }
    } catch (e) {
      console.log(e);
      toast.error('unable to add more balance now')
    }
  };
  return (
    <div>
      <Appbar firstName={firstName} lastName={lastName} />
      <div className="m-8">
        <div className="flex justify-between items-center">
          <Balance value={balance} />
          <div>
            {" "}
            <Button
              label="Transactions"
              onClick={() => navigate(`/transaction`)}
            />
          </div>
        </div>
        <div className="w-60 mt-4 overflow-hidden h-12">
          <Button label="Generate More Money" onClick={generate} />
        </div>
        <Users />
      </div>
    </div>
  );
};
