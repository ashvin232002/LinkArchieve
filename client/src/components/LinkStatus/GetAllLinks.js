import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllEntries } from "../../services/operations/APIEntry";
import { toast } from "react-hot-toast";
import { useRef } from "react";
import SearchEntries from "./SearchEntries";

import Entries from "./Entries";


const GetAllLinks = () => {
  const linkRef = useRef(null);
  const { token } = useSelector((state) => state.auth);
  const {entrie}  = useSelector((state)=>state.entrie)


  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const [Entrytype, setEntryType] = useState("Entries");
  const [copyText, setCopyText] = useState("");
  const [starredEntries,setisStarredEntries] =  useState([]);

  // const [response, setResponse] = useState([]);
  const  getEntries = async () => {
    try {
      await dispatch(getAllEntries(token));
      console.log("Now I am Printing tHe entrie after function call",entrie)
      
    } catch (error) {
      console.log("Unable Fetch Entries");
    }
  };

  useEffect(() => {
    getEntries();
  }, []);

  const tabData = [
    {
      id: 1,
      tabName: "Entries",
      type: "Entries",
    },
    {
      id: 2,
      tabName: "Starred",
      type: "Starred",
    },
    {
      id: 3,
      tabName: "markedAsViewed",
      type: "markedAsViewed",
    },
    {
      id:4,
      tabName:"Search Entry",
      type: "searchEntry"
    }
  ];

  // const [count,setCount]=useState(0);
  
  return (
    <div>
      <div
        style={{
          boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
        }}
        className="flex bg-gray-200 text-black p-1 gap-x-1 my-6 rounded-full max-w-max items-center justify-center mx-auto"
      >
        {tabData.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setEntryType(tab.type)}
            className={`${
              Entrytype === tab.type
                ? "bg-gray-500 text-richblack-5"
                : "bg-transparent text-richblack-200"
            } py-2 px-5 rounded-full transition-all duration-200`}
          >
            {tab?.tabName}
          </button>
        ))}
      </div>

      <div>
        {entrie === null ? (
          <div className="font-3xl text-black items-center">
            Loading ........
          </div>
        ) : (
          <div>
            <Entries Entrytype={Entrytype}  copyText={copyText} setCopyText={setCopyText} getEntries={getEntries} starredEntries={starredEntries} />
            
          </div>
        )}
      </div>
    </div>
  );
};

export default GetAllLinks;



