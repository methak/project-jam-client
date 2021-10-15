import React, { useContext } from "react";
import { GoogleLogout } from "react-google-login";

import Button from '@mui/material/Button';
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
                <Button color="inherit" onClick={ onClick }>Sign out</Button>
                
            ) }
        />
    )

}

export default Signout