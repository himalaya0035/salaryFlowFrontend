import React, { useEffect, useState } from "react";
import AddRequestForm from "../../Components/AddRequestForm/AddRequestForm";
import Modal from "../../Components/Modal/Modal";
import ReimbursementCard from "../../Components/ReimbursementCard/ReimbursementCard";
import SearchInTable from "../../Components/SearchInTable/SearchInTable";
import Table from "../../Components/Table/Table";

function ReimbursementsPage() {
  const [tableHeader, setTableHeader] = useState([
    "Employee",
    "Reason",
    "Date",
    "Amount",
    "Status",
  ]);
  const [tableRows, setTableRows] = useState([
    ["Himalaya Gupta", "Cab", "22/10/2012", "Rs. 345", "Accepted"],
  ]);
  const [showAddRequestModal, setShowAddRequestModal] = useState(false);
  useEffect(() => {
    localStorage.setItem("searchReimbursementData", JSON.stringify(tableRows));
    return () => {};
  }, []);
  return (
    <div className="flex flex-col-reverse items-center md:flex-row space-x-0 md:space-x-4 ">
      <div className="w-full mt-4 md:mt-0 bg-white relative rounded-md shadow-md md:w-7/12 h-auto md:h-[650px]">
        <div className="flex items-center justify-between pl-5 pr-4 py-4">
          <h1 className="text-lg rounded-md font-semibold text-left text-gray-900 bg-whit">
            All Reimbursements
          </h1>
          <SearchInTable
            keyLocalStorage="searchReimbursementData"
            setTableRows={setTableRows}
            filterFromIndexes={[0, 1, 2, 4]}
            placeholder="Search Reimbursements..."
          />
        </div>
        <Table tableHeader={tableHeader} tableRows={tableRows} />
      </div>
      <div className="w-full h-auto md:w-5/12 md:h-[650px] space-y-4 flex flex-col">
        <div className="bg-white h-1/4 rounded-md px-4 py-4 shadow-md">
          <div className="w-full flex justify-content-around items-center h-full">
            <div className="w-1/3 text-center">
              <h3 className="text-blue-600 text-4xl mb-[4px]">32</h3>
              <p className="font-[500] tracking-wide text-md text-gray-500">
                Requests
              </p>
            </div>
            <div className="w-1/3 text-center">
              <h3 className="text-green-600 text-4xl mb-[4px]">60</h3>
              <p className="font-[500] tracking-wide text-md text-gray-500">
                Accepted
              </p>
            </div>
            <div className="w-1/3 text-center">
              <h3 className="text-red-600 text-4xl mb-[4px]">12</h3>
              <p className="font-[500] tracking-wide text-md text-gray-500">
                Declined
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white h-3/4 rounded-md shadow-md pl-5 pr-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-lg rounded-md font-semibold text-left text-gray-900 bg-white">
              Pending Requests
            </h1>
            <button
              onClick={() => setShowAddRequestModal(true)}
              className="py-2 px-4 text-center rounded-[5px] text-sm text-white font-[500] tracking-wider bg-royalBlue"
            >
              Add Request
            </button>
            {showAddRequestModal && (
              <Modal
                title="Add Request"
                setShowModal={setShowAddRequestModal}
                width={"500px"}
                buttonText = 'Add Request'
                buttonClickFn={() => setShowAddRequestModal(false)}
              >
                <AddRequestForm />
              </Modal>
            )}
          </div>
          <div className="mt-4 space-y-4">
            <ReimbursementCard type={"food"} />
            <ReimbursementCard type={"other"} />
            <ReimbursementCard type={"taxi"} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReimbursementsPage;
