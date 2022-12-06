import axios from 'axios'
import React from 'react'
import { BASE_URL } from '../Utility/Utility'

function AddPositionForm({closeModalFn}) {
  const addPosition = async (e) => {
    e.preventDefault();
    const id = JSON.parse(localStorage.getItem('orgId')); 
    const positionBody = {
        "pos_base_pay":document.getElementById('base').value,
        "pos_ctc": document.getElementById('ctc').value,
        "pos_name":document.getElementById('pname').value,
        "org_id":id
    }
    const response = await axios.post(BASE_URL + 'add-position',positionBody);
    closeModalFn();
    window.location.reload();
  }
  return (
    <div className="px-4 py-4 ">
      <form className="space-y-4" action="#" id="addPositionForm">
        <div>
          <label
            htmlFor="pname"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Position Name
          </label>
          <input
            type="text"
            name="pname"
            id="pname"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="Full Stack Developer"
            required
          />
        </div>
   
        <div>
          <label
            htmlFor="ctc"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            CTC
          </label>
          <input
            type="number"
            name="ctc"
            id="ctc"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="800000"
            required
          />
        </div>
        <div>
          <label
            htmlFor="base"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Base Pay 
          </label>
          <input
            type="number"
            name="base"
            id="base"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="750000"
            required
          />
        </div>
        <button
              type="button"
              onClick={addPosition}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Add Position
            </button>
      </form>
    </div>
  )
}

export default AddPositionForm