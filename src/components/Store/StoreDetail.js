import React, { useEffect, useContext } from 'react'

import Context from '../../context';
import Header from '../Header'
import './store.css'
import { useClient } from '../../client' 
//import { useClient } from "../../client";

function StoreDetail() {
const CREATE_ITEM_MUTATION = `
  mutation($storeId: ID! $name: String!) {
    createItem(storeId: $storeId, name: $name) {
      _id
      createdAt
      title
      content
      image
      latitude
      longitude
      shopper {
        _id
        name
      }
      items {
        name createdAt
        createdAt
        shopper {
          name
          picture
        }
      }
    }
  }
`;
    const { state, dispatch } = useContext(Context);
    const client = useClient();

    const store = state.currentStore

    //Test seedind item data
    const itemSeed = ["Mango","kiwi","Apple","Banana","Orange"]

    const handleClick = async (seed) => {

        const variables = { storeId: store._id, name: seed };
        const { createItem } = await client.request(
            CREATE_ITEM_MUTATION,
            variables
        );
        dispatch({ type: "CREATE_ITEM", payload: createItem });
        //
    };

    useEffect(() => {
        // getStoreDetail(storeId)
    }, []);

    return (
        <>
        <Header />
        <div className="wrapper">
            
            <div className="container">
                
                <h2>Store Detail</h2>
                <p>{store.title}   {store.content}</p>
            
                <h4>your cart</h4>
                {store.items.map(item => (
                <li>
                    {item.name}
                </li>
                
                ))}
            </div>
            <div className="container">
                <h2>New Item Form</h2>
                {itemSeed.map(seed => (
                <div><button onClick={() => { handleClick(seed) }}>{seed}</button></div>
                
                ))}
            </div>
        </div>
        </>
    )
}

export default StoreDetail
