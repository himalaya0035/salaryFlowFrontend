import React, { useState } from "react";
import Modal from "../Modal/Modal";
import SalaryTransactionModal from "../SalaryTransactionModal/SalaryTransactionModal";

function TransactionLogCard({title,date,type,employeesInTransaction,noOfEmployees}) {
  const [showModal, setShowModal] = useState(false);
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
          <span className="font-semibold text-sm app-color-black">{title}</span>
          <span className="font-semibold text-xs app-color-blue">{type}</span>
        </div>
        <div className="flex flex-col ml-auto items-end">
          <span className="font-semibold text-sm app-color-black">{noOfEmployees} Transactions</span>
          <span className="font-semibold text-xs app-color-gray-2">
            {date}
          </span>
        </div>
      </div>
      {showModal && (
        <Modal
          title="Salary Transaction"
          setShowModal={setShowModal}
          width={"500px"}
        > 
          <SalaryTransactionModal users = {employeesInTransaction} />
        </Modal>
      )}
    </>
  );
}

export default TransactionLogCard;
