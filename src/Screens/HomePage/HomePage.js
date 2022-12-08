import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AddRequestForm from "../../Components/AddRequestForm/AddRequestForm";
import Modal from "../../Components/Modal/Modal";
import ReimbursementCard from "../../Components/ReimbursementCard/ReimbursementCard";
import Table from "../../Components/Table/Table";
import TransactionLogCard from "../../Components/TransactionLogCard/TransactionLogCard";
import { BASE_URL } from "../../Components/Utility/Utility";

function HomePage() {
  const navigate = useNavigate();
  const [tableHeader, setTableHeader] = useState([
    "Name",
    "Title",
    "Email",
    "Admin",
  ]);
  const [tableRows, setTableRows] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [allSalaryTransaction, setAllSalaryTransaction] = useState([]);
  const [isAdmin, setIsAdmin] = useState(true);
  const [onLeave, setOnLeave] = useState([]);
  const [userSalaryLogs, setUserSalaryLogs] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [userAttendance, setUserAttendance] = useState([]);
  const [userReimbursements, setUserReimbursements] = useState([]);
  const [showAddRequestModal, setShowAddRequestModal] = useState(false);

  const takeLeave = async () => {
    const userId = JSON.parse(localStorage.getItem("userData")).id;
    const id = JSON.parse(localStorage.getItem("orgId"));
    const obj = {
      "user_id":userId,
      "org_id":id,
    }
    const response = await axios.post(BASE_URL + 'mark-attendance',obj)
    window.location.reload();
  }

  useEffect(() => {
    if (localStorage.getItem("userData") === null) {
      navigate("/login", { replace: true });
    } else {
      const id = JSON.parse(localStorage.getItem("orgId"));
      const isLocalAdmin =
        JSON.parse(localStorage.getItem("userData")).isAdmin === 0
          ? false
          : true;
      setIsAdmin(isLocalAdmin);
      if (isLocalAdmin) {
        const fetchEmployees = async () => {
          const { data } = await axios.get(BASE_URL + "get-orgEmps/" + id);
          const newData = [];
          data.map((d) => {
            const newArray = [];
            newArray.push(d.f_name + " " + d.l_name);
            newArray.push(d.position.pos_name);
            newArray.push(d.department.dept_name);
            newArray.push(d.email);
            newData.push(newArray);
          });
          localStorage.setItem("searchEmployeeData", JSON.stringify(newData));
          setTableRows(newData.slice(0, 3));
        };
        fetchEmployees();
        const getAllReimbursements = async () => {
          const { data } = await axios.get(BASE_URL + "get-reimbOrg/" + id);
          const reimbs = data.reimbs;
          const pendingArray = [];
          reimbs.forEach((r) => {
            if (r.isClaimed === 0) {
              pendingArray.push(r);
            }
          });
          setPendingRequests(pendingArray.reverse());
        };
        getAllReimbursements();
        const getAllTransactions = async () => {
          const { data } = await axios.get(BASE_URL + "get-salaryTrans/" + id);
          setAllSalaryTransaction(data);
        };
        getAllTransactions();
        const getAllOnLeave = async () => {
          const { data } = await axios.get(BASE_URL + "get-attendance/" + id);
          console.log(data);
          setOnLeave(data);
        };
        getAllOnLeave();
      } else {
        const userId = JSON.parse(localStorage.getItem("userData")).id;
        const getUserSalaryLogs = async () => {
          const { data } = await axios.get(
            BASE_URL + "get-salaryTransUser/" + userId
          );
          setUserSalaryLogs(data.trans);
          setUserDetails(data.userDetails);
        };
        getUserSalaryLogs();
        const getUserAttendances = async () => {
          const { data } = await axios.get(
            BASE_URL + "get-attendanceUser/" + userId
          );
          setUserAttendance(data);
        };
        getUserAttendances();
        const getUserReimbursement = async () => {
          const { data } = await axios.get(
            BASE_URL + "get-userReimb/" + userId
          );
          setUserReimbursements(data.reverse());
        };
        getUserReimbursement();
      }
    }
  }, []);
  return (
    <div className="space-y-4">
      {isAdmin ? (
        <>
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
              <Link
                to="/employees"
                className="absolute text-sm text-blue-600 bottom-0 left-0 w-full h-[40px] border-t text-center p-2 bg-gray-100 shadow-md rounded-b-md cursor-pointer"
              >
                View All Employees
              </Link>
            </div>
            <div className="relative bg-white w-full h-80 rounded-md md:w-3/12 shadow-md ">
              <h1 className=" text-lg font-semibold text-left text-gray-900 p-4 pb-0 bg-white rounded-md ">
                On Leave Today
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span className="text-sm">
                  {new Date().toLocaleDateString()}
                </span>
              </h1>
              <div className="mt-2 space-y-2 overflow-y-auto h-[75%] p-4 pr-[2px] pt-0">
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
              <Link
                to="/attendance"
                className="absolute text-sm text-blue-600 bottom-0 left-0 w-full h-[40px] border-t text-center p-2 bg-gray-100 shadow-md rounded-b-md cursor-pointer"
              >
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
                {pendingRequests.length !== 0 ? (
                  pendingRequests.map((s) => {
                    return (
                      <ReimbursementCard
                        key={s.id}
                        user={s.user.f_name + " " + s.user.l_name}
                        date={new Date(s.createdAt)
                          .toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })
                          .replace(/ /g, " ")}
                        type={"food"}
                        amount={s.rmb_amt}
                        data={s}
                      />
                    );
                  })
                ) : (
                  <h1 className="text-gray-500 text-md text-center mt-4">
                    No Requests Found
                  </h1>
                )}
              </div>
            </div>
            <div className="bg-white w-full h-80 rounded-md md:w-5/12 shadow-md ">
              <h1 className=" text-lg font-semibold text-left text-gray-900 px-4 py-4  bg-white rounded-md ">
                Transaction logs
              </h1>
              <div className="space-y-2 p-2 pt-0 overflow-y-auto h-[80%]">
                {allSalaryTransaction.map((transaction) => {
                  return (
                    <TransactionLogCard
                      key={transaction.transaction.id}
                      noOfEmployees={transaction.userData.length}
                      title={transaction.transaction.remark}
                      type={"Salary"}
                      date={new Date(transaction.transaction.createdAt)
                        .toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })
                        .replace(/ /g, " ")}
                      employeesInTransaction={transaction.userData}
                    />
                  );
                })}
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
        </>
      ) : (
        <>
          <div className="flex flex-col-reverse items-center md:flex-row space-x-0 md:space-x-4 ">
            <div className="w-full mt-4 md:mt-0 bg-white  rounded-md  shadow-md md:w-6/12 h-auto md:h-[650px] p-4">
              <div className="flex justify-between pl-2 pr-4 py-2 mb-2 items-center">
                <h1 className=" text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                  Your Salary logs
                </h1>
              </div>
              <div className="space-y-2">
                {userSalaryLogs.map((user) => {
                  return (
                    <TransactionLogCard
                      key={user.id}
                      title={user.remark}
                      type={"Salary"}
                      date={new Date(user.createdAt)
                        .toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })
                        .replace(/ /g, " ")}
                      employeeView={true}
                      noOfEmployees={
                        "Rs. " +
                        Math.round(userDetails.position.pos_base_pay / 12)
                      }
                    />
                  );
                })}
              </div>
            </div>
            <div className="w-full h-auto md:w-6/12 md:h-[650px] space-y-4 flex flex-col">
              <div className="flex items-center h-2/4 space-x-4 ">
                <div className="w-1/2 h-full bg-white rounded-md px-4 py-2 shadow-md">
                  <div className="flex justify-between items-center pb-4">
                    <h1 className=" text-lg py-2 font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                      Your Leaves
                    </h1>
                    <button onClick={takeLeave} className="py-2 px-4 text-center rounded-[5px] text-sm text-white font-[500] tracking-wider bg-royalBlue">
                      Take Leave
                    </button>
                  </div>

                  <div className="space-y-2">
                    {userAttendance.map((attendance) => {
                      return (
                        <div
                          key={attendance.id}
                          className="bg-gray-100 p-2 rounded-md flex space-x-2 items-center"
                        >
                          <img
                            src="calendar.svg"
                            className="w-8 h-8"
                            alt="User Leave"
                          />
                          <div>
                            <h3 className="font-semibold text-sm app-color-black">
                              {attendance.attendance_date}
                            </h3>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="w-1/2 h-full bg-white rounded-md px-4 py-2 shadow-md"></div>
              </div>
              <div className="bg-white h-2/4 rounded-md px-4 py-2 shadow-md">
                <div className="flex justify-between items-center pr-2 pb-4">
                  <h1 className=" text-lg py-2 font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                    Your Reimbursement Requests
                  </h1>
                  <button
                    onClick={() => setShowAddRequestModal(true)}
                    className="py-2 px-4 text-center rounded-[5px] text-sm text-white font-[500] tracking-wider bg-royalBlue"
                  >
                    Add Request
                  </button>
                </div>

                {showAddRequestModal && (
                  <Modal
                    title="Add Request"
                    setShowModal={setShowAddRequestModal}
                    width={"500px"}
                    buttonText="Add Request"
                    buttonClickFn={() => setShowAddRequestModal(false)}
                  >
                    <AddRequestForm
                      closeModalFn={() => setShowAddRequestModal(false)}
                    />
                  </Modal>
                )}
                <div className="space-y-2 h-[80%] overflow-y-auto">
                  {userReimbursements.length !== 0 ? (
                    userReimbursements.map((s) => {
                      return (
                        <ReimbursementCard
                          key={s.id}
                          user={userDetails.f_name + " " + userDetails.l_name}
                          date={new Date(s.createdAt)
                            .toLocaleDateString("en-GB", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })
                            .replace(/ /g, " ")}
                          type={s.rmb_reason}
                          amount={s.rmb_amt}
                          employeeView={true}
                        />
                      );
                    })
                  ) : (
                    <h1 className="text-gray-500 text-md text-center mt-4">
                      No Requests Found
                    </h1>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default HomePage;
