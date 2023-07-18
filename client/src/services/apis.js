const  BASE_URL =  process.env.REACT_APP_BASE_URL    //http://4000/api/v1

export const  endpoints  =   {
    SENDOTP_API : BASE_URL + "/auth/LinkStore/sendotp",
    SIGNUP_API : BASE_URL + "/auth/LinkStore/signup",
    LOGIN_API : BASE_URL  + "/auth/LinkStore/login",
    RESETPASSTOKEN_API : BASE_URL + "/auth/LinkStore/reset-password-token",
    RESETPASSWORD_API : BASE_URL + "/auth/LinkStore/reset-password",
}


export const  entryEndPoints =  {
    CREATE_ENTRY: BASE_URL + "/Entry/addNewEntry",
    // DELETE_ENTRY:BASE_URL + "",
    // UPDATE_ENTRY:BASE_URL + "",
    GET_ALL_ENTRIES:BASE_URL + "/Entry/getAllEntries",
    /* STAR_ENTRY:BASE_URL + "/Entry/:id/starEntry",*/
    // MARK_AS_VIEWED_ENTRY:BASE_URL + "",
}