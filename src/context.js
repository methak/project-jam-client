import { createContext } from "react";

const Context = createContext({
    currentUser: null,
    isAuth: false,
    draft: null,
    stores: [],
    currentStore: null
})

export default Context