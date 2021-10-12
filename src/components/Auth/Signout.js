import React, { useContext } from "react";
import { GoogleLogout } from "react-google-login";

import Context from "../../context";

const Signout = () => {
    const { dispatch } = useContext(Context)

    const onSignout =() => {
        dispatch({ type: "SIGNOUT_USER" })
        console.log("User signed out");
    }
    return (
        <GoogleLogout 
            onLogoutSuccess = { onSignout } 
            //buttonText="Signout"
            render= {( { onClick }) => (
                <button onClick={ onClick }>
                    Signout
                </button>
            ) }
        />
    )

}

export default Signout