import axios from "axios";
import React, { useState, useEffect } from "react";
import { BASE_URL } from "../../Components/Utility/Utility";

function AttendancePage() {
  const [onLeave, setOnLeave] = useState([]);
  const id = JSON.parse(localStorage.getItem("orgId"));
  useEffect(() => {
    const getAllOnLeave = async () => {
      const { data } = await axios.get(BASE_URL + "get-attendance/" + id);
      console.log(data);
      setOnLeave(data);
    };
    getAllOnLeave();
    return () => {};
  }, []);

  return (
    <div className="bg-white rounded-md shadow-md space-y-2 w-1/2 p-4">
      <h1 className=" text-lg font-semibold text-left text-gray-900 bg-white rounded-md ">
        On Leave Today
      </h1>
      {onLeave.map((leave) => {
        return (
          <div className="bg-gray-100 p-2 rounded-md flex space-x-2 items-center">
            <img
              src="userAvatar.svg"
              className="w-8 h-8 rounded-full border"
              alt="User Profile"
            />
            <div>
              <h3 className="font-semibold text-sm app-color-black">
                {leave.user.f_name + " " + leave.user.l_name}
              </h3>
              <p className="font-semibold text-xs text-gray-600">
                {leave.user.position.pos_name}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default AttendancePage;
