import axios from "axios";
import React, { useEffect, useState } from "react";
import AddRequestForm from "../../Components/AddRequestForm/AddRequestForm";
import Modal from "../../Components/Modal/Modal";
import ReimbursementCard from "../../Components/ReimbursementCard/ReimbursementCard";
import SearchInTable from "../../Components/SearchInTable/SearchInTable";
import Table from "../../Components/Table/Table";
import { BASE_URL } from "../../Components/Utility/Utility";

function ReimbursementsPage() {
  const [tableHeader, setTableHeader] = useState([
    "Employee",
    "Reason",
    "Date",
    "Amount",
    "Status",
  ]);
  const [tableRows, setTableRows] = useState([]);
  const [showAddRequestModal, setShowAddRequestModal] = useState(false);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [countPending, setCountPending] = useState(0)
  const [accepted, setAccepted] = useState(0);
  const [declined, setDeclined] = useState(0)
  useEffect(() => {
    const id = JSON.parse(localStorage.getItem('orgId'));
    
    const getAllReimbursements = async () => {
      const {data} = await axios.get(BASE_URL + 'get-reimbOrg/' + id);
      const reimbs = data.reimbs;
      const pendingArray = [];
      const completedArray = [];
      let declineCount = 0;
      reimbs.forEach(r => {
        if (r.isClaimed === 0){
          pendingArray.push(r);
        }else if(r.isClaimed === 2){
          declineCount++;
          completedArray.push(r);
        }else{
          completedArray.push(r);
        }
      })
      setDeclined(declineCount);
      setCountPending(data.count_pending);
      setAccepted(data.count_accepted)
      setPendingRequests(pendingArray.reverse());
      const newArray = [];
      completedArray.reverse()
      completedArray.map(c => {
        const newA = [];
        newA.push(c.user.f_name + ' ' + c.user.l_name);
        newA.push(c.rmb_reason);
        newA.push(new Date(c.createdAt).toLocaleDateString('en-GB', {
          day: 'numeric', month: 'short', year: 'numeric'
        }).replace(/ /g, ' '))
        newA.push('Rs. ' + c.rmb_amt);
        newA.push(c.isClaimed === 1 ? 'Accepted' : 'Declined')
        newArray.push(newA)
      })
      setTableRows(newArray)
      localStorage.setItem("searchReimbursementData", JSON.stringify(newArray));
    }
    getAllReimbursements();
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
              <h3 className="text-blue-600 text-4xl mb-[4px]">{countPending}</h3>
              <p className="font-[500] tracking-wide text-md text-gray-500">
                Requests
              </p>
            </div>
            <div className="w-1/3 text-center">
              <h3 className="text-green-600 text-4xl mb-[4px]">{accepted}</h3>
              <p className="font-[500] tracking-wide text-md text-gray-500">
                Accepted
              </p>
            </div>
            <div className="w-1/3 text-center">
              <h3 className="text-red-600 text-4xl mb-[4px]">{declined}</h3>
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
                <AddRequestForm closeModalFn={() => setShowAddRequestModal(false)} />
              </Modal>
            )}
          </div>
          <div className="mt-4 space-y-4 h-[90%] overflow-y-auto">
            {pendingRequests.length !== 0 ? pendingRequests.map(s => {
              return (
                <ReimbursementCard key={s.id} user={s.user.f_name + ' ' + s.user.l_name} date={new Date(s.createdAt).toLocaleDateString('en-GB', {
                  day: 'numeric', month: 'short', year: 'numeric'
                }).replace(/ /g, ' ')} type={"food"} amount={s.rmb_amt} data={s} status={0}/>
              )
            }) : <h1 className="text-gray-500 text-md text-center mt-4">No Requests Found</h1>}  
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReimbursementsPage;
