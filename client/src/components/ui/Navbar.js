import React, { useState } from "react";
import {Link ,matchPath} from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import  {useDispatch} from "react-redux"
import  {useNavigate} from "react-router-dom";
// import CreateLink from "../LinkStatus/CreateLink";
import {Logout} from "../../services/operations/authAPI"

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate =  useNavigate();
  console.log("PRINTING THE BASE URL ",process.env.REACT_APP_BASE_URL);
  const  {token} = useSelector((state)=>state.auth);
  const  location  = useLocation();
  const [navbar, setNavbar] = useState(false);

  const  matchRoute  =  (route)=>{
    return matchPath({path:route},location.pathname);
  }
  return (
    <nav className="w-full bg-gray-200 shadow  ">
      <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8 lg:mb-0">
        <div>
          <div className="flex items-center justify-between py-3 md:py-5 md:block">
            <a href="/">
              <h2 className="text-2xl font-bold text-dark">LOGO</h2>
            </a>
            <div className="md:hidden">
              <button
                className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                onClick={() => setNavbar(!navbar)}
              >
                {navbar ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-dark"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-dark"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        <div>
          <div
            className={`flex-col justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
              navbar ? "block" : "hidden"
            }`}
          >
            <div className="  text-center space-y-8 md:flex md:space-x-6 md:space-y-0">
              <div className="text-dark hover:text-gray-600  ">
                <a href="/">Home</a>
              </div>
              <div className="text-dark hover:text-gray-600">
                <a href="/Contact">Contact Us</a>
              </div>
            </div>

             <div className="mt-3 space-y-2 lg:hidden md:inline-block">
              {
                token === null &&(<div >
                  <Link
                    to="/Login"
                    className="inline-block w-full px-4 py-2 text-center text-white bg-gray-800 rounded-md shadow hover:bg-gray-600"
                  >
                    Login
                  </Link>
                  <Link
                    to="/SignUp"
                    className="inline-block w-full px-4 py-2 text-center  text-gray-800 bg-white rounded-md shadow hover:bg-gray-200"
                  >
                    Sign up
                  </Link>
                </div>)
                }
                {
                  token !== null && (<div >
                    <Link
                      to="/Login"
                      className="inline-block w-full px-4 py-2 text-center text-white bg-gray-800 rounded-md shadow hover:bg-gray-600"
                      onClick={()=>{
                        dispatch(Logout(navigate))
                      }}
                    >
                      LogOut
                    </Link>
                    <Link
                      to="/Dashboard"
                      className="inline-block w-full px-4 py-2 text-center  text-gray-800 bg-white rounded-md shadow hover:bg-gray-200"
                    >
                      Dashboard
                    </Link>
                  </div>)
                }
            </div>
          </div>
        </div>
        <div className="hidden space-x-2  md:inline-block">
          {
           token === null &&(<div >
            <Link
              to="/Login"
              className="px-4 py-2 text-white bg-gray-800 rounded-md shadow hover:bg-gray-600"
            >
              Login
            </Link>
            <Link
              to="/SignUp"
              className="px-4 py-2 text-gray-800 bg-white rounded-md shadow hover:bg-gray-200"
            >
              Sign up
            </Link>
          </div>)
         }
         {
          token !== null &&(<div >
            <Link
              to="/Login"
              className="px-4 py-2 text-white bg-gray-800 rounded-md shadow hover:bg-gray-600"
              onClick={()=>{
                dispatch(Logout(navigate))
              }} >
              LogOut
            </Link>
            <Link
              to="/Dashboard"
              className="px-4 py-2 text-gray-800 bg-white rounded-md shadow hover:bg-gray-200"
            >
              Dashboard
            </Link>
          </div>)
         }
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
