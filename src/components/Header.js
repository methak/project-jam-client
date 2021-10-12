import React, { useContext } from "react";

import Context from "../context";
import Signout from "../components/Auth/Signout"

import "../App.css"


const Header = () => {
    const { state } = useContext(Context)
    const { currentUser } = state

    return (
    <div className="App">
        <h2>Welcome {currentUser.name}</h2>

        <Signout />
    </div>
    )
}

export default Header