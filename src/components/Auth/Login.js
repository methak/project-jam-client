import React, { useContext } from "react";
import { GraphQLClient } from 'graphql-request'

import { GoogleLogin } from 'react-google-login'
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { BASE_URL } from "../../client";
import Context from "../../context";

const ME_QUERY = `
{
  me {
    _id
    name
    email
    picture
  }
}
`

const Login = ({ classes }) => {
  const { dispatch } = useContext(Context)

  const onSuccess = async googleUser => {
    try {
      const idToken = googleUser.getAuthResponse().id_token
      const client = new GraphQLClient(BASE_URL, {
        headers: { authorization: idToken }
      })
      const data = await client.request(ME_QUERY)
      console.log({ data });
      dispatch({ type: "LOGIN_USER", payload: data.me })
      dispatch({ type: "IS_LOGGED_IN", payload: googleUser.isSignedIn() })
    } 
    catch (err) {
      onFailure(err);
    }
  }
  const onFailure = err => {
    console.error("Error Login", err)
    dispatch({ type: "IS_LOGGED_IN", payload: false });

  }
  return (
    <>
      <CssBaseline />
      <Container maxWidth="m">
        <Box sx={{ display: 'flex', bgcolor: '#faf0e7', height: '100vh',my: 2, flexDirection: 'column' ,alignItems: 'center', justifyContent: 'center' }} >
          <Box sx={{ display: 'flex', bgcolor: '#ffffff', height: '50%', p: 5, pt:14, boxShadow: 1, borderRadius: 2 ,flexDirection: 'column' ,alignItems: 'center' }}>
          <Box sx={{ pb:2 }}><h2>Welcome to Project JAM</h2></Box>
          
          <Box> 
          <GoogleLogin
            clientId="26159646015-300gism63ra07n09qteel35pu126vbif.apps.googleusercontent.com"
            onSuccess={onSuccess}
            onFailure={onFailure}
            //isSignedIn={true}
            theme= 'dark'
          /></Box>
          
         </Box>
        </Box>
      </Container>
    </>
  )
};



export default Login;
