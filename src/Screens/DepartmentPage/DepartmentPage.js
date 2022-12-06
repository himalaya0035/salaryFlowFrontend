import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import AddDepartmentForm from "../../Components/AddDepartmentForm/AddDepartmentForm";
import AddPositionForm from "../../Components/AddPositionForm/AddPositionForm";
import Modal from "../../Components/Modal/Modal";
import Table from "../../Components/Table/Table";
import { BASE_URL } from '../../Components/Utility/Utility'

function DepartmentPage() {
  const [deptTableHeader, setdeptTableHeader] = useState([
    "Id",
    "Department Name",
    "Created at",
    "Updated at",
  ]);
  const [deptTableRows, setdeptTableRows] = useState([]);
  const [positionTableHeader, setpositionTableHeader] = useState([
    "Id",
    "Position Name",
    "CTC",
    "Base Pay",
  ]);
  const [positionTableRows, setpositionTableRows] = useState([]);
  const [showDeptModal, setshowDeptModal] = useState(false)
  const [showPositionModal, setshowPositionModal] = useState(false)


  useEffect(() => {   
    const id = JSON.parse(localStorage.getItem('orgId')); 
    const fetchDepartment = async () => {
      const {data} = await axios.get(BASE_URL + 'get-depts/' + id)
      const newData = [];
      data.map(d => {
        const array = Object.values(d);
        array.splice(1,1);
        array[2] = new Date(array[2]).toLocaleDateString();
        array[3] = new Date(array[3]).toLocaleDateString();
        newData.push(array)
      })
      setdeptTableRows(newData);
    }
    const fetchPositions = async () => {
      const {data} = await axios.get(BASE_URL + 'get-positions/' + id)
      const newData = [];
      data.map(d => {
        const array = Object.values(d);
        array.splice(2,1);
        array.splice(4,2);
        let temp = 'Rs. ' + array[2];
        array[2] = 'Rs. ' + array[3];
        array[3] = temp;
        newData.push(array)
      })
      setpositionTableRows(newData);
    }
    fetchDepartment();
    fetchPositions();
    return () => {
      
    }
  }, [])
  
  return (
    <React.Fragment>
    <div className="flex flex-col-reverse items-center md:flex-row space-x-0 md:space-x-4 ">
      <div className="w-full mt-4 md:mt-0 bg-white  rounded-md  shadow-md md:w-6/12 h-auto md:h-[650px]">
        <div className="flex justify-between pl-5 pr-4 py-4 items-center">
          <h1 className=" text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
            All Departments
          </h1>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setshowDeptModal(true)}
              type="submit"
              className="w-full py-2 px-4 text-center rounded-[5px] text-sm text-white font-[500] tracking-wider bg-royalBlue"
            >
              Add Department
            </button>
          </div>
        </div>
        <Table tableHeader={deptTableHeader} tableRows={deptTableRows} />
      </div>
      <div className="w-full mt-4 md:mt-0 bg-white  rounded-md  shadow-md md:w-6/12 h-auto md:h-[650px]">
        <div className="flex justify-between pl-5 pr-4 py-4 items-center">
          <h1 className=" text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
            All Positions
          </h1>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setshowPositionModal(true)}
              type="submit"
              className="w-full py-2 px-4 text-center rounded-[5px] text-sm text-white font-[500] tracking-wider bg-royalBlue"
            >
              Add Position
            </button>
          </div>
        </div>
        <Table tableHeader={positionTableHeader} tableRows={positionTableRows} />
      </div>
    </div>
    {showDeptModal && (
        <Modal title={`Add Department`} setShowModal={setshowDeptModal} width = {'500px'} >
          <AddDepartmentForm closeModalFn = {() => setshowDeptModal(false)} />
        </Modal>
      )}
      {showPositionModal && (
        <Modal title={`Add Position`} setShowModal={setshowPositionModal} width={'500px'} >
          <AddPositionForm closeModalFn = {() => setshowPositionModal(false)} />
        </Modal>
      )}
    </React.Fragment>
  );
}

export default DepartmentPage;
