import { useEffect, useState } from "react";
import { Button } from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const Users = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const [debouncedFilter, setDebouncedFilter] = useState("");
  const token = localStorage.getItem("token");
  //debouncing
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedFilter(filter);
    }, 300); 

    return () => clearTimeout(timer); 
  }, [filter]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(apiUrl + "/bulk/user", {
          headers: {
            Authorization: "Bearer " + token,
          },
          params:{
            name:filter
          }
        });
        setUsers(response.data.data);
      } catch (e) {
          toast.error(e?.response?.data?.message || "Failed to fetch users");
      }
    })();
  }, [debouncedFilter]);


  return (
    <>
      <div className="font-bold mt-6 text-lg">Users</div>
      <div className="mt-4 mb-10">
        <input
          onChange={(e) => setFilter(e.target.value)}
          type="text"
          placeholder="Search users..."
          className="w-full px-2 py-1 border rounded border-slate-200"
        />
      </div>
      <div>
        {users.length === 0 ? (
          <span>Please search valid firstname or lastname</span>
        ) : (
          users.map((user) => (
            <User key={user._id} user={user} />
          ))
        )}
      </div>
    </>
  );
};

function User({ user }) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between mb-4">
      <div className="flex">
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl">
            {user.firstName?.[0]?.toUpperCase() || "?"}
          </div>
        </div>
        <div className="flex flex-col justify-center h-full">
          <div>
            {user.firstName} {user.lastName}
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center h-full">
        <Button
          onClick={() => {
            navigate("/send?id=" + user._id + "&name=" + user.firstName);
          }}
          label={"Send Money"}
        />
      </div>
    </div>
  );
}
