import { Toast, toast } from "react-hot-toast";
import { setLoading, setToken } from "../../slices/authSlice";
import { apiConnecter } from "../apiconnector";
import { entryEndPoints } from "../apis";
import { setEntriesData } from "../../slices/EntrieSlice";
const BASE_URL = process.env.REACT_APP_BASE_URL; //http://4000/api/v1

const { CREATE_ENTRY, GET_ALL_ENTRIES } = entryEndPoints;



export function createEntry(
  token,
  title,
  link,
  description,
  tags,
  type,
  navigate
) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading ...");
    dispatch(setLoading(true));
    try {
      console.log("BEFORE CALLING THE API");
      const response = await apiConnecter(
        "POST",
        CREATE_ENTRY,
        {
          title,
          link,
          description,
          tags,
          type,
        },
        {
          Authorization: `Bearer ${token}`,
        }
      );

      console.log("After calling The API");
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Entry Created Successfully");
      navigate("/entries");
    } catch (error) {
      console.log("ERROR WHILE CALLING THE CREATEENTRY API", error);
      toast.error("Entry Creation Failed");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}



export function getAllEntries(token) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    // let  result = [];

    try {
      console.log("Before calling the api");
      const response = await apiConnecter("GET", GET_ALL_ENTRIES, null, {
        Authorization: `Bearer ${token}`,
      });

      console.log("After calling The Get all Entries API",response);
      const ans = dispatch(setEntriesData(response.data.entries));
      console.log("I am Printing The entries", ans);
      //localStorage.setItem("entrie", JSON.stringify(response.data.entries));

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      // result =  response.data.entries;
    } catch (error) {
      console.log("Error While calling The API", error);
      toast.error("Error while Getting all Entries");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
    // return result;
  };
}



export async  function markEntryasStarred(token, entryId) {
  // return async(dispatch)=>{
    const toastId = toast.loading("Loading...");
    // dispatch(setLoading(true));
    try {
      // console.log("Before Calling The API");
      // console.log("token",token);
      // console.log("entryId",entryId)
      const response = await apiConnecter(
        "PUT",
        BASE_URL + `/Entry/${entryId}/starEntry`,
        null,
        {
          Authorization: `Bearer ${token}`,
        },
        { entryId }
      );

      // console.log("before",setEntriesData);
      //  const ans  = dispatch(setEntriesData(response.data.data));
      //  console.log("DISPATCHED SETENTRIES",ans);
      console.log("After calling The API In starred", response);
      // console.log("helllo after",setEntriesData);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      // result = response.data.data;
    } catch (error) {
      console.log("Error  while calling THE API", error);
      toast.error("Error while marking as starred");
    }
    // dispatch(setLoading(false));
    toast.dismiss(toastId);
    // return result;
  }






export  async function markCurrEntryAsViewd(token, entryId) {

    // return async(dispatch)=>{
  const toastId = toast.loading("Loading...");
  //  dispatch(setLoading(true));
  try {
    // console.log("HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH");
    //    /:id/markEntryAsViewed
    const response = await apiConnecter(
      "PUT",
      BASE_URL + `/Entry/${entryId}/markEntryAsViewed`,
      null,
      {
        Authorization: `Bearer ${token}`,
      },
      { entryId }
    );
    // dispatch(setEntriesData(response.data.data));
    // console.log("RESPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP", response);
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.log("Error While calling The API");
    toast.error("Error While marking as Viewed");
  }
  toast.dismiss(toastId);
  // dispatch(setLoading(false));
}
// }



export async function deleteCurrEntry(token, entryId) {
  const toastId = toast.loading("Loading...");
  try {
    console.log("BEFORE CALLING THE API");
    console.log(token, "token");
    console.log("EntryID", entryId);
    const response = await apiConnecter(
      "DELETE",
      BASE_URL + `/Entry/deleteEntry/${entryId}`,
      null,
      {
        Authorization: `Bearer ${token}`,
      },
      { entryId }
    );

    console.log("After calling The API", response);
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.log("Error While calling API DELETE");
    toast.error("Error while deleting");
  }
  toast.dismiss(toastId);
}


