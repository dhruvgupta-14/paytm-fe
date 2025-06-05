import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Heading } from "./component/Heading";
import { SubHeading } from "./component/SubHeading";
import { InputBox } from "./component/InputBox";
import { Button } from "./component/Button";
import { BottomWarning } from "./component/BottomWarning";
import toast from "react-hot-toast";
const apiUrl = import.meta.env.VITE_API_URL;
export const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/dashboard");
  }, []);
  const submitHandler = async () => {
    try {
      const response = await axios.post(apiUrl + "/signin", {
        username,
        password,
      });
      console.log(response)
      if (response.data.success) {
        const token = response.data.token;
        localStorage.setItem("token", token);
        toast.success("Signin Successfully");
        navigate("/dashboard");
      }
    } catch (e) {
      toast.error(
        e.response.data.message ||
          "Internal server error try again after some time"
      );
      console.log("sign in",e);
    }
  };

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign in"} />
          <SubHeading label={"Enter your credentials to access your account"} />
          <InputBox
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            placeholder="username"
            label={"Username"}
          />
          <InputBox
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Password"
            label={"Password"}
          />
          <div className="pt-4">
            <Button onClick={submitHandler} label={"Sign in"} />
          </div>
          <BottomWarning
            label={"Don't have an account?"}
            buttonText={"Sign up"}
            to={"/signup"}
          />
        </div>
      </div>
    </div>
  );
};
