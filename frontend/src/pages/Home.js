/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useContext } from "react";
import Sidenav from "../components/Sidenav";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Navbar from "../components/Navbar";
import AccordionDash from "../components/AccordionDash";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import ApprovalIcon from "@mui/icons-material/Approval";
import "../dash.css";
import DataContext from "../contexts/DataContext";
import BasicTabs from "../components/BasicTabs";
import BasicTabs2 from "../components/BasicTabs2";
import { calculateAverageRates, calculateAverageDifferenceOfTwoDays, calculateTodayAverages } from '../utils';
import { usePublisher } from "../PublisherContext";
import { LinearProgress, makeStyles, CircularProgress } from "@material-ui/core";
import image from '.././assets/aaa.jpeg';
import image2 from '.././assets/calendar.jpeg';
import SelectPublisher from "../components/SelectPublisher";
import Datepicker from "../components/Datepicker";
import AdsClickIcon from '@mui/icons-material/AdsClick';
import PreviewIcon from '@mui/icons-material/Preview';


const Home = () => {
    const { selectedPublisher } = usePublisher();
    // console.log('selectedPublisher from HOME', selectedPublisher)
  const { publishers } = useContext(DataContext);
  const [publisherData, setPublisherData] = useState({});
  const [averageRates, setAverageRates] = useState({});
  const [differences, setDifferences] = useState({});
  const [todayAverages, setTodayAverages] = useState({});
  const [sizesData, setSizesData] = useState([]);
  const SelectedDateData = selectedPublisher?.data?.report;

//   console.log('SelectedDateData from home', SelectedDateData)
//   console.log('sizesData from home', sizesData)

  useEffect(() => {
    const fetchDataForPublishers = async () => {
      const token = localStorage.getItem('authToken');
      let dataForAllPublishers = {};
      
      try {
        for (const publisher of publishers.available_publishers) {
          const publisherId = Number(publisher.id);
          const response = await fetch(`https://reports.asadcdn.com:5200/getViewabilityReport?publisher_id=${publisherId}&date_range=last7days`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
  
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
  
          const data = await response.json();
          dataForAllPublishers[publisher.id] = data;
        }
  
        setPublisherData(dataForAllPublishers);
  
        //Calculate average rates and differences
        let calculatedAverageRates = {};
        let calculatedDifferences = {};
        let todayAverages = {};
        for (const [publisherId, publisherInfo] of Object.entries(dataForAllPublishers)) {
          calculatedAverageRates[publisherId] = calculateAverageRates(publisherInfo);
          calculatedDifferences[publisherId] = calculateAverageDifferenceOfTwoDays(publisherInfo);
          todayAverages[publisherId] = calculateTodayAverages(publisherInfo);
        }
  
        setAverageRates(calculatedAverageRates);
        setDifferences(calculatedDifferences);
        setTodayAverages(todayAverages);
  
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchDataForPublishers();
  }, [publishers]);

 
  const combinedData = publishers.available_publishers.map(publisher => {
    return {
      ...publisher, 
      data: publisherData[publisher.id], 
      averages: averageRates[publisher.id], 
      difference: differences[publisher.id],
      todayAverages: todayAverages[publisher.id]
    };
  });

  console.log('combinedData homepage HOME', combinedData);

  return (
    <>
      <div className="bgcolor">
        <Navbar combinedData={combinedData}/>
        {/* <Box sx={{ height: 70 }} /> */}
        <Box sx={{ display: "flex", height: 70 }}>
          <Sidenav />
          {/* Box containing the top info cards  */}
          <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
            {/* Parent Grid */}
            
            <Grid container spacing={2}>
              {/* First Child Grid takes 8 of 12 columns */}
              <Grid item xs={8}>
                <Stack spacing={2} direction="row">
                  <Card
                    sx={{
                      minWidth: 49 + "%",
                      height: 175,
                      backgroundColor: "#eceff1",
                    }}
                  >
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
                  <Card
                    sx={{
                      minWidth: 49 + "%",
                      height: 175,
                      backgroundColor: "#eceff1",
                    }}
                  >
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
              <Grid item xs={4}>
                <Stack spacing={1}>
                  {/* the cards stack on each other */}
                  <Card sx={{ maxWidth: 520 }} >
                    {/* Using stack for flexbox to spearate both divs along the row */}

                    <Stack spacing={1} direction="row">
                      <div className="iconStyle">
                         <img
                            src={image}
                            alt='logo-axelspringer'
                            height="50"
                            style={{ marginBottom: 1 }}
                          />
                      </div>
                      <div className="totalCard">
                      <SelectPublisher combinedData={combinedData}/>
                      </div>
                    </Stack>

                  </Card>
                  <Card sx={{ maxWidth: 520 }}>
                    <Stack spacing={1} direction="row">
                      <div className="iconStyle">
                      <img
                            src={image2}
                            alt='logo-axelspringer'
                            height="30"
                            style={{ marginBottom: 1 }}
                          />
                      </div>
                      <div className="totalCard">  
                      {!SelectedDateData ? (
                        <LinearProgress
                        style={{ color: "gold" }}
                        size={250}
                        thickness={1}
                        />
                    ) : (
                        <Datepicker SelectedDateData={SelectedDateData} setSizesData={setSizesData}/>
                    )}
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
              <Grid item xs={7}>
                <Card sx={{ height: 60 + "vh" }}>
                  <CardContent>
                    {/* <BasicTabs /> */}
                    {!selectedPublisher ? (
                        <LinearProgress
                        style={{ color: "gold" }}
                        size={250}
                        thickness={1}
                        />
                    ) : (                        
                        <BasicTabs />    
                    )}
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={5}>
                <Card sx={{ height: 60 + "vh" }}>
                  <CardContent>
                    {!selectedPublisher ? (
                        <LinearProgress
                        style={{ color: "gold" }}
                        size={250}
                        thickness={1}
                        />
                    ) : (   
                        <BasicTabs2 sizesData={sizesData}/>    
                    )}
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </div>
    </>
  );
};

export default Home;
