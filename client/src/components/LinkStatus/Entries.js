import React, { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";

import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Entryfacilities } from "./Entryfacilities";
// import confirmation_modal from "../common/confirmation_modal";
import  confirmationModal from "../../components/common/confirmation_modal"
import SearchEntries from "./SearchEntries";

const Entries = ({Entrytype,copyText,setCopyText,getEntries}) => {
    
    const  dispatch  =  useDispatch();
    const  navigate =  useNavigate();
    
    const {token} =  useSelector((state)=>state.auth);
    const {entrie}  =  useSelector((state)=>state.entrie);
    

    function handleClick(data) {
        // const  linkToCopy  =  linkRef.current.value;
        setCopyText(data.link);
        console.log(copyText);
        navigator.clipboard.writeText(data.link);
        toast.success("Link Copied");
      }

      // useEffect(()=>{
      //   getEntries();
      // },[entrie])
  return (
    <div>
      {
      
      Entrytype === "Entries" ? (
        <div className=" w-11/12  mx-auto m-w-maxcontent bg-white ">
          <div className=" my-10 flex flex-col flex-wrap ">
            {entrie.map((data, index) => (
              <div
                key={index}
                className="bg-gray-300 w-full lg:w-[60%] mx-auto mt-7 rounded-md mb-7"
              >
                <div className="mt-5 flex ml-5 ">
                  <div className="font-bold text-xl">Title : </div>
                  <div className="text-xl ml-4">{data.title}</div>
                </div>

                <div className="mt-5 flex ml-5 ">
                  <div className="font-bold text-xl ">Link:</div>
                  <a
                    href={data.link}
                    className=" text-sm ml-2 lg:text-xl lg:ml-4 text-blue-700 cursor-pointer "
                  >
                    {data.link}
                  </a>

                  <button
                    className="bg-blue-300 text-black p-1 ml-5 font-bold rounded-md px-3 lg:px-7"
                    onClick={() => handleClick(data)}
                  >
                    copy
                  </button>
                </div>
                <div className="mt-5 flex ml-5  ">
                  <div className="font-bold text-xl">Description: </div>
                  <div className="text-sm lg:text-xl ml-4">{data.description}</div>
                </div>
                <div className="mt-5  ml-5 flex">
                  <div className="font-bold text-xl">Tags: </div>
                  <div className="text-sm lg:text-xl ml-4 flex gap-x-2 flex-wrap">
                    {data.tags.map((tag, index) => {
                      return (
                        <div key={index} className="">
                          <div className="bg-blue-300 rounded-md lg:px-2 lg:py-1 px-1 py-1">
                            {tag}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="mt-5 flex ml-5 mb-4 ">
                  <div className="font-bold text-xl">Type : </div>
                  <div className="text-sm lg:text-xl ml-4 bg-white rounded-md px-1 py-1">
                    {data.type}
                  </div>
                </div>
                 <Entryfacilities data={data} getEntries={getEntries} />
              </div>
            ))}
          </div>
          
        </div>
      ) : Entrytype==="Starred" ?(
        <div className=" w-11/12  mx-auto m-w-maxcontent bg-white ">
        <div className=" my-10 flex flex-col flex-wrap ">
          {entrie.map((data, index) => (
            data.isStarred === true && (<div
              key={index}
              className="bg-gray-300 w-full lg:w-[60%] mx-auto mt-7 rounded-md mb-7"
            >
              <div className="mt-5 flex ml-5 ">
                <div className="font-bold text-xl">Title : </div>
                <div className="text-xl ml-4">{data.title}</div>
              </div>

              <div className="mt-5 flex ml-5 ">
                <div className="font-bold text-xl ">Link:</div>
                <a
                  href={data.link}
                  className=" text-sm ml-2 lg:text-xl lg:ml-4 text-blue-700 cursor-pointer "
                >
                  {data.link}
                </a>

                <button
                  className="bg-blue-300 text-black p-1 ml-5 font-bold rounded-md px-3 lg:px-7"
                  onClick={() => handleClick(data)}
                >
                  copy
                </button>
              </div>
              <div className="mt-5 flex ml-5  ">
                <div className="font-bold text-xl">Description: </div>
                <div className="text-sm lg:text-xl ml-4">{data.description}</div>
              </div>
              <div className="mt-5  ml-5 flex">
                <div className="font-bold text-xl">Tags: </div>
                <div className="text-sm lg:text-xl ml-4 flex gap-x-2 flex-wrap">
                  {data.tags.map((tag, index) => {
                    return (
                      <div key={index} className="">
                        <div className="bg-blue-300 rounded-md lg:px-2 lg:py-1 px-1 py-1">
                          {tag}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="mt-5 flex ml-5 mb-4 ">
                <div className="font-bold text-xl">Type : </div>
                <div className="text-sm lg:text-xl ml-4 bg-white rounded-md px-1 py-1">
                  {data.type}
                </div>
              </div>
               <Entryfacilities data={data} getEntries={getEntries} />
            </div>)
          ))}
        </div>
        
      </div>
      ) : Entrytype ===  "markedAsViewed" ?(
        <div className=" w-11/12  mx-auto m-w-maxcontent bg-white ">
        <div className=" my-10 flex flex-col flex-wrap ">
          {entrie.map((data, index) => (
            data.isViewed === true && (<div
              key={index}
              className="bg-gray-300 w-full lg:w-[60%] mx-auto mt-7 rounded-md mb-7"
            >
              <div className="mt-5 flex ml-5 ">
                <div className="font-bold text-xl">Title : </div>
                <div className="text-xl ml-4">{data.title}</div>
              </div>

              <div className="mt-5 flex ml-5 ">
                <div className="font-bold text-xl ">Link:</div>
                <a
                  href={data.link}
                  className=" text-sm ml-2 lg:text-xl lg:ml-4 text-blue-700 cursor-pointer "
                >
                  {data.link}
                </a>

                <button
                  className="bg-blue-300 text-black p-1 ml-5 font-bold rounded-md px-3 lg:px-7"
                  onClick={() => handleClick(data)}
                >
                  copy
                </button>
              </div>
              <div className="mt-5 flex ml-5  ">
                <div className="font-bold text-xl">Description: </div>
                <div className="text-sm lg:text-xl ml-4">{data.description}</div>
              </div>
              <div className="mt-5  ml-5 flex">
                <div className="font-bold text-xl">Tags: </div>
                <div className="text-sm lg:text-xl ml-4 flex gap-x-2 flex-wrap">
                  {data.tags.map((tag, index) => {
                    return (
                      <div key={index} className="">
                        <div className="bg-blue-300 rounded-md lg:px-2 lg:py-1 px-1 py-1">
                          {tag}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="mt-5 flex ml-5 mb-4 ">
                <div className="font-bold text-xl">Type : </div>
                <div className="text-sm lg:text-xl ml-4 bg-white rounded-md px-1 py-1">
                  {data.type}
                </div>
              </div>
               <Entryfacilities data={data} getEntries={getEntries} />
            </div>)
          ))}
        </div>
        
      </div>):Entrytype ===  "searchEntry" ?(<div>

        <SearchEntries getEntries={getEntries} handleClick={handleClick}/>
      </div>)
      :(<div></div>)}
    </div>
  );
};

export default Entries;
