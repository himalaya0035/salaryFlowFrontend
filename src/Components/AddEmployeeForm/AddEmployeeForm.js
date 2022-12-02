import React from "react";

function AddEmployeeForm() {
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
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="Developer"
            required
          />
        </div>
        <div>
          <label
            htmlFor="ctc"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            CTC (in lakhs)
          </label>
          <input
            type="number"
            name="ctc"
            id="ctc"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="8 Lakh Rupees"
            required
          />
        </div>
        <div>
          <label
            htmlFor="base"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Base Pay (in lakhs)
          </label>
          <input
            type="number"
            name="base"
            id="base"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="7.5 Lakh Rupees"
            required
          />
        </div>
      </form>
    </div>
  );
}

export default AddEmployeeForm;
