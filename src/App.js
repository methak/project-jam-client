import React from "react";

import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';


import Header from "./components/Header";
import StoreIndex from "./components/Store/StoreIndex";
import Map from "./components/Map";
import MapTest from "./components/MapTest.tsx";
import { Helmet } from "react-helmet"

const App = () => {
  return (
    <>
      
      <CssBaseline />
      <Container maxWidth="m">
      <Helmet>
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAaX3IwmpuHcqtbNPixldjukEr0Vz1bmVg&libraries=places"></script>

      </Helmet>
          <Header />
          
          <Box sx={{ display: 'grid', gap: 4, gridTemplateColumns: 'repeat(2, 1fr)', }}>
            <StoreIndex />
            <MapTest />
          </Box>
        
      </Container>
    </>
    )
};

export default App;
