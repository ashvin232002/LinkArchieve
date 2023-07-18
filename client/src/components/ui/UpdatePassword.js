import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { resetPassword } from "../../services/operations/authAPI";
// import { useNavigate } from "react-router-dom";
import React from "react";

const UpdatePassword = () => {
//   const  navigate  =  useNavigate();
  const { loading } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const  location = useLocation();
  const  dispatch  =  useDispatch();
  const navigate  =  useNavigate();
  const [formData,setFormData] = useState({
    password:"",
  })

  const  {password} = formData;
  const handleOnchange  = (e)=>{
    setFormData((prevData)=>({
        ...prevData,
        [e.target.name] : e.target.value,
    }))
  }
   
  const handleOnSubmit =  (e)=>{
    e.preventDefault();
    const token =  location.pathname.split("/").at(-1);
   dispatch(resetPassword(password,token,navigate));
  }


  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center bg-gray-300">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="max-w-[500px] p-4 lg:p-8 bg-white rounded-md">
          <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
            Choose new password
          </h1>
          <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100">
            Almost done. Enter your new password and youre all set.
          </p>
          <form onSubmit={handleOnSubmit}>
            <label className="relative">
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                New Password <sup className="text-pink-200">*</sup>
              </p>
              <input
                required
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={handleOnchange}
                placeholder="Enter Password"
                className="form-style w-full !pr-10 bg-gray-300 p-3 rounded-md"
              />

              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
            </label>
            <button
              type="submit"
              className="mt-6 w-full rounded-[8px] bg-black text-white py-[12px] px-[12px] font-medium text-richblack-900"
            >
              Reset Password
            </button>
          </form>
          <div className="mt-6 flex items-center justify-between font-bold">
            <Link to="/login">
              <p className="flex items-center gap-x-2 text-richblack-5">
                <BiArrowBack /> Back To Login
              </p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdatePassword;