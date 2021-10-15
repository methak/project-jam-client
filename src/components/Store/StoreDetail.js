import React, { useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'

import Context from '../../context';
import Header from '../Header'

import { useClient } from '../../client' 
import { CREATE_ITEM_MUTATION, DELETE_ITEM_MUTATION, UPDATE_ITEM_MUTATION} from '../../graphql'

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Button, ButtonGroup} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';


function StoreDetail() {

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

    useEffect(() => {
        // getStoreDetail(storeId)
    }, []);

    return (
        <>
        <Header />
        <Box sx={{ flexGrow: 1, bgcolor: '#faf0e7', height: 800 }}>
        <Grid container spacing={2}>
            <Grid item xs={4} sx={{ textAlign: 'center', mx: 4}} >
                <h2>Store Detail</h2>
                <h3>{store.title}</h3>   
                {/* <h5>{store.content}</h5> 
                <h4>your cart</h4>*/}

                <List component="nav" dense='true' sx={{ width: '100%', minWidth: 300, bgcolor: 'background.paper', }} >
                {store.items && store.items.map(item => (
                  <div>
                    <ListItem secondaryAction={
                    <IconButton edge="end" aria-label="delete" onClick={() => { handleDelete(item) }}>
                      <HighlightOffIcon />
                    </IconButton>
                  }>
                  <ListItemText >
                        <div className={`itemContainer ${item.isBought ? 'is-bought' : ''}`} key={item._id}
                          onDoubleClick={() => { handleUpdate(item, 0) }}>
                          {item.name} [ {item.quantity} ]
                          {/*                     
                    <IconButton size='small' onClick={() => { handleUpdate(item, 1) }}><AddCircleIcon /></IconButton>
                    <IconButton size='small' onClick={() => { handleUpdate(item, -1) }}><RemoveCircleIcon /></IconButton> 
                    */}

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
                
                <Link to={`/${store._id}/shopping`}>  ::: </Link>
                </List>
            </Grid>
            <Grid item xs={6} sx={{ textAlign: 'center'}} >
                <h2>New Item Form</h2>
                {itemSeed.map((seed, i) => (
                <div><button onClick={() => { handleClick(seed) }} key={i}>{seed}</button></div>
                
                ))}
            </Grid>
            </Grid>
        </Box>
        </>
    )
}

export default StoreDetail
