import React from "react";

function SalaryTransactionModal({ users }) {
  return (
    <div className="mt-2 space-y-2 overflow-y-auto h-[75%] p-2 pt-0">
      {users.map((user) => {
        return (
          <div
            key={user.f_name + user.l_name + user.userBank}
            className="bg-gray-100 p-2 rounded-md flex space-x-2 items-center"
          >
            <img
              src="userAvatar.svg"
              className="w-8 h-8 rounded-full border"
              alt=""
            />
            <div className="flex justify-between items-center w-[90%]">
              <div>
                <h3 className="font-semibold text-sm app-color-black">
                  {user.f_name + " " + user.l_name}
                </h3>
                <p className="font-semibold text-xs text-gray-600">
                  {user.position.pos_name}
                </p>
              </div>
              <div>
              <h3 className="font-semibold text-sm app-color-black text-right">
              {"Rs." + Math.round(user.position.pos_base_pay / 12)}
              </h3>
              <p className="font-semibold text-xs text-gray-600">
                  Acc No. {user.userBank === null ? '' : user.userBank.acc_no}
                </p>
                </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default SalaryTransactionModal;
