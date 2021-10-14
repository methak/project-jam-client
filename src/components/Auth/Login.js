import React, { useContext } from "react";
import { GraphQLClient } from 'graphql-request'

import { GoogleLogin } from 'react-google-login'
import { withStyles } from "@material-ui/core/styles";
// import Typography from "@material-ui/core/Typography";

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
      const client = new GraphQLClient('http://localhost:4000/graphql', {
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
    <div className={classes.root}>
      <GoogleLogin
        clientId="26159646015-300gism63ra07n09qteel35pu126vbif.apps.googleusercontent.com"
        onSuccess={onSuccess}
        onFailure={onFailure}
        //isSignedIn={true}
        theme="dark"
      />
    </div>
  )
};

const styles = {
  root: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center"
  }
};

export default withStyles(styles)(Login);
