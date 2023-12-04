import React from 'react'
import Sidenav from '../components/Sidenav'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Navbar from '../components/Navbar';


const Settings = () => {
  return (
    <>
    <Navbar/>
    <Box sx={{ height: 30 }}/>
        <Box sx={{ display: 'flex' }}>
        <Sidenav />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <h2>Settings</h2>
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
          enim praesent 
        </Typography>
      </Box>
        </Box>
    </>
    
  )
}

export default Settings