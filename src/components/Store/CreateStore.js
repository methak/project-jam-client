import React, { useState, useContext } from "react";

import Context from "../../context";
import { useClient } from "../../client"


const CreateStore = () => {
    const CREATE_STORE_MUTATION = `
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
          client.request(CREATE_STORE_MUTATION, variables);
    
          // Now that we have GraphQL subscriptions, we don't need the following
          // const { createPin } = await client.request(
          //   CREATE_PIN_MUTATION,
          //   variables
          // );
          // dispatch({ type: "CREATE_PIN", payload: createPin });
    
          handleDeleteDraft();
        } catch (err) {
          //setSubmitting(false);
          console.error("Error creating store", err);
        }
    };

      return (
          <>
            <form onSubmit={handleSubmit}>
            <p>
              <label htmlFor="title">Title</label>
              <input name="title" id="title" value={title} onChange={e => setTitle(e.target.value)} />
            </p>
            <p>
              <label htmlFor="content">Content</label>
              <input name="content" id="content" value={content} onChange={e => setContent(e.target.value)} />
            </p>
            
              <input type="submit" value="Create store" onClick={handleSubmit}/>
            
          </form>
          </>
      )
}
export default CreateStore