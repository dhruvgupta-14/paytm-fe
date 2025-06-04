import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "./component/Button";
import { InputBox } from "./component/InputBox";
import { Heading } from "./component/Heading";
import { SubHeading } from "./component/SubHeading";
import { BottomWarning } from "./component/BottomWarning";
import axios from "axios";
import toast from "react-hot-toast";

const EditUser = () => {
  const navigate=useNavigate()
  const apiUrl=import.meta.env.VITE_API_URL
  const token=localStorage.getItem("token")
  const [searchParams] = useSearchParams();
  const submitHandler=async()=>{
    try{
     const response=await axios.put(apiUrl+"/edit/user",{
      firstName,lastName
     },{
      headers:{
        Authorization:"Bearer "+token
      }
     })
     toast.success(response.data.message)
     navigate('/dashboard')
    }catch(e){
      console.log(e)
      toast.error(e.response.data.message)
    }
  }
  const [firstName, setFirstName] = useState(searchParams.get("firstName"));
  const [lastName, setLastName] = useState(searchParams.get("lastName"));
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Edit User"} />
          <SubHeading label={"Enter your infromation to update an account"} />
          <InputBox
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            placeholder={firstName}
            label={"First Name"}
          />
          <InputBox
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            placeholder={lastName || "Not Provided"}
            label={"Last Name"}
          />
          <div className="pt-4">
            <Button label={"Update"} onClick={submitHandler} />
          </div>
          <BottomWarning
            label={"Don't want to update?"}
            buttonText={"Back"}
            to={"/dashboard"}
          />
        </div>
      </div>
    </div>
  );
};

export default EditUser;
