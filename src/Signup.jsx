import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Heading } from "./component/Heading";
import { SubHeading } from "./component/SubHeading";
import { InputBox } from "./component/InputBox";
import { Button } from "./component/Button";
import { BottomWarning } from "./component/BottomWarning";
import toast from "react-hot-toast";

export const Signup = () => {
  const apiUrl=import.meta.env.VITE_API_URL
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  useEffect(()=>{
   const token=localStorage.getItem("token")
   if(token) navigate('/dashboard')
  },[])
  const submitHandler=async()=>{
    try{
      const response =await axios.post(apiUrl+"/signup",{
        username,firstName,lastName,password
      })
      const token=response.data.token
      localStorage.setItem("token",token)
      toast.success('SignUp Successfully')
      navigate('/dashboard')
    }catch(e){
      toast.error(e.response.data.errors[0].message||'Internal Server error,Try again after Some Time')
      console.log(e)
    }
  }

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign up"} />
          <SubHeading label={"Enter your infromation to create an account"} />
          <InputBox
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            placeholder="FirstName"
            label={"First Name"}
          />
          <InputBox
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            placeholder="LastName"
            label={"Last Name"}
          />
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
            <Button
              onClick={submitHandler}
              label={"Sign up"}
            />
          </div>
          <BottomWarning
            label={"Already have an account?"}
            buttonText={"Sign in"}
            to={"/signin"}
          />
        </div>
      </div>
    </div>
  );
};