import React from "react";
import Table from "../Table/Table";

function Modal({
  title,
  setShowModal,
  children,
  buttonText = "",
  buttonClickFn,
  width
}) {
  const handleClick = () => {
    buttonClickFn();
  };
  return (
      <div className={width === '500px' ? `absolute left-1/2 top-[5%] max-w-[350px] -translate-x-1/2 md:max-w-[500px] w-full bg-white rounded-lg shadow-md border-2` : 'absolute left-1/2 top-[5%] max-w-[350px] -translate-x-1/2 md:max-w-[800px] w-full bg-white rounded-lg shadow-md border-2'}>
        <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {title}
          </h3>
          <button
            onClick={() => setShowModal(false)}
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-toggle="staticModal"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        <div>{children}</div>
        <div className="flex items-center p-4 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
          {buttonText.length > 0 && (
            <button
              type="button"
              onClick={handleClick}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              {buttonText}
            </button>
          )}
        </div>
      </div>
  );
}

export default Modal;
