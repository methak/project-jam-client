import React, { useState, useContext } from "react";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import Context from "../../context";
import { useClient } from "../../client"
import { CREATE_STORE_MUTATION } from '../../graphql'

const CreateStore = () => {
    const client = useClient();
    const { state, dispatch } = useContext(Context);
    const [title, setTitle] = useState("");
    //const [image, setImage] = useState("");
    const [content, setContent] = useState("");
    //const [submitting, setSubmitting] = useState(false);

    const handleDeleteDraft = () => {
        console.log("Clear Input");
        setTitle("");
        //setImage("");
        setContent("");
        dispatch({ type: "DELETE_DRAFT" });
    };

    const handleSubmit = async event => {
        try {
          event.preventDefault();
          //setSubmitting(true);
          const url = ""
          //const url = await handleImageUpload();
          //const { latitude, longitude } = null;
          const variables = { title, image: url, content, latitude: 0, longitude: 0 };
          const { createStore } = await client.request(CREATE_STORE_MUTATION, variables);
    
          dispatch({ type: "CREATE_STORE", payload: createStore });
          handleDeleteDraft();
        } catch (err) {
          //setSubmitting(false);
          console.error("Error creating store", err);
        }
    };

      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', }}>
          <Box component="form" onSubmit={handleSubmit}
            sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' }, p: 4, mt: 2, bgcolor: 'white', borderRadius: 1}}
            noValidate
            autoComplete="off">
            <div>
              <TextField name="title" id="title" label="Store Name" onChange={e => setTitle(e.target.value)} />
            </div>
            <div>
              <TextField name="content" id="content" label="Address" onChange={e => setContent(e.target.value)} />
            </div>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', m:1}}>
              <Button variant="outlined" type="submit">Create</Button>
            </Box>
          </Box>
        </Box>
      )
}
export default CreateStore