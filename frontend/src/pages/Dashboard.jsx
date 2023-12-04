import React from 'react'
import Sidenav from '../components/Sidenav'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Navbar from '../components/Navbar';


const Dashboard = () => {
  return (
    <>
    <Navbar/>
    <Box sx={{ height: 30 }}/>
        <Box sx={{ display: 'flex' }}>
        <Sidenav />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <h2>Dahboard</h2>
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          
        </Typography>
      </Box>
        </Box>
    </>
    
  )
}

export default Dashboard