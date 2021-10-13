import React, { useContext, useEffect} from "react";

import { useClient } from "../../client";
import Context from "../../context";


const StoreList = () => {
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
        text
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

    return (
        <>
            <h3>Your Store List</h3>
            {state.stores.map(store => (
                <li key={store._id}>{store.title} {store.content} </li>
            ))}
        </>
    )
}
export default StoreList