import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import validate from "../components/ui/validate";

function Contact({ setSnackBar, setColor, setMessage }) {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const disabled =
    Object.keys(errors).some((error) => errors[error] === true) ||
    Object.keys(errors).length !== 3;
  const sendMessage = () => {
    setIsLoading(true);
    let phoneNo = document.getElementById("phone").value;
    let email = document.getElementById("email").value;
    let message = document.getElementById("message").value;
    axios
      .post(
        "https://mail-sender-hefq.onrender.com/mail",
        {
          email: "message8reciever@gmail.com",
          subject: `${email} ${phoneNo}`,
          message: `<html>${message}</html>`,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then(
        (response) => {
          setIsLoading(false);
          setSnackBar(true);
          setColor("green");
          setMessage("Message sent successfully!");
        },
        (error) => {
          setIsLoading(false);
          setSnackBar(true);
          setColor("red");
          setMessage("Some Error Occurs!");
        }
      );
    setTimeout(() => {
      setSnackBar(false);
    }, 10000);
  };
  const validateHelper = (field) => {
    const value = document.getElementById(field).value;
    const valid = validate({ [field]: value });
    setErrors({ ...errors, [field]: !valid[field] });
  };
  return (
    <section className="text-gray-600 body-font relative">
      <div className="absolute inset-0 bg-gray-300">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3668.3737152010294!2d72.66322451504918!3d23.156556584885486!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e802cfe647e33%3A0x983a11b5cb484f15!2sPandit%20Deendayal%20Energy%20University-%20PDEU%20(Formerly%20PDPU)!5e0!3m2!1sen!2sin!4v1671638633046!5m2!1sen!2sin"
          width="100%"
          height="100%"
          frameBorder="0"
          marginHeight="0"
          marginWidth="0"
          title="map"
        ></iframe>
      </div>
      <div className="container px-5 py-24 mx-auto flex">
        <div className="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md">
          <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">
            Contact Us
          </h2>
          <p className="leading-relaxed mb-5 text-gray-600">
            For all enquires, please email us using the form below
          </p>
          <div className="relative mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              placeholder="xyz@gmail.com"
              onBlur={() => {
                validateHelper("email");
              }}
            />
            {errors.email ? (
              <span className="text-sm text-red-600">
                {" "}
                The Email you entered is invalid,Pls check!{" "}
              </span>
            ) : null}
          </div>
          <div className="relative mb-4">
            <label
              htmlFor="phoneNo"
              className="leading-7 text-sm text-gray-600"
            >
              Phone Number
            </label>
            <input
              type="phone"
              id="phone"
              name="phone"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              placeholder="9998887766"
              onBlur={() => {
                validateHelper("phone");
              }}
            />
            {errors.phone ? (
              <span className="text-sm text-red-600">
                {" "}
                The Number you entered is invalid,Pls check!{" "}
              </span>
            ) : null}
          </div>
          <div className="relative mb-4">
            <label
              htmlFor="message"
              className="leading-7 text-sm text-gray-600"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
              placeholder="Message"
              onBlur={() => {
                validateHelper("message");
              }}
            ></textarea>
            {errors.message ? (
              <span className="text-sm text-red-600">
                {" "}
                Invalid message,Pls check!{" "}
              </span>
            ) : null}
          </div>

          <button
            className={`text-white ${
              disabled ? "bg-gray-500" : "bg-indigo-500"
            } border-0 py-2 px-6 focus:outline-none hover:${
              disabled ? "bg-gray-700" : "bg-indigo-700"
            } rounded text-lg`}
            onClick={() => {
              sendMessage();
            }}
            disabled={disabled}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div
                  className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
                  role="status"
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <div>Send Message</div>
            )}
          </button>

          <Link to={{ pathname: "/" }}>
            <p className="text-xs text-gray-500 mt-3">
              Need Immediate response? <span>Checkout our Faqs.</span>
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Contact;



