import axios from "axios";
import React,{useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../Components/Utility/Utility";

function SignupPage() {
 const navigate =  useNavigate()
 useEffect(() => {
    if (localStorage.getItem('userData') !== null){
        navigate('/',{ replace: true })
    }
 }, [])
 
  const signupUser = async () => {
    const userObj = {
        "f_name":document.getElementById('fname').value,
        "l_name":document.getElementById('lname').value,
        "email":document.getElementById('email').value,
        "password":document.getElementById('pass').value,
        "org_name":document.getElementById('orgname').value,
        "emps":1,
    }
    const {data} = await axios.post(BASE_URL + 'signup-user/',userObj)
    localStorage.setItem('userData',JSON.stringify(data.user));
    localStorage.setItem('orgId',JSON.stringify(data.org.id));
    localStorage.setItem('orgData',JSON.stringify(data.org));
    navigate('/',{ replace: true })
  }
  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
        <img src="salaryFlowIcon.svg" className='w-28 mt-8 mx-auto' alt="" />
        <h1 className='text-xl font-[500] text-center mb-4'>Payroll Made Easy</h1>
          <input
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="fullname"
            id="fname"
            placeholder="First Name"
          />
          <input
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="lastname"
            id="lname"
            placeholder="Last Name"
          />
          <input
            type="email"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="email"
            id="email"
            placeholder="Email"
          />
          <input
            type="password"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="password"
            id="pass"
            placeholder="Password"
          />
          <input
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="orgname"
            id="orgname"
            placeholder="Organisation Name"
          />
          <button
            onClick={() => signupUser()}
            className="w-full py-2 px-4 text-center rounded-[5px] text-sm text-white font-[500] tracking-wider bg-royalBlue"
          >
            Sign Up
          </button>
          <div className="text-center text-sm text-grey-dark mt-4">
            By signing up, you agree to the&nbsp;
            <a
              className="no-underline border-b border-grey-dark text-grey-dark"
              href="#"
            >
              Terms of Service
            </a>{" "}
            and&nbsp;
            <a
              className="no-underline border-b border-grey-dark text-grey-dark"
              href="#"
            >
              Privacy Policy
            </a>
          </div>
        </div>
        <div className="text-grey-dark mt-6">
          Already have an account?&nbsp;
          <Link
            className="  text-gray-500"
            to="/login"
          >
            Log in
          </Link>
          .
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
