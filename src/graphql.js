export const CREATE_ITEM_MUTATION = `
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

export const DELETE_ITEM_MUTATION = `
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

export const UPDATE_ITEM_MUTATION = `
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