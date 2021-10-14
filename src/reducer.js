export default function reducer(state, {type, payload}) {
    switch (type) {

        case "LOGIN_USER":
            return { 
                ...state, 
                currentUser: payload 
            }
        case "IS_LOGGED_IN":
            return {
                ...state,
                isAuth: payload
            }
        case "SIGNOUT_USER":
            return {
                ...state,
                isAuth: false,
                currentUser: null
            }
        case "DELETE_DRAFT":
            return {
                ...state,
                draft: null
            };
        case "GET_STORES":
            return {
                ...state,
                stores: payload
            };
        case "SET_STORE":
            return {
                ...state,
                currentStore: payload,
                
            };
        case "CREATE_STORE":
            const newStore = payload;
            const prevStores = state.stores.filter(store => store._id !== newStore._id);
            return {
                ...state,
                stores: [...prevStores, newStore]
            };
        case "MODIFY_ITEM":
            const updatedCurrentStore = payload;
            // find and replace
            const updatedStores = state.stores.map(store =>
                store._id === updatedCurrentStore._id ? updatedCurrentStore : store
            );
            return {
                ...state,
                stores: updatedStores,
                currentStore: updatedCurrentStore
            };
       
    
        default:
            return state
    }
}
