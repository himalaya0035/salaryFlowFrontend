import axios from 'axios';
import React from 'react'
import { BASE_URL } from '../Utility/Utility';

function AddDepartmentForm({closeModalFn}) {
  const addDepartment = async (e) => {
    e.preventDefault();
    const id = JSON.parse(localStorage.getItem('orgId'));
    const deptBody = {
        "dept_name":document.getElementById('dname').value,
        "org_id":id
    }
    const response = await axios.post(BASE_URL + 'add-dept',deptBody);
    closeModalFn();
    window.location.reload();
  }
  return (
    <div className="px-4 py-4 ">
      <form className="space-y-4" action="#" id="addDeptForm">
        <div>
          <label
            htmlFor="dname"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Department Name
          </label>
          <input
            type="text"
            name="dname"
            id="dname"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="Sales"
            required
          />
        </div>
        <button
              type="button"
              onClick={addDepartment}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Add Department
            </button>
      </form>
    </div>
  )
}

export default AddDepartmentForm