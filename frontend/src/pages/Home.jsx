import React, { useEffect, useState, useContext } from 'react'
import Sidenav from '../components/Sidenav'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Navbar from '../components/Navbar';
import AccordionDash from '../components/AccordionDash';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import ApprovalIcon from '@mui/icons-material/Approval';
import AdsClickIcon from '@mui/icons-material/AdsClick';
import PreviewIcon from '@mui/icons-material/Preview';
import '../dash.css'
import DataContext from '../contexts/DataContext';
//import Barchart from '../charts/Barchart';
import Linechart from '../charts/Linechart';


const Home = () => {
    const { publishers, publisherId, loading, error } = useContext(DataContext);
    const [data, setData] = useState(null);
    const [selectedAdSlot, setSelectedAdSlot] = useState(null);
    const [selectedAdSlotDetails, setSelectedAdSlotDetails] = useState(null);
    console.log(publishers);

    React.useEffect(() => {
        const token = localStorage.getItem('authToken'); 
        fetch(`https://reports.asadcdn.com:5200/getViewabilityReport?publisher_id=${publisherId}&date_range=last7days`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error(`Server response was not ok. Status: ${response.status} ${response.statusText}`);
          }
        })
        .then(data => {
          setData(data);
        })
        .catch(error => console.error('Error:', error));
      }, [publisherId]);
    
      // Render logic here, for example:
      const handleChange = (event) => {
        setSelectedAdSlot(event.target.value);
      };
      
      useEffect(() => {
        if (selectedAdSlot !== null) {
          const selectedDetails = data.report[7]?.adslots.find(adslot => adslot.slot === selectedAdSlot);
          
          setSelectedAdSlotDetails(selectedDetails);
        }
      }, [selectedAdSlot, data]);



  return (
    <>
        <div className='bgcolor'>
             <Navbar/>
        <Box sx={{ height: 70 }}/>
            <Box sx={{ display: 'flex' }}>
                <Sidenav />
                {/* Box containing the top info cards  */}
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                   {/* Parent Grid */}
                    <Grid container spacing={2}>
                        {/* First Child Grid takes 8 of 12 columns */}
                        <Grid item xs={8}>
                            <Stack spacing={2} direction="row">
                                <Card sx={{ minWidth: 49 + "%", height: 150 , backgroundColor: "#eceff1"}} >
                                    <Stack spacing={2} direction="row">
                                        <Card sx={{ minWidth: 49.5 + "%", height: 150 }} className='gradient'>
                                            <CardContent>
                                                <div className='iconStyle'>
                                                <AdsClickIcon/>
                                                </div>
                                                <Typography gutterBottom variant="h5" component="div" sx={{color:"#ffffff"}}>
                                                81.62%
                                                </Typography>
                                                <Typography gutterBottom variant="body2" component="div" sx={{color:"#ccd1d1"}}>
                                                Viewability rate
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                        <Card sx={{ minWidth: 49.5 + "%", height: 150 }} className='gradientLight'>
                                            <CardContent>
                                                <div className='iconStyle'>
                                                <AdsClickIcon/>
                                                </div>
                                                <Typography gutterBottom variant="h5" component="div" sx={{color:"#ffffff"}}>
                                                81.62%
                                                </Typography>
                                                <Typography gutterBottom variant="body2" component="div" sx={{color:"#ccd1d1"}}>
                                                Viewability rate
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Stack>   
                                </Card>
                                <Card sx={{ minWidth: 49 + "%", height: 150 , backgroundColor: "#eceff1"}} >
                                    <Stack spacing={2} direction="row">
                                        <Card sx={{ minWidth: 49.5 + "%", height: 150 }} className='gradient'>
                                            <CardContent>
                                                <div className='iconStyle'>
                                                <PreviewIcon/>
                                                </div>
                                                <Typography gutterBottom variant="h5" component="div" sx={{color:"#ffffff"}}>
                                                81.62%
                                                </Typography>
                                                <Typography gutterBottom variant="body2" component="div" sx={{color:"#ccd1d1"}}>
                                                Viewability rate
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                        <Card sx={{ minWidth: 49.5 + "%", height: 150 }}  className='gradientLight'>
                                            <CardContent>
                                                <div className='iconStyle'>
                                                <PreviewIcon/>
                                                </div>
                                                <Typography gutterBottom variant="h5" component="div" sx={{color:"#ffffff"}}>
                                                81.62%
                                                </Typography>
                                                <Typography gutterBottom variant="body2" component="div" sx={{color:"#ccd1d1"}}>
                                                Viewability rate
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Stack>   
                                </Card>
                            </Stack>
                        </Grid>
                        {/* Second Child Grid takes 4 of 12 columns */}
                        <Grid item xs={4} >
                            <Stack spacing={2}>
                            {/* the cards stack on each other */}
                                <Card sx={{ maxWidth: 520 }} className='gradientLight'>
                                    {/* Using stack for flexbox to spearate both divs along the row */}
                                    <Stack spacing={2} direction="row">
                                        <div className='iconStyle'>
                                        <ApprovalIcon/>
                                        </div>
                                        <div className='totalCard'>
                                            <span className='totalValue1'>60.97%</span>
                                            <br/>
                                            <span className='totalTitle1'>Viewability -Resold</span>
                                        </div>   
                                    </Stack>                                 
                                </Card>
                                <Card sx={{ maxWidth: 520 }}>                                    
                                    <Stack spacing={2} direction="row">
                                        <div className='iconStyleblack'>
                                        <ApprovalIcon/>
                                        </div>
                                        <div className='totalCard'>
                                        <span className='totalValue'>71.23%</span>
                                        <br/>
                                        <span className='totalTitle'>Custom -Resold</span>
                                        </div>   
                                    </Stack>                                       
                                </Card>
                            </Stack>
                        </Grid>
                    </Grid>

                {/* Box containing the line chart and the customisation panel */}
                <Box sx={{ height: 20 }} />
                   {/* Parent Grid */}
                    <Grid container spacing={2}>
                        <Grid item xs={8}>
                            <Card sx={{ height: 60 + "vh" }}>
                                    <CardContent>
                                    <Linechart  selectedAdSlot={selectedAdSlot} data={data}/>
                                    </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={4}>
                            <Card sx={{ height: 60 + "vh" }}>
                                    <CardContent>
                                    <div className='totalCard'>
                                    <span className='totalValue'>Customise View:</span>
                                    </div>   
                                    <AccordionDash 
                                        publishers={publishers} 
                                        publisherId={publisherId}
                                        data={data}
                                        setData={setData}
                                        selectedAdSlot={selectedAdSlot}
                                        selectedAdSlotDetails={selectedAdSlotDetails}
                                        handleChange={handleChange}
                                    />
                                    </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>
        </Box>
        </div> 
    </>
    
  )
}

export default Home