import axios from 'axios';
import React from 'react'
import { BASE_URL } from '../Utility/Utility';

function PaySalarModal({selectedEmployees, closeModalFn}) {

    const paySalary = async () => {
        const id = JSON.parse(localStorage.getItem('orgId'));
        const salaryBody = {
            userIds : selectedEmployees.map(s => Number(s)),
            org_id : id, 
            remark:document.getElementById('remark').value
        }
        console.log(salaryBody)
        const response = await axios.post(BASE_URL + 'add-salaryTrans',salaryBody);
        closeModalFn();
        window.location.reload()
        }
  return (
    <div>
        <div className='p-4'>
        <label
          htmlFor="name"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Transaction name
        </label>
        <input
          type="text"
          name="name"
          id="remark"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          placeholder="Dec salary transfer..."
          required
        />
      </div>
      <div className='p-4'>
      <button
        type="button"
        onClick={paySalary}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      >
        Pay salary
      </button>
      </div>
    </div>
  )
}

export default PaySalarModal