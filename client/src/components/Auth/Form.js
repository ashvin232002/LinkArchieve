import React,{useState} from "react";
import axios from "axios";
// import { useHistory } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/operations/authAPI";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

function Form() {

      // const history = useHistory()
      const navigate = useNavigate();
      const  dispatch =  useDispatch();
      const gotoSignUp= ()=>{
        navigate("/SignUp");
      }
      const [FormData,setFormData] = useState({
        email: "",
        password: "",
      })

      function handleChange(event){
           setFormData((prevData)=>(
            {
                ...prevData,
                [event.target.name]:event.target.value
            }
           ))
      }
     
      function submitHandler(event){
        event.preventDefault();
        console.log("I am Printing The form Data",FormData);
        dispatch(login(FormData.email,FormData.password,navigate));
      }
  return (
    <>
      <div className="bg-white px-24 py-20 rounded-3xl border-gray-200">
        <h1 className="text-5xl font-semibold">Welcome Back</h1>
        <p className="font-medium text-lg text-gray-700 mt-4">
          Welcome back! Please enter your details.
        </p>
        <form onSubmit={submitHandler} className="mt-8">
           
          <div >
            <label className="text-lg font-medium">Email</label>
            <input
              name="email"
              value={FormData.email}
              onChange={handleChange}
              type="email"
              className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-gray-300"
              placeholder="Enter Your Email Address"
            />
          </div>
          <div>
            <label className="text-lg font-medium">Password</label>
            <input
              name="password"
              value={FormData.password}
              onChange={handleChange}
              type="password"
              className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-gray-300"
              placeholder="Enter Your Password"
            />
          </div>
          <Link to="/forgot-password">
          <p className="mt-3 ml-auto max-w-max text-xm text-blue-500 font-bold">
            Forgot Password ?
          </p>
        </Link>
          
          <div className="mt-8 flex flex-col gap-y-4 ">
            <button  className="bg-violet-600 text-white text-lg font-bold p-3 rounded-xl hover:bg-violet-500">
              Sign in
            </button>
            
          </div>
          <div className="mt-8 flex justify-center items-center ">
            <p className="font-medium text-base">Don't Have an Account ?</p>
            <button  onClick={gotoSignUp}className="text-violet-500 text-base font-medium ml-2">Sign Up</button>
          </div>
        </form>
      </div>
    </>
  );
}
export default Form;