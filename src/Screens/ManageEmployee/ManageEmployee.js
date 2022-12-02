import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import FileDrop from "../../Components/FileDrop/FileDrop";
import Modal from "../../Components/Modal/Modal";
import Table from "../../Components/Table/Table";
import SearchInTable from "../../Components/SearchInTable/SearchInTable";
import AddEmployeeForm from "../../Components/AddEmployeeForm/AddEmployeeForm";

function ManageEmployee() {
  const [showModal, setShowModal] = useState(false);
  const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);
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
  const [tableName, setTableName] = useState("All Employees");

  const [newEmployeesHeader, setNewEmployeesHeader] = useState([]);
  const [newEmployeesRows, setNewEmployeesRows] = useState([]);

  useEffect(() => {
    localStorage.setItem("searchData", JSON.stringify(tableRows));
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
      setNewEmployeesHeader(dataParse[0])
      setNewEmployeesRows(dataParse.slice(1))
      const newJSONData = [];
      for (let i = 1; i < dataParse.length; i++) {
        const newObject = {};
        for (let j = 0; j < dataParse[0].length; j++) {
          newObject[dataParse[0][j]] = dataParse[i][j];
        }
        newJSONData.push(newObject);
      }
      setShowModal(true)
    };
    reader.readAsBinaryString(f);
  };

  return (
    <React.Fragment>
      <div className="flex flex-col-reverse items-center md:flex-row space-x-0 md:space-x-4 ">
        <div className="w-full mt-4 md:mt-0 bg-white relative rounded-md  shadow-md md:w-7/12 h-auto md:h-[650px]">
          <div className="flex justify-between pl-5 pr-4 py-4 items-center">
            <h1 className=" text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
              {tableName}
            </h1>
            <div className="flex items-center space-x-2">
              <SearchInTable
                keyLocalStorage="searchData"
                setTableRows={setTableRows}
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
            editRow={true}
          />
        </div>
        <div className="w-full h-auto md:w-5/12 md:h-[650px] space-y-4 flex flex-col">
          <div className="bg-white h-1/4 rounded-md px-4 py-2 shadow-md">
            <FileDrop handleUploadFunction={handleUpload} />
          </div>
          <div className="hidden bg-white h-auto md:h-3/4 rounded-md px-4 py-2 shadow-md md:block"></div>
        </div>
      </div>
      {showModal && (
        <Modal title={`Confirm Employees List`} setShowModal={setShowModal} width = {'800px'} buttonText = 'Add Employees' buttonClickFn={() => setShowModal(false)}>
          <div className="overflow-x-auto max-h-[400px]">
            <Table tableHeader={newEmployeesHeader} tableRows = {newEmployeesRows} />
          </div>
        </Modal>
      )}
      {showAddEmployeeModal && (
        <Modal title={`Add Employee`} setShowModal={setShowAddEmployeeModal} width={'500px'} buttonText = 'Add Employee' buttonClickFn={() => setShowModal(false)}>
          <div className="overflow-x-auto max-h-[450px]">
            <AddEmployeeForm />
          </div>
        </Modal>
      )}
    </React.Fragment>
  );
}


export default ManageEmployee;
