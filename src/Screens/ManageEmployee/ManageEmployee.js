import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import FileDrop from "../../Components/FileDrop/FileDrop";
import Modal from "../../Components/Modal/Modal";
import Table from "../../Components/Table/Table";
import SearchInTable from "../../Components/SearchInTable/SearchInTable";
import AddEmployeeForm from "../../Components/AddEmployeeForm/AddEmployeeForm";
import axios from "axios";
import {
  BASE_URL,
  ExcelDateToJSDate,
  mailEmailsList,
  postData,
} from "../../Components/Utility/Utility";
import emailjs from "emailjs-com";

function ManageEmployee() {
  const [showModal, setShowModal] = useState(false);
  const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);
  const [tableHeader, setTableHeader] = useState([
    "Name",
    "Position",
    "Department",
    "Email",
  ]);
  const [tableRows, setTableRows] = useState([]);
  const [tableName, setTableName] = useState("All Employees");

  const [newEmployeesHeader, setNewEmployeesHeader] = useState([]);
  const [newEmployeesRows, setNewEmployeesRows] = useState([]);
  const [allDepts, setAllDepts] = useState({});
  const [allPositions, setAllPositions] = useState({});
  const [sendEmployeesData, setSendEmployeesData] = useState([]);
  const [spinner, setSpinner] = useState(false);
  useEffect(() => {
    const id = JSON.parse(localStorage.getItem("orgId"));

    const fetchEmployees = async () => {
      const { data } = await axios.get(BASE_URL + "get-orgEmps/" + id);
      const newData = [];
      data.map((d) => {
        const newArray = [];
        newArray.push(d.f_name + " " + d.l_name);
        newArray.push(d.position ? d.position?.pos_name : 'Admin');
        newArray.push(d.department ? d.department?.dept_name : 'Management');
        newArray.push(d.email);
        newData.push(newArray);
      });
      localStorage.setItem("searchEmployeeData", JSON.stringify(newData));
      setTableRows(newData);
    };
    fetchEmployees();
    const fetchDepartments = async () => {
      const { data } = await axios.get(BASE_URL + "get-depts/" + id);
      const newDeptObject = {};
      data.map((d) => {
        newDeptObject[d.dept_name] = d.id;
      });
      setAllDepts(newDeptObject);
    };
    fetchDepartments();
    const fetchPositions = async () => {
      const { data } = await axios.get(BASE_URL + "get-positions/" + id);
      const newPositionsObject = {};
      data.map((p) => {
        newPositionsObject[p.pos_name] = p.id;
      });
      setAllPositions(newPositionsObject);
    };
    fetchPositions();
    return () => {};
  }, []);

  const handleUpload = (e) => {
    e.preventDefault();
    let files = e.target.files,
      f = files[0];
    let reader = new FileReader();
    reader.onload = function (e) {
      let data = e.target.result;
      let readedData = XLSX.read(data, { type: "binary" });
      const wsname = readedData.SheetNames[0];
      const ws = readedData.Sheets[wsname];
      const dataParse = XLSX.utils.sheet_to_json(ws, { header: 1 });
      dataParse.map((d, index) => {
        if (index != 0) {
          d[5] = ExcelDateToJSDate(d[5]).toISOString().slice(0, 10);
        }
      });
      setNewEmployeesHeader(dataParse[0]);
      setNewEmployeesRows(dataParse.slice(1));
      const newJSONData = [];
      for (let i = 1; i < dataParse.length; i++) {
        const newObject = {};
        for (let j = 0; j < dataParse[0].length; j++) {
          newObject[dataParse[0][j]] = dataParse[i][j];
        }
        const newObject2 = {};
        const id = JSON.parse(localStorage.getItem("orgId"));
        newObject2["f_name"] = newObject["First Name"];
        newObject2["l_name"] = newObject["Last Name"];
        newObject2["email"] = newObject["Email"];
        newObject2["doj"] = newObject["Date of Joining"];
        newObject2["pos_id"] = allPositions[newObject["Position"]];
        newObject2["dept_id"] = allDepts[newObject["Department"]];
        newObject2["org_id"] = id;
        newJSONData.push(newObject2);
      }
      setSendEmployeesData(newJSONData);
      setShowModal(true);
    };
    reader.readAsBinaryString(f);
  };

  const addEmployees = async () => {
    const response = await axios.post(BASE_URL + "add-orgEmps", {
      emps_data: sendEmployeesData,
    });
    const m = response.data;
    setSpinner(true);
    for (let i = 0; i < m.length; i++) {
      let templateParams = {
        to_name: m[i].f_name + " " + m[i].l_name,
        from_name: "SalaryFlow",
        email_id: m[i].email,
        password: m[i].password,
      };
      await emailjs.send(
        "service_8bnq1as",
        "template_ua5boue",
        templateParams,
        "1vpxuEBh1k-XNwY93"
      );
    }
    setSpinner(false);
    setShowModal(false);
    window.location.reload();
  };

  return (
    <React.Fragment>
      <div className="flex flex-col-reverse items-center md:flex-row space-x-0 md:space-x-4 ">
        <div className="w-full mt-4 md:mt-0 bg-white  rounded-md  shadow-md md:w-7/12 h-auto md:h-[650px]">
          <div className="flex justify-between pl-5 pr-4 py-4 items-center">
            <h1 className=" text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
              {tableName}
            </h1>
            <div className="flex items-center space-x-2">
              <SearchInTable
                keyLocalStorage="searchEmployeeData"
                setTableRows={setTableRows}
                filterFromIndexes={[0, 1, 2, 3]}
                placeholder="Search Employees..."
              />
              <button
                onClick={() => setShowAddEmployeeModal(true)}
                type="submit"
                className="w-full py-2 px-4 text-center rounded-[5px] text-sm text-white font-[500] tracking-wider bg-royalBlue"
              >
                Add Employee
              </button>
            </div>
          </div>
          <Table
            tableHeader={tableHeader}
            tableRows={tableRows}
            // editRow={true}
          />
        </div>
        <div className="w-full h-auto md:w-5/12 md:h-[650px] space-y-4 flex flex-col">
          <div className="bg-white h-1/4 rounded-md px-4 py-2 shadow-md">
            <FileDrop handleUploadFunction={handleUpload} />
          </div>

         
        </div>
      </div>
      {showModal && (
        <Modal
          title={`Confirm Employees List`}
          setShowModal={setShowModal}
          width={"800px"}
          buttonText="Add Employees"
          buttonClickFn={() => setShowModal(false)}
        >
          <div className="overflow-x-auto max-h-[400px]">
            <Table
              tableHeader={newEmployeesHeader}
              tableRows={newEmployeesRows}
            />
          </div>
          <button
            type="button"
            onClick={addEmployees}
            className="m-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            {spinner && <i className="fa fa-spinner fa-spin mr-2"></i>}
            Add Employees
          </button>
        </Modal>
      )}
      {showAddEmployeeModal && (
        <Modal
          title={`Add Employee`}
          setShowModal={setShowAddEmployeeModal}
          width={"500px"}
        >
          <AddEmployeeForm
            closeModalFn={() => setShowAddEmployeeModal(false)}
          />
        </Modal>
      )}
    </React.Fragment>
  );
}

export default ManageEmployee;
