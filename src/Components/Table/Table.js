import React, { useEffect, useState } from "react";

function Table({ tableHeader, tableRows, editRow = false }) {
  return (
    <div className="overflow-x-auto relative">
      <table className=" w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {tableHeader.map((theader) => (
              <th scope="col" key={theader} className="py-3 px-6">
                {theader}
              </th>
            ))}
            {editRow && (
              <th scope="col" className="py-3 px-6">
                <span className="sr-only">Edit</span>
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {tableRows.length > 0 ? (
            tableRows.map((tableRow, index) => {
              return (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  {tableRow.map((col, index) => {
                    if (index == 0) {
                      return (
                        <th
                          key={col}
                          scope="row"
                          className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {col}
                        </th>
                      );
                    } else {
                      return (
                        <td className="py-4 px-6" key={col}>
                          {col}
                        </td>
                      );
                    }
                  })}
                  {editRow && (
                    <td className="py-4 px-6 text-right">
                      <a
                        href="#"
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Edit
                      </a>
                    </td>
                  )}
                </tr>
              );
            })
          ) : (
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="py-4 px-6"></td>
              <td className="py-4 px-6"></td>
              <td className="py-4 px-6">No Employees Found!</td>
              <td className="py-4 px-6"></td>
              <td className="py-4 px-6"></td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
