import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

import Context from '../../context';
import Header from '../Header'

import { useClient } from '../../client' 
import { DELETE_ITEM_MUTATION, UPDATE_ITEM_MUTATION } from '../../graphql'
import Items from '../Item/Items';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Stack from '@mui/material/Stack';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import StorefrontIcon from '@mui/icons-material/Storefront';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

function StoreDetail() {
    const { state, dispatch } = useContext(Context);
    const client = useClient();
    const store = state.currentStore
    
    const handleDelete = async (item) => {
        const variables = { storeId: store._id, itemId: item._id };
        const { deleteItem } = await client.request(
            DELETE_ITEM_MUTATION,
            variables
        );
        console.log(deleteItem);
        dispatch({ type: "MODIFY_ITEM", payload: deleteItem });
        
    };
  const handleUpdate = async (item, num) => {
    console.log(item.quantity,"  ",num);
    if (item.quantity > 0 || num >= 0) {
      const variables = { storeId: store._id, itemId: item._id, quantity: num, isBought: !item.isBought };
      const { updateItem } = await client.request(
        UPDATE_ITEM_MUTATION,
        variables
      );
      console.log(updateItem);
      dispatch({ type: "MODIFY_ITEM", payload: updateItem });
    } else if (item.quantity <1 && num <0) 
    {
      //console.log("Ask if quantity 0 to be DELETE");
      handleDelete(item)
    }
  };

    return (
        <>
        <Header />
        <Box sx={{ flexGrow: 1, bgcolor: '#faf0e7', height: 800 }}>
        <Grid container spacing={2}>
            <Grid item xs={4} sx={{ textAlign: 'center', mx: 4 }} >
              <h2>Store Detail</h2>
              <Stack direction="row" spacing={1} sx={{ justifyContent: 'center', mb: 1 }}>
              <StorefrontIcon /> 
                <h3>{store.title}</h3>
              </Stack>
              {/* <h5>{store.content}</h5> */}
             
              <List component="nav" dense='true' sx={{ width: '100%', minWidth: 300, bgcolor: 'background.paper', borderRadius: 1 }} >
                {store.items && store.items.map(item => (
                  <div>
                    <ListItem secondaryAction={
                      <IconButton edge="end" aria-label="delete" onClick={() => { handleDelete(item) }}>
                        <HighlightOffIcon />
                      </IconButton>
                    }>
                      <ListItemText >
                        <div  key={item._id}>
                          {item.name} [ {item.quantity} ]

                          <IconButton edge="end" aria-label="delete" onClick={() => { handleUpdate(item, 1) }}>
                            <AddCircleIcon />
                          </IconButton>
                          <IconButton edge="end" aria-label="delete" onClick={() => { handleUpdate(item, -1) }}>
                            <RemoveCircleIcon />
                          </IconButton>
                        </div>
                      </ListItemText>
                    </ListItem >
                  </div>
                ))}

                <Link to={`/${store._id}/shopping`} style={{ textDecoration: 'none' }}>
                <Button variant="outlined" startIcon={<ShoppingCartIcon />}>Go Shopping</Button>                
                </Link>
              </List>
            </Grid>
            <Grid item xs={6} sx={{ textAlign: 'center'}} >
                <Items />
            </Grid>
            </Grid>
        </Box>
        </>
    )
}

export default StoreDetail
