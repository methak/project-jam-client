import React, { useState, useContext } from 'react'
import Context from '../../context';
import { useClient } from '../../client' 
import { Link } from 'react-router-dom'
import axios from "axios";

import Header from '../Header'
import { UPDATE_ITEM_MUTATION, UPDATE_STORE_MUTATION } from '../../graphql'

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import StorefrontIcon from '@mui/icons-material/Storefront';
import ListAltIcon from '@mui/icons-material/ListAlt';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import { lightGreen } from '@mui/material/colors';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';

function ShoppingDetail() {
  const { state, dispatch } = useContext(Context);
  const [image, setImage] = useState("");
  const store = state.currentStore
  const client = useClient();
  const Input = styled('input')({
    display: 'none',
  });

  const handleUpdate = async (item, num) => {
    const variables = { storeId: store._id, itemId: item._id, quantity: num, isBought: !item.isBought };
    const { updateItem } = await client.request(
      UPDATE_ITEM_MUTATION,
      variables
    );
    console.log(updateItem);
    dispatch({ type: "MODIFY_ITEM", payload: updateItem });

  };

  const handleImageUpload = async () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "jamlist");
    data.append("cloud_name", "projectjam");
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/projectjam/image/upload",
      data
    ); 
    return res.data.url;
  };

  const handleSubmit = async event => {
    try {
      event.preventDefault();
      // setSubmitting(true);
      const url = await handleImageUpload();
      const variables = { storeId: store._id ,image: url};
      const { updateStore } = await client.request(
        UPDATE_STORE_MUTATION,
        variables
      );
      console.log(updateStore);
      dispatch({ type: "MODIFY_ITEM", payload: updateStore });;
    } catch (err) {
      // setSubmitting(false);
      console.error("Error upload image", err);
    }
  };
    return (
        <>
        <Header />
        <Box sx={{ flexGrow: 1, bgcolor: '#faf0e7', height: 800, }}>
          <Grid container spacing={2} sx={{justifyContent: 'center'}}>
            <Grid item xs={4} sx={{ textAlign: 'center', mx: 4 }} >
              <h2>Store Detail</h2>
              <Stack direction="row" spacing={1} sx={{ justifyContent: 'center', mb: 1 }}>
                <StorefrontIcon />
                <h3>{store.title}</h3>
              </Stack>
              {/* <h5>{store.content}</h5> */}

              <List component="nav" dense='true' sx={{ width: '100%', minWidth: 300, bgcolor: 'background.paper', borderRadius: 1 }} >
                {store.items && store.items.map(item => (
                  <>
                    <ListItem
                      secondaryAction={
                        <IconButton edge="end" aria-label="delete" onClick={() => { handleUpdate(item, 0) }}>
                          {item.isBought ?
                            <CheckBoxIcon sx={{ color: lightGreen[500] }} /> : <CheckBoxIcon />}
                        </IconButton>
                      }
                    >
                      <ListItemButton>
                        <ListItemText >
                          <div key={item._id}> {item.name} [ {item.quantity} ] </div>
                        </ListItemText>
                      </ListItemButton>
                    </ListItem >
                    <Divider />
                  </>
                ))}
              <Stack direction="row" spacing={1} sx={{ justifyContent: 'center', alignItems: 'center' }}>  
                <Link to={`/${store._id}`} style={{ textDecoration: 'none' }}>
                  <Button sx={{ mt: 2 }} variant="outlined" startIcon={<ListAltIcon />}>Edit List</Button>
                </Link>
                <label htmlFor="icon-button-file">
                  <Input accept="image/*" id="icon-button-file" type="file" onChange={e => setImage(e.target.files[0])} />
                  <IconButton color="primary" aria-label="upload picture" component="span" sx={{ pt:3, pl:2}}>
                    <PhotoCamera />
                  </IconButton>
                </label>
                <label htmlFor="icon-button-file">
                  <IconButton color="primary" aria-label="upload picture" component="span" sx={{ pt:3}} onClick={handleSubmit}>
                    <CloudUploadIcon />
                  </IconButton>
                </label>
              </Stack >
              </List>
            </Grid>
            {store.image ?
            <Grid item xs={4} sx={{ textAlign: 'center', mx: 4 }} >
                <h2>Receipt</h2>
                <Box sx={{ maxWidth: 400, border: '1px dashed grey', overflow: 'auto' }}>
                <img src= {store.image} alt="Store Receipt" style={{width:'400px', height:'600px' }}/>
                </Box>
            </Grid>
            :<></>}
          </Grid>
        </Box>
        </>
    )
}

export default ShoppingDetail
