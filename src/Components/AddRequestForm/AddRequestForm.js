import axios from "axios";
import React, { useRef, useState } from "react";
import { BASE_URL } from "../Utility/Utility";

function AddRequestForm({closeModalFn}) {
  const imgRef = useRef();
  const [img, setImg] = useState();

  const checkFileSize = (event) => {
    let files = event.target.files;
    let size = 5242880;
    let err = [];
    let status = true;
    for (let x = 0; x < files.length; x++) {
      if (files[x].size > size) {
        err[x] = "Plaese upload file of size less than 5MB\n";
        status = false;
      }
    }
    for (let z = 0; z < err.length; z++) {
      event.target.value = null;
      status = false;
    }
    return status;
  };

  const checkMimeType = (event) => {
    let files = event.target.files;
    let err = [];

    const types = ["image/png", "image/jpeg"];

    let status = true;
    for (let x = 0; x < files.length; x++) {
      if (types.every((type) => files[x].type !== type)) {
        err[x] = "Please upload image as JPG, JPEG or PNG\n";
        status = false;
      }
    }

    for (let z = 0; z < err.length; z++) {
      // s
      event.target.value = null;
      status = false;
    }
    return status;
  };

  const fileChange = (e) => {
    if (e.target.files.length > 0 && checkMimeType(e) && checkFileSize(e)) {
      handleFileChange(e.target.files[0]);
    }
  };

  const handleFileChange = async (file) => {
    try {
      const response = await axios.get(BASE_URL +  "photo-upload");
      const uploadUrl = response.data.uploadUrl;
      await fetch(uploadUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: file,
      })
        .then((response) => {
          const imgLink = uploadUrl.split("?")[0];
          setImg(imgLink);
          
        })
        .catch((err) => {
  
        });
    } catch (error) {
    }
  }

  const addRequest = async () => {
    const id = JSON.parse(localStorage.getItem('orgId'));
    const userId = JSON.parse(localStorage.getItem('userData')).id;
    const requestObj = {
      "user_id":userId,
      "rmb_receipt":img,
      "rmb_reason":"Food",
      "isClaimed":0,
      "rmb_amt":document.getElementById('amount').value,
      "org_id":id,
      "remark":document.getElementById('message').value
    }
    const response = await axios.post(BASE_URL + 'add-reimb',requestObj);
    closeModalFn();
    window.location.reload();
  }
  return (
    <div className="px-4 py-4 ">
      <form className="space-y-4" action="#">
        <div>
          <label
            htmlFor="amount"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Amount (in Rs.)
          </label>
          <input
            type="number"
            name="amount"
            id="amount"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="Rs. 350"
            required
          />
        </div>
      <div>
        <label
          for="reason"
          className="block mb-2 text-sm font-medium text-gray-900 "
        >
          Reason
        </label>
        <select
          id="reason"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        >
          <option>Food Expense</option>
          <option>Taxi Service</option>
          <option>Internet Expense</option>
          <option>Others</option>
        </select>
        </div>
        <div>
  <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="user_avatar">Upload Receipt</label>
  <input ref={imgRef}
        onChange={fileChange} className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none file:bg-gray-900 file:p-2 file:text-white file:border-0" aria-describedby="user_avatar_help" id="user_avatar" type="file" />
</div>
        <div>
          <label
            htmlFor="message"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Remarks
          </label>
          <textarea
            id="message"
            rows={3}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Leave a comment..."
            defaultValue={""}
          />
        </div>
    
        <button
          type="button"
          onClick={addRequest}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Add Request
        </button>
      </form>
    </div>
  );
}

export default AddRequestForm;
