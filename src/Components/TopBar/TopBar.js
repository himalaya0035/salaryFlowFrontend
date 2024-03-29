import React from 'react'

function TopBar() {
  return (
    <div className='flex sticky top-0 z-10 justify-between items-center md:justify-end px-4 py-4 h-16 bg-white border-b shadow-sm w-full'>
      <a href="#" className='flex space-x-[5px] md:hidden'><img src="salaryFlowIcon.svg" className='w-8  mt-[4px]' alt="" /><h1 className='text-royalBlue font-bold text-3xl'>SalaryFlow</h1></a>
      <div className='flex items-center justify-end space-x-2'>
        <a href="#"><img src="userAvatar.svg" className='rounded-full w-[43px] h-[43px] shadow-sm border border-[#717885]' alt="" /></a>
      </div>
      
    </div>
  )
}

export default TopBar