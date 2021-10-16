import React, { useContext, useEffect} from "react";
import { Link } from 'react-router-dom'

import { useClient } from "../../client";
import Context from "../../context";

import Box from '@mui/material/Box';
import { List } from "@mui/material";
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { IconButton } from "@mui/material";
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

import { GET_STORES_QUERY } from '../../graphql'

const StoreList = (props) => {
  const [selectedIndex, setSelectedIndex] = React.useState(99);
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
    const handleListItemClick = (store, index) => {
        console.log("Clicked !!!");
        setSelectedIndex(index);

        dispatch({
            type: "SET_STORE",
            payload: store
          });
      }

    return (
        <>        
        <Box sx={{ display: 'flex', my: 2, flexDirection: 'column', alignItems: 'center',}} >
          <h3>Your Store List</h3>
            <List sx={{ width: '100%', maxWidth: 300, bgcolor: 'background.paper', borderRadius: 1 }} >
            {state.stores.map((store, index) => (
              <Link to={`/${store._id}`} >
                <ListItem onClick={() => handleListItemClick(store, index)}
                  secondaryAction={
                    <IconButton edge="end" aria-label="view">
                      <DragIndicatorIcon />
                    </IconButton>
                  }>
                  <ListItemAvatar>
                    <Avatar>
                      <StorefrontIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={store.title} secondary={store.content} />
                  </ListItem>
                <Divider />
              </Link>
              ))}
            </List>
        </Box>
        </>
    )
}
export default StoreList