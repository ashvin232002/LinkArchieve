import React, { useState } from "react";
import { Entryfacilities } from "./Entryfacilities";
import { useSelector } from "react-redux";



const SearchEntries = ({getEntries,handleClick}) => {
  const [query, setQuery] = useState("");
  const {entrie} = useSelector((state)=>state.entrie)
  return (
    <div className=" w-11/12  mx-auto  bg-white  ">
        <div className=" my-10 flex flex-col flex-wrap mb-10">
        <div className="mx-auto flex w-[60%] mb-10">
        <input
          type="text"
          placeholder=" ..................... SEARCH BY THE TITLE ................."
          onChange={(e) => setQuery(e.target.value)}
          className=" p-4 bg-gray-300 rounded-full mt-7  text-black  w-full text-center"
        />
        
        </div>

        <div>
          
            {
            query.length==0 ? 
            (<div className="text-bold text-center items-center font-bold justify-center mx-auto ">Please Enter The Title </div>)
            
            :(query.length >0 && entrie.length===0) ? (<div className="text-bold text-center items-center font-bold justify-center mx-auto "> OOps !!Entry Not Found</div>)
            :(entrie.filter((entrie)=>entrie.title.includes(query)).map((data, index) => (
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
              </div>)))}
        </div> 
        </div>
      </div>
  
  );
};

export default SearchEntries;


