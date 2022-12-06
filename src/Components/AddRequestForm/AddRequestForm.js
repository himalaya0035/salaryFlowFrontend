import React from "react";

function AddRequestForm() {
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
  <input className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none file:bg-gray-900 file:p-2 file:text-white file:border-0" aria-describedby="user_avatar_help" id="user_avatar" type="file" />
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
    

      </form>
    </div>
  );
}

export default AddRequestForm;
