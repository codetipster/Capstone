import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import Chart from '../pages/Dashboard/Chart'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { useParams } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Container,
  RadioGroup, FormControlLabel, Radio,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Divider,
  Grid
} from '@mui/material';

export function PublisherDetails2({ publisherId }) {
    const [data, setData] = React.useState(null);
    const [selectedAdSlot, setSelectedAdSlot] = useState(null); 
    const [selectedAdSlotDetails, setSelectedAdSlotDetails] = useState(null);

    const mobile = ['banner', 'mrec', 'mrec_btf', 'Inpage', 'Inpage_btf', 'Inread', 'Inread_btf', 'Inread_sticky', '']
    const desktop =  ['superbanner', 'Superbanner_btf', 'Superbanner_sticky', 'Superbanner_btf_sticky', 'mrec', 'Mrec_btf', 'Mrec_sticky', 'Mrec_btf_sticky', 'billboard', 'Billboard_btf', 'Billboard_sticky', 'Billboard_btf_sticky', 'Inpage', 'Inread', 'Inread_btf', 'Inread_sticky', 'Inread_btf_sticky', 'sky', 'sky_btf']
    


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

     //slider settings
    const sliderSettings = {
      dots: true,
      infinite: false,
      speed: 600,
      slidesToShow: 3,
      slidesToScroll: 3,
      autoplay: true,
      autoplaySpeed: 1000,
    };
    //console.log('selectedAdSlotDetails', selectedAdSlotDetails.sizes[0].impression_type)
    console.log('publisherDetails2', data)
    return (
      <Container maxWidth="xl" >
        {data ? (
          <Grid container spacing={3} direction="column">
              {/* Display the publisher name in its own card at the top */}
              {data.report.length > 0 && (
                <Box sx={{ paddingLeft: 1, width: '20%' }}>
                  <div>
                    Viewability for|   
                          <Typography variant="h6" component="span" sx={{ paddingLeft: 1 , color: '#48639C'}}>
                              {data.report[7].publisher_name}
                          </Typography>
                  </div>  
                  <Divider />      
                </Box>
              )}

              {/* Display ad slot types for each publisher */}
              <Grid>
                  <Box>
                    <div style={{ textAlign: 'right' }}>
                      Date: 
                            <Typography variant="h6" component="span" sx={{ paddingLeft: 1 , color: '#48639C'}}>
                                {data.report[7].date}
                            </Typography>
                    </div>  
                    <Divider /> 
                  </Box>

                  <Box sx={{ padding: 3 }}>
                      <Grid container spacing={4}>
                        {/* Display Mobile Adslots */}
                        <Grid item xs={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                          <Card sx={{ minWidth: 350 }}>
                            <Box sx={{ margin: 2 }}>
                              <div>
                                <Typography variant="h8" >
                                  Mobile Adslots
                                </Typography>
                                <Divider />
                              </div>
                              <RadioGroup aria-label="mobile-adslot" name="mobile-adslot" value={selectedAdSlot} onChange={handleChange}>
                                {data.report[7]?.adslots.filter(adslot => mobile.includes(adslot.slot)).map((adslot, index) => (
                                  <FormControlLabel key={index} value={adslot.slot} control={<Radio />} label={adslot.slot} />
                                ))}
                              </RadioGroup>
                            </Box>
                          </Card>
                        </Grid>

                        {/* Display Desktop Adslots */}
                        <Grid item xs={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                          <Card sx={{ minWidth: 350 }}>
                          <Box sx={{ margin: 2 }}>
                          <div>
                          <Typography variant="h8" >
                            Desktop Adslots
                          </Typography>
                          <Divider />
                          </div>
                          <RadioGroup aria-label="desktop-adslot" name="desktop-adslot" value={selectedAdSlot} onChange={handleChange}>
                            {data.report[7]?.adslots.filter(adslot => desktop.includes(adslot.slot)).map((adslot, index) => (
                              <FormControlLabel key={index} value={adslot.slot} control={<Radio />} label={adslot.slot} />
                            ))}
                          </RadioGroup>
                          </Box>
                          </Card>
                        </Grid>

                      </Grid>
                      <Divider sx={{ marginTop: 2, marginBottom: 2 }}/>
                  </Box>

                  {/* Display the view rate for selected adslot */}
                  <Box sx={{ padding: 1}}>
                      <Grid container spacing={4}>
                        <Grid item xs={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                          <Card sx={{ minWidth: 300, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <CardContent sx={{ paddingLeft: 2, paddingRight: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                              <div>
                                <Typography variant="h8">
                                  {selectedAdSlot} viewability Today
                                </Typography>
                              </div>
                              <Divider sx={{ marginBottom: 2 }} />
                              <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                                {/* Average View Rate Card */}
                                <Card variant="outlined" sx={{ padding: 1 }}>
                                  <CardContent>
                                    <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                                      {selectedAdSlotDetails ? `${(selectedAdSlotDetails.average_view_rate * 100).toFixed(2)}%` : 'No Data'}
                                    </Typography>
                                    <Typography variant="body2" component="div">
                                      Viewability Rate
                                    </Typography>
                                    <Typography variant="body2" component="div" sx={{ color: '#1324F2'}}>
                                      Today
                                    </Typography>
                                  </CardContent>
                                  <Divider sx={{ backgroundColor: '#FF33FF', height: '4px', marginTop: '8px' }} />
                                </Card>

                                {/* Average Custom View Rate Card */}
                                <Card variant="outlined" sx={{ padding: 1 }}>
                                  <CardContent>
                                    <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                                      {selectedAdSlotDetails ? `${(selectedAdSlotDetails.average_custom_view_rate * 100).toFixed(2)}%` : 'No Data'}
                                    </Typography>
                                    <Typography variant="body2" component="div">
                                      Custom Viewability
                                    </Typography>
                                    <Typography variant="body2" component="div" sx={{ color: '#1324F2'}}>
                                      Today
                                    </Typography>
                                    <Divider sx={{ backgroundColor: '#00FFFF', height: '5px', marginTop: '22px' }} />
                                  </CardContent>
                                </Card>
                              </Box>
                            </CardContent>
                          </Card>
                        </Grid>

                        {/* sliding components */}
                        <Grid item xs={6} sx={{ width:'90%', display: 'flex', flexDirection: 'column', alignItems: 'center', maxHeight:  '100%' }}>
                            <Box style={{ width: '70%', maxHeight: '80%' }}>
                              {selectedAdSlotDetails && selectedAdSlotDetails.sizes ? (
                                <Slider {...sliderSettings}>
                                  {selectedAdSlotDetails.sizes.map((size, index) => (
                                    <div key={index}>
                                      <Card >
                                        <CardContent sx={{ paddingLeft: 1, paddingRight: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                          <Typography variant="p" sx={{ fontSize: '12px' }}>Viewability rate</Typography>
                                          <Typography variant="h7" component="div" sx={{ fontWeight: 'bold' }}>
                                          {size.view_rate ? `${(size.view_rate * 100).toFixed(2)}%` : '0%'}
                                          </Typography>
                                          <Typography variant="body2" component="p">
                                            {size.impression_type}
                                          </Typography>
                                          <Typography variant="body2" component="p" sx={{ color: '#1324F2'}}>
                                            {size.size}
                                          </Typography>
                                          <Typography variant="p" sx={{ fontSize: '12px' }}>Custom View</Typography>
                                          <Typography variant="h7" component="div" sx={{ fontWeight: 'bold' }}>
                                          {size.custom_view_rate ? `${(size.custom_view_rate * 100).toFixed(2)}%` : '0%'}
                                          </Typography>
      
                                        </CardContent>
                                      </Card>
                                    </div>
                                  ))}
                                </Slider>
                              ) : (
                                <p>No Data for Slider</p>
                              )}
                            </Box>
                        </Grid>

                        
                      </Grid>     
                    </Box>
              </Grid>
          </Grid>
          
        ) : (
          <p>Loading...</p>
        )}
        
      </Container>
    );
  }
  