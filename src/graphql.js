export const GET_STORES_QUERY = `
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

export const CREATE_STORE_MUTATION = `
  mutation($title: String, $image: String, $content: String, $latitude: Float, $longitude: Float) {
    createStore(input: {
      title: $title,
      image: $image,
      content: $content,
      latitude: $latitude,
      longitude: $longitude
    }) {
      _id
      createdAt
      title
      image
      content
      longitude
      latitude
      shopper {
        _id
        name
        email
        picture
      }
    }
  }
`;

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
export const UPDATE_STORE_MUTATION = `
mutation($storeId: ID! $image: String) {
  updateStore(storeId: $storeId, image: $image) {
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