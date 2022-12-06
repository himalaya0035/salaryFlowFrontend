import React, { useState } from "react";
import Modal from "../Modal/Modal";
import Receipt from "../Receipt/Receipt";

function TransactionLogCard() {
  const [showModal, setShowModal] = useState(false);
  const [icon, setIcon] = useState("fa-info-circle");
  const [color, setColor] = useState("text-green-700");
  return (
    <>
      <div
        onClick={() => setShowModal(true)}
        className="w-full flex items-center cursor-pointer rounded-md justify-between h-[60px] bg-gray-100 hover:bg-gray-200 transition p-4"
      >
        <div className="flex w-10 h-10 justify-center items-center border-2 rounded-md">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            ></path>
          </svg>
        </div>
        <div className="flex flex-col ml-3">
          <span className="font-semibold text-sm app-color-black">Himalaya Gupta</span>
          <span className="font-semibold text-xs app-color-blue">Salary</span>
        </div>
        <div className="flex flex-col ml-auto items-end">
          <span className="font-semibold text-sm app-color-black">Rs. 60000</span>
          <span className="font-semibold text-xs app-color-gray-2">
            31 Mar 2022
          </span>
        </div>
      </div>
      {showModal && (
        <Modal
          title="Reimbursement Receipt"
          setShowModal={setShowModal}
          width={"500px"}
        >
          <Receipt />
        </Modal>
      )}
    </>
  );
}

export default TransactionLogCard;
