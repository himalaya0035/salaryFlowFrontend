import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { BASE_URL } from '../Utility/Utility'

function EditBankAccount({closeModalFn, type="update"}) {
  const [allBankAccounts, setAllBankAccounts] = useState([])
  useEffect(() => {
    const getAllBankAccounts = async () => {
        const {data} = await axios.get(BASE_URL + 'get-banks');
        setAllBankAccounts(data)
    }
    getAllBankAccounts();
    return () => {
      
    }
  }, [])
  
  const editBankAcc = async () => {
    const bankSelect = document.getElementById("chooseBank");
    const userId = JSON.parse(localStorage.getItem('userData')).id;
    const newBankDetails = {
      "user_id": userId,
      "bank_id":Number(bankSelect.options[bankSelect.selectedIndex].id),
      "acc_no":document.getElementById('accno').value,
      "ifsc_code":document.getElementById('ifsc').value
    }
    let response;
    if(type === "add") {
      response = await axios.post(BASE_URL + `${type === "add" ? "add-userBank" : "update-userBank"}`,newBankDetails);
    } else if(type === "update") {
      response = await axios.put(BASE_URL + `${type === "add" ? "add-userBank" : "update-userBank"}`,newBankDetails);
    }
    closeModalFn();
    window.location.reload();
  }

  return (
    <div className="px-4 py-4 ">
    <form className="space-y-4" action="#">
      <div>
        <label
          htmlFor="name"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Account No.
        </label>
        <input
          type="text"
          name="name"
          id="accno"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          placeholder="Account No."
          required
        />
      </div>
      <div>
        <label
          htmlFor="caccno"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Confirm Account No.
        </label>
        <input
          type="text"
          name="name"
          id="caccno"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          placeholder="Account No."
          required
        />
      </div>
      <div>
        <label
          htmlFor="chooseBank"
          className="block mb-2 text-sm font-medium text-gray-900 "
        >
          Select Bank
        </label>
        <select
          id="chooseBank"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        >
          <option selected value="" disabled="disabled">
            Select Bank
          </option>
          {allBankAccounts.map(b => {
            return (
                <option key={b.id} id={b.id} value={b.bank_name}>{b.bank_name}</option>
            )
          })}
        </select>
      </div>
      <div>
        <label
          htmlFor="ifsc"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          IFSC Code
        </label>
        <input
          type="text"
          name="name"
          id="ifsc"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          placeholder="Account No."
          required
        />
      </div>
      <button
        type="button"
        onClick={editBankAcc}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      >
        {type === 'update' ? 'Edit Bank Account' : 'Add Bank Account' } 
      </button>
    </form>
  </div>
  )
}

export default EditBankAccount