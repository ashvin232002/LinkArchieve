import './App.css';
import  Layout from "../src/components/ui/Layout"
import { useState } from 'react';
import { Route, Routes, useNavigate } from "react-router-dom";
// import { Router } from 'express';
import Contact from './pages/Contact';
import SignUp from './components/Auth/SignUp';
import Login from './components/Auth/Login';
import OpenRoute from './components/ui/OpenRoute';
import PrivateRoute from './components/ui/PrivateRoute';
import VerifyEmail from './components/ui/VerifyEmail';
import ForgotPassword from './components/ui/ForgotPassword';
import UpdatePassword from './components/ui/UpdatePassword';
import Dashboard from './components/ui/Dashboard';
// import GetAllLinks from './components/LinkStatus/GetAllLinks';
import DisplayLinks from './components/LinkStatus/DisplayLinks';



function App() {
  const [snackBar,setSnackBar] =useState(false)
  const [message,setMessage] =useState('')
  const [color,setColor] =useState('')

  return (
    <div className='w-screen  h-screen'>
       <Layout setSnackBar={setSnackBar} setColor={setColor} setMessage={setMessage} >
      <Routes>
        {/* <Route exact path='/' element={<Home/>}/> */}
        <Route exact path='/Contact' element={<Contact setSnackBar={setSnackBar} setColor={setColor} setMessage={setMessage}/>}/>
        <Route
          path="signup"
          element={
            <OpenRoute>
              <SignUp />
            </OpenRoute>
          }
        />
        <Route
          path="verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />
         <Route
          path="login"
          element={
             <OpenRoute>
              <Login />
             </OpenRoute>
          }
        />
        <Route
          path="forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />
        <Route
          path="update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        />



        <Route
          path="Dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="entries"
          element={
            <PrivateRoute>
              <DisplayLinks />
            </PrivateRoute>
          }
        />
       </Routes> 
        </Layout>
    </div>
  );
}

export default App;

