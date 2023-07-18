import React,{useState} from "react";
import "./SignUp.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import  {sendOtp} from "../../services/operations/authAPI"
import { setSignupData } from "../../slices/authSlice";
import { useDispatch, useSelector } from "react-redux"

const SignUp = () => {


        const dispatch  =  useDispatch();
         
        const navigate = useNavigate();
        //const  dispatch =  useDispatch();
        const gotoLogin = ()=>{
            navigate("/Login");
        }
        const [FormData,setFormData] = useState({
            name: "",
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
            console.log("I am Printing The Form Data",FormData);
            const realData  =  {
              ...FormData
            }
            console.log("Printing The real Data",realData);
            dispatch(setSignupData(realData));
            
            console.log("I am Printing the SetUped SignUp data",setSignupData);
            dispatch(sendOtp(FormData.email,navigate));

            setFormData({
                email:"",
                password:"",
                name:"",
            })
        }

  return (
    <>
      <div className="flex w-full  h-screen ">
        {/* {console.log("user",user)} */}
        <div className="w-full flex items-center justify-center lg:w-1/2 bg-gray-300">
          <div className="bg-white px-24 py-15 lg:py-20 rounded-3xl border-gray-200">
            <h1 className="text-5xl font-semibold items-center justify-center text-center">Welcome!!</h1>
            <p className="font-medium text-lg text-gray-500 mt-4">
              Create an Account To use Our Features.
            </p>
            <div className="mt-8">
            <form onSubmit={submitHandler} >
               <div>
                <label className="text-lg font-medium">Name</label>
                <input
                  onChange={handleChange}
                  value={FormData.name}
                  name="name"
                  type="text"
                  className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1  bg-gray-300"
                  placeholder="Enter Your Name"
                />
              </div>
              <div>
                <label className="text-lg font-medium">Email</label>
                <input
                  onChange={handleChange}
                  value={FormData.email}
                  name="email"
                  type="email"
                  className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1  bg-gray-300"
                  placeholder="Enter Your Email Address"
                />
              </div>
              <div>
                <label className="text-lg font-medium">Password</label>
                <input
                  onChange={handleChange}
                  value={FormData.password}
                  name="password"
                  type="password"
                  className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1  bg-gray-300"
                  placeholder="Enter Your Password"
                />
              </div>
              
              <div className="mt-8 flex justify-between item-center">
                <button className="font-medium text-base text-violet-700">
                   
                </button>
              </div>
              <div className="mt-1 flex flex-col gap-y-4 ">
                <button  className="bg-violet-600 text-white text-lg font-bold p-3 rounded-xl hover:bg-violet-500">
                  Create an Account
                </button>
              </div>
              <div className="mt-5 flex justify-center items-center ">
                <p className="font-medium text-base">Already Have an  Account ?</p>
                <button onClick={gotoLogin} className="text-violet-500 text-base font-medium ml-2">
                  Sign In
                </button>
              </div>
            </form>
          </div>
          </div>
        </div>
        <div className="hidden relative lg:flex h-full w-1/2 items-center justify-center bg-gray-200">
          <div className="w-60 h-60 bg-gradient-to-tr from-pink-700 to-violet-500 rounded-full animate-bounce "></div>
          <div className="w-full h-1/2 absolute bottom-0 bg-white/10 backdrop-blur-lg"></div>
        </div>
      </div>
    </>
  );
};
export default SignUp;