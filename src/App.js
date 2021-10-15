import React from "react";

import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import Header from "./components/Header";
import StoreIndex from "./components/Store/StoreIndex";
import Map from "./components/Map";

const App = () => {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="m">
          <Header />
          
          <Box sx={{ display: 'grid', gap: 4, gridTemplateColumns: 'repeat(2, 1fr)', }}>
            <StoreIndex />
            <Map />
          </Box>
        
      </Container>
    </>
    )
};

export default App;
