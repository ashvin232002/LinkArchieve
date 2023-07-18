import React from "react";
import { useState } from "react";
import { AiOutlineLink } from "react-icons/ai";
import { AiFillFileText } from "react-icons/ai";
import { AiFillTag } from "react-icons/ai";
import { AiOutlineBook } from "react-icons/ai";
import { FcCheckmark } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import  {createEntry}  from "../../services/operations/APIEntry"

const CreateLink = () => {
  const  dispatch =  useDispatch();
  const navigate  =  useNavigate();
  const { token } = useSelector((state) => state.auth);


  const [formData, setFormData] = useState({
    title: "",
    link: "",
    description: "",
    type: "",
  });

  const [tags, setTags] = useState([]);
  const [tagValue, setTagValue] = useState("");
  function changeHandler(event) {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }

  const addTags = (e) => {
    if (e.keyCode === 13 && tagValue && tags.length <= 5) {
      setTags([...tags, tagValue]);
      console.log(tags);
      setTagValue("");
    }
  };

  const removeTag = (val) => {
    let remainTags = tags.filter((t) => t !== val);
    setTags(remainTags);
  };

  function submitHandler(event){
    event.preventDefault();
    const realData  =  {
      ...formData,
       tags
    }

    console.log("BEFORE CALLING THE API",realData);
    dispatch(createEntry(token,realData.title,realData.link,realData.description,realData.tags,realData.type,navigate));
  }
  return (
    <div className="min-h-screen bg-gray-300 py-6 flex flex-col  sm:py-12 ">
      <div className=" w-[100%] lg:w-[50%] bg-white mx-auto  h-[700px] rounded-lg flex flex-col lg:max-w-maxContent mb-10">
        <h1 className="justify-center items-center mx-auto  bg-blue-400 w-full text-center py-4 text-xl lg:text-3xl">
          {" "}
          Create A Entry
        </h1>
        <div >
          <div className="flex flex-col ">
            <label
              htmlFor="title"
              className="text-gray-800 mt-5 text-left font-2xl px-11 "
            >
              Enter The Title <span className="font-bold  text-red-500">*</span>
            </label>
            <div className="flex">
              <div className="mt-3 px-2">
                <AiOutlineBook size={25} />
              </div>
              <input
                type="text"
                required
                name="title"
                value={formData.title}
                onChange={changeHandler}
                placeholder=" Enter The Title"
                className=" mt-1 py-2 border-2 border-black w-[80%] rounded-md bg-gray-100 px-3"
                
              />
            </div>
          </div>

          <div className="flex flex-col ">
            <label
              htmlFor="Link"
              className="text-gray-800 mt-5 text-left font-2xl px-11 "
            >
              Enter The Link <span className="font-bold  text-red-500">*</span>
            </label>
            <div className="flex">
              <div className="mt-3 px-2">
                <AiOutlineLink size={25} />
              </div>
              <input
                type="url"
                required
                name="link"
                value={formData.link}
                onChange={changeHandler}
                placeholder=" Enter The Link"
                className=" mt-1 py-2 border-2 border-black w-[80%] rounded-md bg-gray-100 px-3"
              />
            </div>
          </div>
          <div className="flex flex-col ">
            <label
              htmlFor="Description"
              className="text-gray-800 mt-5 text-left font-2xl px-11 "
            >
              Enter The Description{" "}
              <span className="font-bold  text-red-500">*</span>
            </label>
            <div className="flex">
              <div className="mt-3 px-2">
                <AiFillFileText size={25} />
              </div>
              <input
                type="text"
                required
                name="description"
                value={formData.description}
                onChange={changeHandler}
                placeholder=" Enter The Description"
                className=" mt-1 py-2 border-2 border-black w-[80%] rounded-md bg-gray-100 px-3"
              />
            </div>
          </div>

          <div className="flex flex-col ">
            <label
              htmlFor="Tags"
              className="text-gray-800 mt-5 text-left font-2xl px-11 "
            >
              Create The tag<span className="font-bold  text-red-500">*</span>
            </label>
            <div className="flex flex-col ">
              <div className=" flex flex-row">
                {" "}
                <div className="mt-3 px-2">
                  <AiFillTag size={25} />
                </div>
                {/* //<div className="flex"> */}
                <input
                  className="border-2 border-black mt-1 py-2 rounded-md w-[80%] px-4"
                  type="text"
                  placeholder="press enter to add tags (Add at max 5 tags)"
                  onChange={(e) => setTagValue(e.target.value)}
                  onKeyDown={addTags}
                  value={tagValue}
                />
              </div>
              <div className="flex flex-row gap-x-2 px-9 flex-wrap">
                {tags.map((item, index) => {
                  return (
                    <div className="flex gap-x-2" key={index}>
                      <div className="bg-blue-400 p-1 mt-2 rounded-md  lg:p-2 font-bold text-white border-2 border-black ">
                        {item}
                        <span
                          className="ml-1 lg:ml-2 font-normal text-black cursor-pointer "
                          onClick={() => removeTag(item)}
                        >
                          X
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
              {/* </div> */}
            </div>
          </div>

          <fieldset className="mt-3">
            <div className="flex ">
              <legend className="text-gray-800  text-left font-2xl px-11 ">
                Select A Type <span className="font-bold  text-red-500">*</span>
              </legend>
            </div>
            <div className="flex gap-x-3 ">
              <div className="px-1">
                <FcCheckmark size={25} />
              </div>
              <div className="font-bold text-xl ml-0">
                <input
                  type="radio"
                  id="type"
                  name="type"
                  value="Video"
                  onChange={changeHandler}
                  
                />
              
                <label htmlFor="type" className="ml-1">
                  Video
                </label>
                <input
                  type="radio"
                  id="type"
                  name="type"
                  value="Article"
                  onChange={changeHandler}
                  className="ml-3"
                />
                <label htmlFor="type" className="ml-1">Article</label>
                <input
                  type="radio"
                  id="type"
                  name="type"
                  value="Other"
                  onChange={changeHandler}
                  className="ml-3"
                />
                <label htmlFor="type" className="ml-1">Other</label>
              </div>
            </div>
          </fieldset>

           <div className="flex gap-x-5 mx-auto mt-5">
           <button onClick={submitHandler} className="bg-blue-400 mt-3 px-7 py-2 rounded-md ml-9 font-bold">
             Submit
           </button>
           <button onClick={(e)=>{navigate("/entries")}} className="bg-blue-400 mt-3 px-7 py-2 rounded-md ml-9 font-bold">
              My Entries
           </button>
           </div>
        </div>

      </div>
    </div>
  );
};

export default CreateLink;
