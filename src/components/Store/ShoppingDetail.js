import React, { useEffect, useContext } from 'react'

import Context from '../../context';
import { useClient } from '../../client' 
import Header from '../Header'


function ShoppingDetail() {
    const UPDATE_ITEM_MUTATION = `
  mutation($storeId: ID! $itemId: ID!, $quantity: Int!, $isBought: Boolean!) {
    updateItem(storeId: $storeId, itemId: $itemId,quantity: $quantity, isBought: $isBought) {
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
    const store = state.currentStore
    const client = useClient();

    const handleUpdate = async (item, num) => {
        console.log(item.quantity,"  ",num);
        
          const variables = { storeId: store._id, itemId: item._id, quantity: num, isBought: !item.isBought };
          const { updateItem } = await client.request(
            UPDATE_ITEM_MUTATION,
            variables
          );
          console.log(updateItem);
          dispatch({ type: "MODIFY_ITEM", payload: updateItem });
        
      };

    return (
        <>
        <Header />
        <div className="wrapper">
            
            <div className="container">
                
                <h2>Store Detail</h2>
                <p>{store.title}   {store.content}</p>
            
                <h4>your cart</h4>
                {store.items && store.items.map(item => (
                  <div className={`itemContainer ${item.isBought ? 'is-bought' : ''}`} key={item._id}
                    onDoubleClick={() => { handleUpdate(item, 0) }}>
                    {item.name} [ {item.quantity} ]
                    
                  </div>
                
                ))}
            </div>
            
        </div>
        </>
    )
}

export default ShoppingDetail
