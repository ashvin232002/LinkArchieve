import  {toast} from "react-hot-toast";

import {setLoading, setToken} from "../../slices/authSlice"
import  {apiConnecter} from "../apiconnector"
import { endpoints } from "../apis";
import { Navigate } from "react-router-dom";


const  {
    SIGNUP_API ,
    LOGIN_API,
    SENDOTP_API,
    RESETPASSTOKEN_API,
    RESETPASSWORD_API
} =  endpoints ;


export  function sendOtp(email,navigate){
    return async(dispatch)=>{
        const  toastId   =  toast.loading("Loading..");
        dispatch(setLoading(true));
        try{
            const response  = await apiConnecter("POST",SENDOTP_API,{
                email,
                checkUserPresent: true,
            })
            console.log("SENDOTP API RESPONSE>....",response);
            console.log(response.data.success);

            if(!response.data.success){
                throw new Error(response.data.message);
            }
            toast.success("OTP Sent Successfully")
            navigate("/verify-email")
        }
        catch(error){
            console.log("SENDOTP API ERROR............", error)
            toast.error("Could Not Send OTP")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}


export function signUp(name,email,password,otp,navigate){
     return async(dispatch)=>{
        const  toastId  =  toast.loading("Loading ...");
        dispatch(setLoading(true));
        try{
            console.log("Before Calling The sign Up API");

            const  response  = await apiConnecter("POST",SIGNUP_API,{
                name,
                email,
                password,
                otp,
            })
            console.log("SIGN API CALLED IN SIDE CUSTOMER SIGN U P",response);
            if (!response.data.success) {
                throw new Error(response.data.message)
              }
            toast.success("Signup Successful")
            navigate("/login")
        }
        catch(error){
            console.log("SIgn Up API ERROR");
            toast.error("User Sign Up failed");
            navigate("/signup");
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
     }
}



export function login(email,password,navigate){
    return async (dispatch)=>{
        const toastId  =  toast.loading("Loading ...");
        dispatch(setLoading(true));

        try{
          
            const response  =  await apiConnecter("POST",LOGIN_API , {
                email,
                password
            })

            console.log("LOGIN API RESPONSE",response);

            if(!response.data.success){
                throw new Error (response.data.message);
            }
            toast.success("Login SuccessFull");
            dispatch(setToken(response.data.token));

            localStorage.setItem("token",JSON.stringify(response.data.token));
            navigate("/dashboard");
        }
        catch(error){
            console.log("Login API error",error);
            toast.error("Login Failed");
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}


export  function Logout(navigate){
    return (dispatch)=>{
        dispatch(setToken(null));
        localStorage.removeItem("token");
        toast.success("Logged Out");
        navigate("/login");
    }
}


export function getPasswordResetToken(email,setEmailSent){
    return async (dispatch) =>{
        const toastId  =  toast.loading("Loading ...");
        dispatch(setLoading(true));
        try{
            const  response  =  await apiConnecter("POST",RESETPASSTOKEN_API,{email});
            console.log("RESET PASSWORD TOKEN RESPONSE.....",response);

            if(!response.data.success){
                throw new Error(response.data.message);
            }
             toast.success("Reset Email Sent");
             setEmailSent(true);
        }catch(error){
            console.log("RESET PASSWORD TOKEN ERROR",error);
            toast.error("Failed To sent Email for Resetting password");
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}


export  function resetPassword(password,token,navigate){
    return async(dispatch)=>{
      const toastId  =  toast.loading("Loading ...");
       dispatch(setLoading(true));
       try{
        const  response  = await apiConnecter("POST",RESETPASSWORD_API,{password,token});
        console.log("RESET password RESPOnse....",response);

        if(!response.data.success){
            throw  new Error(response.data.message);
        }
        toast.success("Password has been Reset SuccessFullly");
        navigate("/login");
       }
       catch(error){
           console.log("RESET PASSWORD tOEKN eRROR",error);
           toast.error("Unable to reset Password");
       }
       dispatch(setLoading(false));
       toast.dismiss(toastId);
    }
}