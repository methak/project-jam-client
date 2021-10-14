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
        _id  
        name
        quantity
        isBought
        createdAt
        
      }
    }
  }
`;
const DELETE_ITEM_MUTATION = `
  mutation($storeId: ID! $itemId: ID!) {
    deleteItem(storeId: $storeId, itemId: $itemId) {
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
        _id  
        name
        quantity
        isBought
        createdAt
        
      }
    }
  }
`;
const UPDATE_ITEM_MUTATION = `
  mutation($storeId: ID! $itemId: ID!, $quantity: Int!) {
    updateItem(storeId: $storeId, itemId: $itemId,quantity: $quantity) {
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
        _id  
        name
        quantity
        isBought
        createdAt
        
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
        dispatch({ type: "MODIFY_ITEM", payload: createItem });
        
    };
    const handleDelete = async (item) => {
        const variables = { storeId: store._id, itemId: item._id };
        const { deleteItem } = await client.request(
            DELETE_ITEM_MUTATION,
            variables
        );
        console.log(deleteItem);
        dispatch({ type: "MODIFY_ITEM", payload: deleteItem });
        
    };
    const handleUpdate = async (item,num) => {
        const variables = { storeId: store._id, itemId: item._id, quantity: num };
        const { updateItem } = await client.request(
            UPDATE_ITEM_MUTATION,
            variables
        );
        console.log(updateItem);
        dispatch({ type: "MODIFY_ITEM", payload: updateItem });
        
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
                {store.items && store.items.map(item => (
                <div key={item._id}>
                    {item.name} [ {item.quantity} ]
                    <button onClick={() => { handleUpdate(item,-1) }}>-</button>
                    <button onClick={() => { handleUpdate(item,1) }}>+</button>&nbsp;&nbsp;
                    <button onClick={() => { handleDelete(item) }}>x</button>
                </div>
                
                ))}
            </div>
            <div className="container">
                <h2>New Item Form</h2>
                {itemSeed.map((seed, i) => (
                <div><button onClick={() => { handleClick(seed) }} key={i}>{seed}</button></div>
                
                ))}
            </div>
        </div>
        </>
    )
}

export default StoreDetail
