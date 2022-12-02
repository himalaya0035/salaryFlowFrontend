import React from 'react'

function HomePage() {
  return (
    <div className='space-y-4'>
      <div className='flex flex-col space-y-4 md:space-x-4 md:space-y-0 md:flex-row'>
        <div className='h-80 w-full bg-white rounded-md md:w-6/12 px-4 py-2 shadow-md'>
          <h3 className="text-md font-[600] text-black tracking-wide">
            
          </h3>
        </div>
        <div className='bg-white w-full h-80 rounded-md md:w-3/12 shadow-md px-4 py-2'>
          <h3 className="text-md font-[600] text-black tracking-wide">On Leave</h3>
        </div>
        <div className='w-full md:w-3/12 space-y-4 flex flex-col'>
          <div className='w-full h-40 bg-white md:h-1/2 rounded-md shadow-md px-4 py-2'>
            <h3 className="text-md font-[600] text-black tracking-wide">Create New Salary Flow</h3>
          </div>
          <div className='w-full h-40 bg-white md:h-1/2 rounded-md shadow-md px-4 py-2'>
            <h3 className="text-md font-[600] text-black tracking-wide">Reimburse ammount</h3>
          </div>
        </div>
      </div>
      <div className='flex flex-col space-y-4 md:space-x-4 md:space-y-0 md:flex-row'>
        <div className='h-80 w-full bg-white rounded-md md:w-4/12 px-4 py-2 shadow-md'>
          <h3 className="text-md font-[600] text-black tracking-wide">Reimbursements</h3>
        </div>
        <div className='bg-white w-full h-80 rounded-md md:w-5/12 shadow-md px-4 py-2'>
          <h3 className="text-md font-[600] text-black tracking-wide">Transactions</h3>
        </div>
        <div className='w-full md:w-3/12 space-y-4 flex flex-col'>
          <div className='w-full h-40 bg-white md:h-1/2 rounded-md shadow-md px-4 py-2'>
            <h3 className="text-md font-[600] text-black tracking-wide">No of Employees</h3>
          </div>
          <div className='w-full h-40 bg-white md:h-1/2 rounded-md shadow-md px-4 py-2'>
            <h3 className="text-md font-[600] text-black tracking-wide">Bank Account</h3>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage