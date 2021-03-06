import React, { useContext } from "react";

import Context from "../context";
import Signout from "../components/Auth/Signout"
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import { lightGreen } from '@mui/material/colors';


const Header = () => {
    const { state } = useContext(Context)
    const { currentUser } = state

    return (
        <Box sx={{ width :'100%', flexGrow: 1 }}>
            <AppBar position="static" style={{ background: '#2E3B55' }}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    { currentUser.picture ?
                    <Avatar alt= {currentUser.name} src={currentUser.picture}/> :
                    <Avatar alt= {currentUser.name} sx={{ bgcolor: lightGreen[500] }}> {currentUser.name.charAt(0)} </Avatar>   }
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, pl:2 }}>
                        Hello {currentUser.name}
                    </Typography>
                    
                    <Signout />
                </Toolbar>
            </AppBar>
        </Box>
  );

}

export default Header