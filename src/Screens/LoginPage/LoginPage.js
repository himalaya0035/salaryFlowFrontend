import React from 'react'

function LoginPage() {
  return (
    <div className="flex space-y-12 p-4 justify-center items-center h-screen">
        <div className='flex w-[850px] h-[600px] bg-white shadow-md rounded-[15px] border'>
            <div className='w-full md:w-1/2 h-full p-8 md:px-16'>
                <img src="salaryFlowIcon.svg" className='w-28 mt-8 mx-auto' alt="" />
                <h1 className='text-xl font-[500] text-center'>Payroll Made Easy</h1>
                <p className='mt-10 text-left'>Please login to your account</p>
                <form className='mt-6 space-y-4'>
                    <input type="email" name="email" placeholder='Email' className='border-gray-300 tracking-wide w-full border p-2 px-[12px] rounded-[5px] text-base focus:outline-blue-600' id="loginEmail" />
                    <input type="password" autoComplete='true' name="password" placeholder='Password' className='border-gray-300 tracking-wide w-full border p-2 px-[12px] rounded-[5px] text-base focus:outline-blue-600' id="loginPassword" />
                    <button type="submit" className='w-full py-2 px-4 text-center rounded-[5px] text-sm text-white font-[500] tracking-wider bg-royalBlue'>LOG IN</button>
                </form>
                <a href="#" className='text-gray-500 text-center mt-[12px] block'>Forgot password?</a>
                <p className='mt-10'>Don't have an account? <a href="#" className='text-gray-500'>Sign up now!</a> </p>
            </div>
            <div className='hidden w-1/2 md:flex flex-col justify-center h-full md:px-16 bg-royalBlue rounded-r-[15px]'>
                <h1 className='text-xl font-[500] text-white'>We are more than just a company.</h1>
                <p className='text-white mt-6'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque laudantium repudiandae voluptatum quisquam harum, velit et atque amet ullam saepe.</p>
            </div>
        </div>
        <footer className='fixed bottom-0 left-0 w-full bg-[#f7f9fa] p-2 space-x-4 text-center'>
            <a href="#" className='font-[600] text-gray-600 text-[11px]'>ContactUs</a>
            <a href="#" className='font-[600] text-gray-600 text-[11px]'>Privacy</a>
            <a href="#" className='font-[600] text-gray-600 text-[11px]'>Legal</a>
            <a href="#" className='font-[600] text-gray-600 text-[11px]'>Worldwide</a>
        </footer>
    </div>
  )
}

export default LoginPage