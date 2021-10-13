import { useState, useEffect } from "react";
import { GraphQLClient } from "graphql-request";

export const BASE_URL = "http://localhost:4000/qraphql"

export const useClient = () => {
  const [idToken, setIdtoken] = useState("");

  // to get the token id from the window, we have to WAIT thus the useEffect here
  useEffect(() => {
    const token = window.gapi.auth2
      .getAuthInstance()
      .currentUser.get()
      .getAuthResponse().id_token;

    setIdtoken(token);
  }, []);

  return new GraphQLClient(BASE_URL, {
    headers: {
      authorization: idToken
    }
  });
};
