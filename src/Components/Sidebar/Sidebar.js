import React from 'react'
import {NavLink } from 'react-router-dom'

function Sidebar() {
  const normalClasses = 'p-2 font-bold flex space-x-[10px] items-center text-[#717885]'
  const activeClasses = ' bg-slate-200 rounded-lg'
  return (
    <div className='hidden z-20 px-6 py-4 fixed top-0 left-0 h-screen bg-white border-r w-[270px] md:block'>
      <a href="#" className='flex space-x-[5px]'><img src="salaryFlowIcon.svg" className='w-8  mt-[4px]' alt="" /><h1 className='text-royalBlue font-bold text-3xl'>SalaryFlow</h1></a>
      <div className='mt-8 space-y-4'>
        <NavLink to="/" className={({isActive} ) => isActive ? normalClasses + activeClasses : normalClasses}><img src="homeIcon.svg" className='w-6' alt="" /><span className='text-base'>Dashboard</span></NavLink>
        <NavLink to="/employees" className={({isActive} ) => isActive ? normalClasses + activeClasses : normalClasses}><img src="users.svg" className='w-6' alt="" /><span className='text-base'>Employees</span></NavLink>
        <NavLink to="/salary" className={({isActive} ) => isActive ? normalClasses + activeClasses : normalClasses}><img src="dollar.svg" className='w-6' alt="" /><span className='text-base'>Pay Salary</span></NavLink>
        <NavLink to="/attendance" className={({isActive} ) => isActive ? normalClasses + activeClasses : normalClasses}><img src="idcard.svg" className='w-6' alt="" /><span className='text-base'>Attendance</span></NavLink>
        <NavLink to="/reimbursements" className={({isActive} ) => isActive ? normalClasses + activeClasses : normalClasses}><img src="reimbursments.svg" className='w-6' alt="" /><span className='text-base'>Reimbursements</span></NavLink>
        <NavLink to="/reports" className={({isActive} ) => isActive ? normalClasses + activeClasses : normalClasses}><img src="reports.svg" className='w-6' alt="" /><span className='text-base'>Reports</span></NavLink>
      </div>
      <div className='absolute bottom-0 left-0 px-6 border-t w-full py-4'>
        <a href="#" className='p-2 font-bold  flex space-x-[10px] items-center text-[#717885]'><img src="settings.svg" className='w-6' alt="" /><span className='text-base'>Settings</span></a>
      </div>
    </div>
  )
}

export default Sidebar