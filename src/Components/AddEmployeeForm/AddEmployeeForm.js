import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { BASE_URL } from "../Utility/Utility";
import  emailjs from 'emailjs-com'

function AddEmployeeForm({ closeModalFn }) {
  const [allDepts, setAllDepts] = useState([]);
  const [allPosition, setallPosition] = useState([]);
  useEffect(() => {
    const id = JSON.parse(localStorage.getItem("orgId"));
    const fetchDeptAndPosition = async () => {
      const result = await Promise.all([
        axios.get(BASE_URL + "get-depts/" + id),
        axios.get(BASE_URL + "get-positions/" + id),
      ]);
      const deptData = result[0].data;
      const positionData = result[1].data;
      setAllDepts(deptData);
      setallPosition(positionData);
    };
    fetchDeptAndPosition();
  }, []);

  const addEmployee = async () => {
    const id = JSON.parse(localStorage.getItem("orgId"));
    const pnd = document.getElementById("positions");
    const dnd = document.getElementById("depts");
    const empObject = {
      f_name: document.getElementById("name").value.split(" ")[0],
      l_name: document.getElementById("name").value.split(" ")[1],
      email: document.getElementById("email").value,
      pos_id: Number(pnd.options[pnd.selectedIndex].id),
      dept_id: Number(dnd.options[dnd.selectedIndex].id),
      doj: document.getElementById("doj").value,
      org_id: id,
    };
    const response = await axios.post(BASE_URL + "add-emp", empObject);

    var templateParams = {
      to_name: empObject.f_name + ' ' + empObject.l_name,
      from_name: 'SalaryFlow',
      email_id: empObject.email,
      password : response.data.password
    };

    const response2 = await emailjs.send("service_8bnq1as", "template_ua5boue", templateParams,'1vpxuEBh1k-XNwY93');
    closeModalFn();
    window.location.reload();
  };
  return (
    <div className="px-4 py-4 ">
      <form className="space-y-4" action="#">
        <div>
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Full Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="Name"
            required
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="name@company.com"
            required
          />
        </div>
        <div>
          <label
            htmlFor="positions"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Position
          </label>
          <select
            id="positions"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option selected value="" disabled="disabled">
              Select Position
            </option>
            {allPosition.map((p) => {
              return (
                <option key={p.id} value={p.pos_name} id={p.id}>
                  {p.pos_name}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <label
            htmlFor="depts"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Department
          </label>
          <select
            id="depts"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option selected value="" disabled="disabled">
              Select Department
            </option>
            {allDepts.map((d) => {
              return (
                <option key={d.id} value={d.dept_name} id={d.id}>
                  {d.dept_name}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <label
            htmlFor="doj"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Date of Joining
          </label>
          <input
            type="date"
            name="doj"
            id="doj"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            required
          />
        </div>
        <button
          type="button"
          onClick={addEmployee}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Add Employee
        </button>
      </form>
    </div>
  );
}

export default AddEmployeeForm;
