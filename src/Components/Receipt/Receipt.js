import React from "react";

function Receipt() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
    <div className="w-full flex items-center mb-4 rounded-md justify-between h-[100px] bg-gray-100 p-4">
      <div>
        <h3 className="font-[500] text-md">Himalaya Gupta</h3>
        <p className="font-[500] text-gray-600 text-sm">Food Expenses</p>
        <p className="font-[500] text-gray-600 text-[13px]">22 Oct 2022</p>
      </div>
      <div className="text-center">
        <i className={`fa fa-info-circle text-green-600 text-[25px] }`}></i>
        <p className="text-gray-500 mt-2 font-bold">Rs. 350</p>
      </div>
    </div>
    <div className="flex mb-4">
      <div className="w-2/3">
        <img src="https://via.placeholder.com/150x150" alt="Receipt Image" className="w-full rounded-lg shadow-lg" />
      </div>
      <div className="w-1/3 ml-4 bg-gray-100 rounded-md p-4">
        <div className="text-gray-700 font-semibold mb-2">Remark</div>
        <div className="text-gray-600">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident, ea. Corrupti.</div>
      </div>
    </div>
    <div className="mt-4 flex justify-center">
      <button className="px-4 py-2 rounded-lg bg-royalBlue text-white font-semibold hover:bg-green-700 focus:outline-none focus:shadow-outline">
        Accept
      </button>
      <button className="px-4 py-2 rounded-lg bg-gray-800 text-white font-semibold hover:bg-red-700 focus:outline-none focus:shadow-outline ml-4">
        Decline
      </button>
    </div>
  </div>
  
  );
}

export default Receipt;
