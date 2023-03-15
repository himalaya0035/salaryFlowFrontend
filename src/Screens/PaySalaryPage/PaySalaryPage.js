import axios from "axios";
import React from "react";
import { useEffect,useState } from "react";
import Modal from "../../Components/Modal/Modal";
import { BASE_URL } from "../../Components/Utility/Utility";
import TransactionLogCard from '../../Components/TransactionLogCard/TransactionLogCard'
import Table from "../../Components/Table/Table";
import SearchInTable from "../../Components/SearchInTable/SearchInTable";
import EditBankAccount from "../../Components/EditBankAccount/EditBankAccount";
import PaySalarModal from "../../Components/PaySalaryModal/PaySalarModal";

function PaySalaryPage() {
  const [bankDetails, setBankDetails] = useState({bank:{

  }})
  const [tableHeader, setTableHeader] = useState([
    "Name",
    "Position",
    "Department",
    "Email",
  ]);
  const [tableRows, setTableRows] = useState([
  ]);
  const [editBankModal, setEditBankModal] = useState(false)
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [idArray, setIdArray] = useState([])
  const [allSalaryTransaction, setAllSalaryTransaction] = useState([]);
  const [showPaySalaryModal, setShowPaySalaryModal] = useState(false);
  const [showBankDetailsModal, setShowBankDetailsModal] = useState(false)
  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem('userData')).id;
    const id = JSON.parse(localStorage.getItem("orgId"));
    const getUserBankAccount = async () => {
      const {data} = await axios.get(BASE_URL + 'get-userBank/' + userId);
      setBankDetails(data)
    }
    getUserBankAccount();
    const fetchEmployees = async () => {
      const { data } = await axios.get(BASE_URL + "get-orgEmps/" + id);
      const newData = [];
      const ids = [];
      data.map((d) => {
        const newArray = [];
        ids.push(d.id);
        newArray.push(d.f_name + " " + d.l_name);
        newArray.push(d.position ? d.position?.pos_name : 'Admin');
        newArray.push(d.department ? d.department?.dept_name : 'Management');
        newArray.push(d.email);
        newData.push(newArray);
      });
      setIdArray(ids)
      localStorage.setItem("searchEmployeeData", JSON.stringify(newData));
      setTableRows(newData);
    };
    fetchEmployees();

    const getAllTransactions = async () => {
      const {data} = await axios.get(BASE_URL + 'get-salaryTrans/' + id)
      setAllSalaryTransaction(data);
    } 
    getAllTransactions();
    return () => {

    }
  }, [])
  
  return (
    <React.Fragment>
    <div className="flex flex-col-reverse items-center md:flex-row space-x-0 md:space-x-4 ">
      <div className="w-full mt-4 md:mt-0 bg-white  rounded-md  shadow-md md:w-7/12 h-auto md:h-[650px]">
      <div className="flex justify-between pl-5 pr-4 py-4 items-center">
            <h1 className=" text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
              Select Employees
            </h1>
            <div className="flex items-center space-x-2">
              <SearchInTable
                keyLocalStorage="searchEmployeeData"
                setTableRows={setTableRows}
                filterFromIndexes={[0, 1, 2, 3]}
                placeholder="Search Employees..."
              />
              <button
                onClick={() => setShowPaySalaryModal(true)}
                type="submit"
                className="w-full py-2 px-4 text-center rounded-[5px] text-sm text-white font-[500] tracking-wider bg-royalBlue"
              >
               Pay Salary
              </button>
            </div>
          </div>
          <Table
            tableHeader={tableHeader}
            tableRows={tableRows}
            selectRow={true}
            idArray = {idArray}
            setSelectedIds = {setSelectedEmployees}
          />
      </div>
      <div className="w-full h-auto md:w-5/12 md:h-[650px] space-y-4 flex flex-col">
        <div className="bg-white rounded-md shadow-md p-4 flex flex-col">
        <h1 className=" text-lg font-semibold text-left mb-2 pr-4 py-0 rounded-md text-gray-900 bg-white dark:text-white dark:bg-gray-800">
              Bank Account
          </h1>
          {bankDetails ? (<div className="flex items-center justify-between">
            <div className="flex items-center ">
              <img
                className="w-8 h-8 rounded-full mr-4"
                src={bankDetails?.bank.bank_logo}
                alt="Bank Logo"
              />
              <div>
                <p className="font-bold">{bankDetails?.bank.bank_name}</p>
                <p className="text-sm text-gray-600">{bankDetails?.acc_no}</p>
              </div>
            </div>
            <button onClick={() => setEditBankModal(true)} className=" bg-royalBlue hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline">
              Edit Account
            </button>
          </div>) : <button onClick={() => setShowBankDetailsModal(true)} style={{
                        marginTop:'20px'
                      }} className="w-full  p-2 bg-royalBlue px-4 py-2 rounded-md text-white">Add Bank Details</button>}
        </div>
        {
            showBankDetailsModal && (
              <Modal title={"Add Bank Account"} width={"500px"} setShowModal={() => {setShowBankDetailsModal(false)}}>
                <EditBankAccount type={"add"} closeModalFn={() => {setShowBankDetailsModal(false)}}/>
              </Modal>
            )
          }
        <div className="bg-white h-3/4 shadow-md rounded-md">
        <h1 className=" text-lg font-semibold text-left text-gray-900 px-4 py-4  bg-white rounded-md ">
              Transaction logs
        </h1>
        <div className="space-y-2 p-4 pt-0 overflow-y-auto h-[80%]">
          {allSalaryTransaction.map(transaction => {
            return <TransactionLogCard key={transaction.transaction.id} noOfEmployees={transaction.userData.length + ' Transactions'} title={transaction.transaction.remark} type={'Salary'} date={new Date(transaction.transaction.createdAt).toLocaleDateString('en-GB', {
              day: 'numeric', month: 'short', year: 'numeric'
            }).replace(/ /g, ' ')} employeesInTransaction = {transaction.userData} employeeView = {false}/>
          })}   
        </div>
          
        </div>
      </div>
    </div>
    {editBankModal && <Modal width={'500px'} setShowModal={setEditBankModal} title="Edit Bank Account" ><EditBankAccount closeModalFn={() => setEditBankModal(false)} /></Modal>}
    {showPaySalaryModal && <Modal width={'500px'} setShowModal={setShowPaySalaryModal} title="Name This Transaction" ><PaySalarModal selectedEmployees={selectedEmployees} closeModalFn={() => setShowPaySalaryModal(false)}/></Modal>}
    </React.Fragment>
  );
}

export default PaySalaryPage;
