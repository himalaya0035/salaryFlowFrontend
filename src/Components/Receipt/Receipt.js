import axios from "axios";
import React from "react";
import { BASE_URL } from "../Utility/Utility";

function Receipt({data,closeModalFn}) {
  const acceptRequest = async () => {
    const obj = {
      "reimb_id":data.id,
      "isClaimed":1
    }
    const response = await axios.put(BASE_URL + 'update-reimb',obj);
    closeModalFn();
    window.location.reload();
  }
  const declineRequest = async () => {
    const obj = {
      "reimb_id":data.id,
      "isClaimed":2
    }
    const response = await axios.put(BASE_URL + 'update-reimb',obj);
    closeModalFn();
    window.location.reload();
  }
  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
    <div className="w-full flex items-center mb-4 rounded-md justify-between h-[100px] bg-gray-100 p-4">
      <div>
        <h3 className="font-[500] text-md">{data.user.f_name + ' ' + data.user.l_name}</h3>
        <p className="font-[500] text-gray-600 text-sm">Food Expenses</p>
        <p className="font-[500] text-gray-600 text-[13px]">{new Date(data.createdAt).toLocaleDateString('en-GB', {
                  day: 'numeric', month: 'short', year: 'numeric'
                }).replace(/ /g, ' ')}</p>
      </div>
      <div className="text-center">
        <i className={`fa fa-info-circle text-green-600 text-[25px] }`}></i>
        <p className="text-gray-500 mt-2 font-bold">Rs. {data.rmb_amt}</p>
      </div>
    </div>
    <div className="flex mb-4">
      <div className="w-2/3">
        <img src={data.rmb_receipt} alt="Receipt Image" style={{
          'objectFit':'cover',

        }} className="w-full  rounded-lg shadow-lg" />
      </div>
      <div className="w-1/3 ml-4 bg-gray-100 rounded-md p-4">
        <div className="text-gray-700 font-semibold mb-2">Remark</div>
        <div className="text-gray-600">{data.remark}</div>
      </div>
    </div>
    <div className="mt-4 flex justify-center">
      <button onClick={acceptRequest} className="px-4 py-2 rounded-lg bg-royalBlue text-white font-semibold hover:bg-green-700 focus:outline-none focus:shadow-outline">
        Accept
      </button>
      <button onClick={declineRequest} className="px-4 py-2 rounded-lg bg-gray-800 text-white font-semibold hover:bg-red-700 focus:outline-none focus:shadow-outline ml-4">
        Decline
      </button>
    </div>
  </div>
  
  );
}

export default Receipt;
