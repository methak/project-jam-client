import React, { useContext, useEffect} from "react";
import { Link } from 'react-router-dom'

import { useClient } from "../../client";
import Context from "../../context";


const StoreList = (props) => {
    const GET_STORES_QUERY = `
  {
    getStores {
      _id
      createdAt
      title
      image
      content
      latitude
      longitude
      shopper {
        _id
        name
        email
        picture
      }
      items {
        _id
        name
        quantity
        isBought
        createdAt
        shopper {
          _id
          name
          picture
        }
      }
    }
  }
`;
    const client = useClient();
    const { state, dispatch } = useContext(Context);

    useEffect(() => {
        getStores();
    }, []);

    const getStores = async () => {
        const { getStores } = await client.request(GET_STORES_QUERY);
        //console.log(getStores);
        dispatch({
            type: "GET_STORES",
            payload: getStores
        });
    };
    const handleClick = (store) => {
        console.log("Clicked !!!");
        dispatch({
            type: "SET_STORE",
            payload: store
          });
      }

    return (
        <>
            <h3>Your Store List</h3>
            {state.stores.map(store => (
                <div key={store._id} onClick={() => { handleClick(store) }} >
                    <li >{store.title} {store.content}
                        <Link to={`/${store._id}`}>  ::: </Link>
                    </li>
                
                </div>
            ))}
        </>
    )
}
export default StoreList