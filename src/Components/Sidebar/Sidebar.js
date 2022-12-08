import axios from 'axios'
import React,{useState,useEffect} from 'react'
import {Link,NavLink, useNavigate } from 'react-router-dom'
import { BASE_URL } from '../Utility/Utility'

function Sidebar() {
  const navigate = useNavigate()
  const normalClasses = 'p-2 font-bold flex space-x-[10px] items-center text-[#717885]'
  const activeClasses = ' bg-slate-200 rounded-lg'
  const [isAdmin, setIsAdmin] = useState(true);
  const handleClick = async () => {
    const {data} = await axios.get(BASE_URL + '/logout-user');
    console.log(data)
    localStorage.removeItem('userData');
    localStorage.removeItem('orgData');
    navigate('/login',{replace:true})
  }
  useEffect(() => {
   setIsAdmin(JSON.parse(localStorage.getItem('userData')).isAdmin === 0 ? false : true);
    
    return () => {
    
    }
  }, [])
  
  return (
    <div className='hidden z-20 px-6 py-4 fixed top-0 left-0 h-screen bg-white border-r w-[270px] md:block'>
      <Link to='/' reloadDocument className='flex space-x-[5px]'><img src="salaryFlowIcon.svg" className='w-8  mt-[4px]' alt="" /><h1 className='text-royalBlue font-bold text-3xl'>SalaryFlow</h1></Link>
      <div className='mt-8 space-y-4'>
        <NavLink to="/" className={({isActive} ) => isActive ? normalClasses + activeClasses : normalClasses}><img src="homeIcon.svg" className='w-6' alt="" /><span className='text-base'>Dashboard</span></NavLink>
        {isAdmin && <NavLink to="/departments" className={({isActive} ) => isActive ? normalClasses + activeClasses : normalClasses}><img src="department.svg" className='w-6' alt="" /><span className='text-base'>Departments</span></NavLink>}
        {isAdmin && <NavLink to="/employees" className={({isActive} ) => isActive ? normalClasses + activeClasses : normalClasses}><img src="users.svg" className='w-6' alt="" /><span className='text-base'>Employees</span></NavLink>}
        {isAdmin && <NavLink to="/salary" className={({isActive} ) => isActive ? normalClasses + activeClasses : normalClasses}><img src="dollar.svg" className='w-6' alt="" /><span className='text-base'>Pay Salary</span></NavLink>}
        <NavLink to="/attendance" className={({isActive} ) => isActive ? normalClasses + activeClasses : normalClasses}><img src="idcard.svg" className='w-6' alt="" /><span className='text-base'>Attendance</span></NavLink>
        <NavLink to="/reimbursements" className={({isActive} ) => isActive ? normalClasses + activeClasses : normalClasses}><img src="reimbursments.svg" className='w-6' alt="" /><span className='text-base'>Reimbursements</span></NavLink>
        <button onClick={handleClick} className={normalClasses}><img src="logout.svg" className='w-6' alt="" /><span className='text-base'>Logout</span></button>
      </div>
      <div className='absolute bottom-0 left-0 px-6 border-t w-full py-4'>
        <a href="#" className='p-2 font-bold  flex space-x-[10px] items-center text-[#717885]'><img src="settings.svg" className='w-6' alt="" /><span className='text-base'>Settings</span></a>
      </div>
    </div>
  )
}

export default Sidebar