import React, { useState,useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import ReimbursementCard from "../../Components/ReimbursementCard/ReimbursementCard";
import Table from "../../Components/Table/Table";
import TransactionLogCard from "../../Components/TransactionLogCard/TransactionLogCard";

function HomePage() {
  const navigate = useNavigate()
  const [tableHeader, setTableHeader] = useState([
    "Name",
    "Title",
    "Email",
    "Admin",
  ]);
  const [tableRows, setTableRows] = useState([
    ["Himalaya Gupta", "CEO", "guptahimalaya2@gmail.com", "True"],
    ["Himalaya Gupta 2", "CFO", "guptahimalaya2@gmail.com", "True"],
    ["Naman Agarwal", "App Developer", "namanagarwal@gmail.com", "False"],
  ]);
  useEffect(() => {
    if (localStorage.getItem('userData') === null){
        navigate('/login',{ replace: true })
    }
  }, [])
  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-4 md:space-x-4 md:space-y-0 md:flex-row">
        <div className="relative h-80 w-full bg-white rounded-md md:w-6/12 shadow-md">
          <div className="flex items-center justify-between pl-5 pr-4 py-4">
            <h1 className=" text-lg font-semibold text-left text-gray-900 bg-white rounded-md ">
              Organisation Employees
            </h1>
            <button
              onClick={() => ""}
              type="submit"
              className="py-2 px-4 text-center rounded-[5px] text-sm text-white font-[500] tracking-wider bg-royalBlue"
            >
              Add Employee
            </button>
          </div>
          <Table tableHeader={tableHeader} tableRows={tableRows} />
          <Link to="/employees" className="absolute text-sm text-blue-600 bottom-0 left-0 w-full h-[40px] border-t text-center p-2 bg-gray-100 shadow-md rounded-b-md cursor-pointer">
            View All Employees
          </Link>
        </div>
        <div className="relative bg-white w-full h-80 rounded-md md:w-3/12 shadow-md ">
          <h1 className=" text-lg font-semibold text-left text-gray-900 p-4 pb-0 bg-white rounded-md ">
            On Leave Today &nbsp;&nbsp;&nbsp;&nbsp;
            <span className="text-sm" >Thu, 22 Nov 2022</span>
          </h1>
          <div className="mt-2 space-y-2 overflow-y-auto h-[75%] p-4 pr-[2px] pt-0">     
            <div className="bg-gray-100 p-2 rounded-md flex space-x-2 items-center">
              <img src="userAvatar.svg" className="w-8 h-8 rounded-full border" alt="" />
              <div>
                <h3 className="font-semibold text-sm app-color-black">Himalaya Gupta</h3>
                <p className="font-semibold text-xs text-gray-600">Full stack Developer</p>
              </div>
            </div>
            <div className="bg-gray-100 p-2 rounded-md flex space-x-2 items-center">
              <img src="userAvatar.svg" className="w-8 h-8 rounded-full border" alt="" />
              <div>
                <h3 className="font-semibold text-sm app-color-black">Himalaya Gupta</h3>
                <p className="font-semibold text-xs text-gray-600">Full stack Developer</p>
              </div>
            </div>
            <div className="bg-gray-100 p-2 rounded-md flex space-x-2 items-center">
              <img src="userAvatar.svg" className="w-8 h-8 rounded-full border" alt="" />
              <div>
                <h3 className="font-semibold text-sm app-color-black">Himalaya Gupta</h3>
                <p className="font-semibold text-xs text-gray-600">Full stack Developer</p>
              </div>
            </div>
            <div className="bg-gray-100 p-2 rounded-md flex space-x-2 items-center">
              <img src="userAvatar.svg" className="w-8 h-8 rounded-full border" alt="" />
              <div>
                <h3 className="font-semibold text-sm app-color-black">Himalaya Gupta</h3>
                <p className="font-semibold text-xs text-gray-600">Full stack Developer</p>
              </div>
            </div>
            <div className="bg-gray-100 p-2 rounded-md flex space-x-2 items-center">
              <img src="userAvatar.svg" className="w-8 h-8 rounded-full border" alt="" />
              <div>
                <h3 className="font-semibold text-sm app-color-black">Himalaya Gupta</h3>
                <p className="font-semibold text-xs text-gray-600">Full stack Developer</p>
              </div>
            </div>
          </div>
          <Link to="/attendance" className="absolute text-sm text-blue-600 bottom-0 left-0 w-full h-[40px] border-t text-center p-2 bg-gray-100 shadow-md rounded-b-md cursor-pointer">
            View All Leaves
          </Link>
        </div>
        <div className=" w-full md:w-3/12 space-y-4 flex flex-col">
          <div className="w-full h-40 bg-white md:h-1/2 rounded-md shadow-md px-4 py-2">
            <h3 className="text-md font-[600] text-black tracking-wide">
              Create New Salary Flow
            </h3>
          </div>
          <div className="w-full h-40 bg-white md:h-1/2 rounded-md shadow-md px-4 py-2">
            <h3 className="text-md font-[600] text-black tracking-wide">
              Reimburse ammount
            </h3>
          </div>
          
        </div>
      </div>
      <div className="flex flex-col space-y-4 md:space-x-4 md:space-y-0 md:flex-row">
        <div className="h-80 w-full bg-white rounded-md md:w-4/12 shadow-md">
          <h1 className=" text-lg font-semibold text-left text-gray-900 px-4 py-4 bg-white rounded-md ">
              Reimbursements Requests
          </h1>
          <div className=" p-2 pt-0 space-y-2 overflow-y-auto h-[80%]">
            <ReimbursementCard type={"food"} />
            <ReimbursementCard type={"other"} />
            <ReimbursementCard type={"taxi"} />
          </div>
        </div>
        <div className="bg-white w-full h-80 rounded-md md:w-5/12 shadow-md ">
        <h1 className=" text-lg font-semibold text-left text-gray-900 px-4 py-4  bg-white rounded-md ">
              Transaction logs
        </h1>
        <div className="space-y-2 p-2 pt-0 overflow-y-auto h-[80%]">
          <TransactionLogCard />
          <TransactionLogCard />
          <TransactionLogCard />
          <TransactionLogCard />
          <TransactionLogCard />
        </div>
        </div>
        <div className="w-full md:w-3/12 space-y-4 flex flex-col">
          <div className="w-full h-40 bg-white md:h-1/2 rounded-md shadow-md px-4 py-2">
            <h3 className="text-md font-[600] text-black tracking-wide">
              No of Employees
            </h3>
          </div>
          <div className="w-full h-40 bg-white md:h-1/2 rounded-md shadow-md px-4 py-2">
            <h3 className="text-md font-[600] text-black tracking-wide">
              Bank Account
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
