import React from 'react'
import Sidenav from '../components/Sidenav'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Navbar from '../components/Navbar';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
//import AdsClickIcon from '@mui/icons-material/AdsClick';
//import { Geochart } from '../charts/Geochart';


const Analytics = () => {
  return (
    <>
    <div className='bgcolor' >
    <Navbar/>
    <Box height={70} sx={{paddingTop: 9}}>
      <Box sx={{ display: 'flex' }}>
        <Sidenav />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Grid container spacing={2}>
            <Grid item>
              <Typography variant="h5" component="div" sx={{color:"#ccd1d1"}}> 
              1
              </Typography>
            </Grid>

            <Grid item>
              <Typography variant="h5" component="div" sx={{color:"#ccd1d1"}}> 
              2
              </Typography>
            </Grid>

            <Grid item>
              <Typography variant="h5" component="div" sx={{color:"#ccd1d1"}}> 
              3
              </Typography>
            </Grid>

            <Grid item>
              <Typography variant="h5" component="div" sx={{color:"#ccd1d1"}}> 
              4
              </Typography>
            </Grid>

          </Grid>
        </Box>
      </Box>
    </Box>
    </div>
    </>
    
  )
}

export default Analytics