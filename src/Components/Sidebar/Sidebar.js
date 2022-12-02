import React from 'react'

function Sidebar() {
  return (
    <div className='hidden z-10 px-6 py-4 fixed top-0 left-0 h-screen bg-white border-r w-[270px] md:block'>
      <a href="#" className='flex space-x-[5px]'><img src="salaryFlowIcon.svg" className='w-8  mt-[4px]' alt="" /><h1 className='text-royalBlue font-bold text-3xl'>SalaryFlow</h1></a>
      <div className='mt-8 space-y-4'>
        <a href="#" className='p-2 font-bold flex space-x-[10px] items-center text-[#717885] active:bg-slate-200 active:rounded-lg'><img src="homeIcon.svg" className='w-6' alt="" /><span className='text-base'>Dashboard</span></a>
        <a href="#" className='p-2 font-bold flex space-x-[10px] items-center text-[#717885]'><img src="users.svg" className='w-6' alt="" /><span className='text-base'>Employees</span></a>
        <a href="#" className='p-2 font-bold flex space-x-[10px] items-center text-[#717885]'><img src="dollar.svg" className='w-6' alt="" /><span className='text-base'>Pay Salary</span></a>
        <a href="#" className='p-2 font-bold flex space-x-[10px] items-center text-[#717885]'><img src="idcard.svg" className='w-6' alt="" /><span className='text-base'>Attendance</span></a>
        <a href="#" className='p-2 font-bold flex space-x-[10px] items-center text-[#717885]'><img src="reimbursments.svg" className='w-6' alt="" /><span className='text-base'>Reimbursements</span></a>
        <a href="#" className='p-2 font-bold flex space-x-[10px] items-center text-[#717885]'><img src="reports.svg" className='w-6' alt="" /><span className='text-base'>Reports</span></a>
      </div>
      <div className='absolute bottom-0 left-0 px-6 border-t w-full py-4'>
        <a href="#" className='p-2 font-bold  flex space-x-[10px] items-center text-[#717885]'><img src="settings.svg" className='w-6' alt="" /><span className='text-base'>Settings</span></a>
      </div>
    </div>
  )
}

export default Sidebar