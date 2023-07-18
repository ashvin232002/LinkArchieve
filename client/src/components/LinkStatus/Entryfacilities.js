import React, { useEffect } from "react";
import { AiFillDelete } from "react-icons/ai";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";
import { RiStarFill } from "react-icons/ri";
import { TbStarOff } from "react-icons/tb";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
// import  {deleteCurrEntry} from "../../services/operations/APIEntry"
import {
  markEntryasStarred,
  markCurrEntryAsViewd,
} from "../../services/operations/APIEntry";
import { setEntriesData } from "../../slices/EntrieSlice";
import  {deleteCurrEntry} from "../../services/operations/APIEntry"
import { getAllEntries } from "../../services/operations/APIEntry";
import  ConfirmationModal from "../../components/common/confirmation_modal"


export const Entryfacilities = ({ data ,getEntries}) => {
  // const [values, setValues] = useState(data);
  const [confirmationModal, setConfirmationModal] = useState(null)
  const { token } = useSelector((state) => state.auth);
  const {entrie} = useSelector((state)=>state.entrie)
  
  const [star, setStar] = useState(data.isStarred);
  const [view, setViewed] = useState(data.isViewed);
  const  dispatch =  useDispatch();

  // useEffect(()=>{
  //    getEntries();
  // },[entrie]);

  async function handleDelete(data) {
    try {
        
        const  response  =  await deleteCurrEntry(token,data._id);
        console.log(response);

        const response2 = await  dispatch(getAllEntries(token));  /// Here calling get ALl Entries Because It can Update in the SetENTRIES dATA 
        // console.log("I am Printing The response 2",response2);
        setConfirmationModal(null);
        toast.success("Entry Deleted SuccessFully......")

    } catch (error) {
       console.log("Error While handle Delete Call",error);
    }
  }

  
  async function handleStar(data){
    try{
      console.log("BEFOre star",data.isStarred);
      const response  =  await markEntryasStarred(token , data._id);//api call
      // console.log("PRINTING THE STAR HANDLER",response);
      const response2 = await  dispatch(getAllEntries(token));
      console.log("After STAR",data.isStarred);
      setStar(!data.isStarred);
      //dispatch(setEntriesData(response));
      setConfirmationModal(null);
      // toast.success("entry Marked as Starred SuccessFully");
      toast.success("Tak Done SuccessFully")
    }
    catch(error){
      console.log("Error While handling the Staring ",error);
    }
  }

  async function handleViewed(data){
    try{
       const response  =  await markCurrEntryAsViewd(token,data._id);
       console.log("Printing The star Handler",response);
       const response2 =  await dispatch(getAllEntries(token));
      //  toast.success("Entry Marked As Viewed SuccessFully");
       setViewed(!data.isViewed);
       setConfirmationModal(null);
       toast.success("Task Done SuccessFully")
    }
    catch(error){
      console.log("Error while handling the Viewing",error);
    }
  }

  
  useEffect(()=>{
    // console.log("GET ENTRIES.....",star);
    getAllEntries();
    
  },[star,view])


  return (
    <div>
      <div className="flex flex-row justify-end gap-x-2 mb-3 cursor-pointer">
        <div className="text-blue-500" onClick={() =>
          setConfirmationModal({
            text1: "Mark a Start This Entry?",
            text2: `This Entry will be marked as a Starred...`,
            btn1Text: `${!data.isStarred ?"MarkEntryAsStarred" : "removeFrom Starred" }`,
            btn2Text: "Cancel",
            btn1Handler: () =>
              handleStar(data),
            btn2Handler: () => setConfirmationModal(null),
          })
        }>
          {!data.isStarred ? <TbStarOff size={25} /> : <RiStarFill size={25} />}
        </div>


        <div className="text-green-500" onClick={() =>
          setConfirmationModal({
            text1: "Mark This Entry As Viewed (completed)?",
            text2: `This Entry will be marked as a Viewed ....`,
            btn1Text: `${!data.isViewed ? "MarkAsViewed": "removeFrom Viewed"}`,
            btn2Text: "Cancel",
            btn1Handler: () =>
                    handleViewed(data),
            btn2Handler: () => setConfirmationModal(null),
          })
        }>
          {!data.isViewed ? <AiFillEyeInvisible size={25} /> : <AiFillEye size={25} />}
        </div>


        <div className=" mr-3 text-red-600"
        onClick={() =>
          setConfirmationModal({
            text1: "Delete This Entry?",
            text2: `This Entry will be permanently Deleted ....`,
            btn1Text: "Delete",
            btn2Text: "Cancel",
            btn1Handler: () =>
              handleDelete(data),
            btn2Handler: () => setConfirmationModal(null),
          })
        }>
          <AiFillDelete size={25} />
        </div>
      </div>
      {confirmationModal ? (
        <ConfirmationModal 
        modalData={confirmationModal} 
        />
      ) : (
        <></>
      )}
    </div>
  );
};
