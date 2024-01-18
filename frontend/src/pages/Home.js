/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useContext } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import { LinearProgress, makeStyles, CircularProgress } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Sidenav from '../components/Sidenav.jsx';
import Navbar from '../components/Navbar';
import '../dash.css';
import DataContext from '../contexts/DataContext';
import BasicTabs from '../components/BasicTabs';
import BasicTabs2 from '../components/BasicTabs2';
import { calculateAverageRates, calculateAverageDifferenceOfTwoDays, calculateTodayAverages } from '../utils';
import { usePublisher } from '../PublisherContext';
import image from '../assets/aaa.jpeg';
import image2 from '../assets/calendar.jpeg';
import SelectPublisher from '../components/SelectPublisher';
import Datepicker from '../components/Datepicker';

const Home = () => {
  const { selectedPublisher } = usePublisher();
  const { publishers } = useContext(DataContext);
  const [publisherData, setPublisherData] = useState({});
  const [averageRates, setAverageRates] = useState({});
  const [differences, setDifferences] = useState({});
  const [todayAverages, setTodayAverages] = useState({});
  const [sizesData, setSizesData] = useState([]);
  const SelectedDateData = selectedPublisher?.data?.report;
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const fetchDataForPublishers = async () => {
      const token = localStorage.getItem('authToken');
      const dataForAllPublishers = {};

      try {
        const responses = await Promise.all(
          publishers.available_publishers.map(async (publisher) => {
            const publisherId = Number(publisher.id);
            const response = await fetch(
              `https://reports.asadcdn.com:5200/getViewabilityReport?publisher_id=${publisherId}&date_range=last7days`,
              {
                headers: { Authorization: `Bearer ${token}` },
              },
            );

            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          }),
        );
        responses.forEach((data, index) => {
          dataForAllPublishers[publishers.available_publishers[index].id] = data;
        });
        setPublisherData(dataForAllPublishers);
        // Calculate average rates and differences
        const calculatedAverageRates = {};
        const calculatedDifferences = {};
        const calculatedTodayAverages = {};
        Object.entries(dataForAllPublishers).forEach(([publisherId, publisherInfo]) => {
          calculatedAverageRates[publisherId] = calculateAverageRates(publisherInfo);
          calculatedDifferences[publisherId] = calculateAverageDifferenceOfTwoDays(publisherInfo);
          calculatedTodayAverages[publisherId] = calculateTodayAverages(publisherInfo);
        });
        setAverageRates(calculatedAverageRates);
        setDifferences(calculatedDifferences);
        setTodayAverages(calculatedTodayAverages);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchDataForPublishers();
  }, [publishers]);

  const combinedData = (publishers.available_publishers || []).map((publisher) => ({
    ...publisher,
    data: publisherData[publisher.id],
    averages: averageRates[publisher.id],
    difference: differences[publisher.id],
    todayAverages: todayAverages[publisher.id],
  }));

  console.log('combinedData homepage HOME', combinedData);

  const data4cards = selectedPublisher?.data?.report[6];
  console.log('data4cards from HOME', data4cards);

  const yesterdayAdslotAverages = {};
  if (data4cards) {
    data4cards.adslots.forEach((adslot) => {
      yesterdayAdslotAverages[adslot.slot] = {
        averageViewRate: adslot.average_view_rate,
        averageCustomViewRate: adslot.average_custom_view_rate,
      };
    });
  }
  if (yesterdayAdslotAverages.banner) {
    console.log('yesterdayAdslotAverages from HOME', yesterdayAdslotAverages.banner.averageViewRate);
  } else {
    console.log('yesterdayAdslotAverages from HOME: banner adslot not found');
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <>
    <Snackbar open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
      >
        <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
        ATENTION! <br/>
          Welcome to the Ads Viewability dashboard! Please take note of the following:<br/>
          - Select a publisher from the list of available publishers to view metrics.<br/>
          - For the date component, please reselect a date whenever you change a publisher so
          as to be certain that the metrics for each date represents those of the selected
          publisher.
        </Alert>
      </Snackbar>
      <div className="bgcolor">
        <Navbar combinedData={combinedData}/>
        {/* <Box sx={{ height: 70 }} /> */}
        <Box sx={{ display: 'flex', height: 70 }}>
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
                      minWidth: `${49}%`,
                      height: 175,
                      backgroundColor: '#eceff1',
                    }}
                  >
                    <Stack spacing={2} direction="row">
                      <Card sx={{ minWidth: `${49.5}%`, height: 175 }} className='gradient'>
                        <CardContent>
                          <div >
                            <Typography
                            gutterBottom
                            variant="body2"
                            component="div"
                            sx={{ color: '#ee14bb', fontSize: '15px' }}>
                            {data4cards?.publisher_name}
                            </Typography>

                            <Typography
                              gutterBottom
                              variant="body2"
                              component="div"
                              sx={{ color: '#ccd1d1', fontSize: '15px' }}>
                            <span>Banner</span> | <span>Yesterday</span>
                            </Typography>
                          </div>

                          <Typography
                          gutterBottom
                          variant="h5"
                          component="div"
                          sx={{ color: '#ffffff' }}>
                          {
                            Number(
                              parseFloat(
                                yesterdayAdslotAverages.banner?.averageViewRate,
                              ) * 100,
                            ).toFixed(2)
                            }%
                          <span className="label">view rate</span>
                          </Typography>

                          <Typography
                          gutterBottom
                          variant="h5"
                          component="div"
                          sx={{ color: '#ffffff' }}>
                          {Number(
                            parseFloat(
                              yesterdayAdslotAverages.banner?.averageCustomViewRate,
                            ) * 100,
                          ).toFixed(2)
                              }%
                          <span className="label">custom rate</span>
                          </Typography>

                        </CardContent>
                      </Card>

                      <Card sx={{ minWidth: `${49.5}%`, height: 175 }} className='gradientLight'>
                        <CardContent>
                          <div >
                            <Typography
                            gutterBottom
                            variant="body2"
                            component="div"
                            sx={{ color: '#ee14bb', fontSize: '15px' }}>
                            {data4cards?.publisher_name}
                            </Typography>

                            <Typography
                              gutterBottom
                              variant="body2"
                              component="div"
                              sx={{ color: '#ccd1d1', fontSize: '15px' }}>
                              <span>Super banner</span> | <span>Yesterday</span>
                            </Typography>
                          </div>

                          <Typography
                           gutterBottom
                           variant="h5"
                           component="div"
                           sx={{ color: '#ffffff' }}>
                              {Number(
                                parseFloat(
                                  yesterdayAdslotAverages.superbanner?.averageViewRate,
                                ) * 100,
                              ).toFixed(2)
                              }%
                            <span className="label">view rate</span>
                          </Typography>

                          <Typography
                           gutterBottom
                           variant="h5"
                           component="div"
                           sx={{ color: '#ffffff' }}>
                              {Number(
                                parseFloat(
                                  yesterdayAdslotAverages.superbanner?.averageCustomViewRate,
                                ) * 100,
                              ).toFixed(2)
                              }%
                            <span className="label">custom rate</span>
                          </Typography>
                        </CardContent>
                      </Card>
                    </Stack>
                  </Card>
                  <Card
                    sx={{
                      minWidth: `${49}%`,
                      height: 175,
                      backgroundColor: '#eceff1',
                    }}
                  >
                    <Stack spacing={2} direction="row">
                      <Card sx={{ minWidth: `${49.5}%`, height: 175 }} className='gradient'>
                        <CardContent>
                          <div >
                            <Typography
                              gutterBottom
                              variant="body2"
                              component="div"
                              sx={{ color: '#ee14bb', fontSize: '15px' }}>
                              {data4cards?.publisher_name}
                            </Typography>

                            <Typography
                              gutterBottom
                              variant="body2"
                              component="div"
                              sx={{ color: '#ccd1d1', fontSize: '15px' }}>
                              <span>Sky</span> | <span>Yesterday</span>
                            </Typography>
                          </div>

                          <Typography gutterBottom variant="h5" component="div" sx={{ color: '#ffffff' }}>
                            {Number(
                              parseFloat(
                                yesterdayAdslotAverages.sky?.averageViewRate,
                              ) * 100,
                            ).toFixed(2)
                                }%
                              <span className="label">view rate</span>
                          </Typography>

                          <Typography gutterBottom variant="h5" component="div" sx={{ color: '#ffffff' }}>
                            {Number(
                              parseFloat(
                                yesterdayAdslotAverages.sky?.averageCustomViewRate,
                              ) * 100,
                            ).toFixed(2)
                                }%
                              <span className="label">custom rate</span>
                          </Typography>
                        </CardContent>
                      </Card>

                    <Card sx={{ minWidth: `${49.5}%`, height: 175 }} className='gradientLight'>
                      <CardContent>
                        <div >
                          <Typography
                          gutterBottom
                          variant="body2"
                          component="div"
                          sx={{ color: '#ee14bb', fontSize: '15px' }}>
                          {data4cards?.publisher_name}
                          </Typography>

                          <Typography
                            gutterBottom
                            variant="body2"
                            component="div"
                            sx={{ color: '#ccd1d1', fontSize: '15px' }}>
                          <span>M-rec</span> | <span>Yesterday</span>
                          </Typography>
                         </div>

                          <Typography
                            gutterBottom
                            variant="h5"
                            component="div"
                            sx={{ color: '#ffffff' }}>
                          {Number(
                            parseFloat(
                              yesterdayAdslotAverages.mrec?.averageViewRate,
                            ) * 100,
                          ).toFixed(2)
                              }%
                          <span className="label">view rate</span>
                          </Typography>

                          <Typography
                            gutterBottom
                            variant="h5"
                            component="div"
                            sx={{ color: '#ffffff' }}>
                          {Number(
                            parseFloat(
                              yesterdayAdslotAverages.mrec?.averageCustomViewRate,
                            ) * 100,
                          ).toFixed(2)
                              }%
                          <span className="label">custom rate</span>
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
                        style={{ color: 'gold' }}
                        size={250}
                        thickness={1}
                        />
                      ) : (
                        <Datepicker
                         SelectedDateData={SelectedDateData}
                         setSizesData={setSizesData}/>
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
                <Card sx={{ height: `${60}vh` }}>
                  <CardContent>
                    {/* <BasicTabs /> */}
                    {!selectedPublisher ? (
                        <LinearProgress
                        style={{ color: 'gold' }}
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
                <Card sx={{ height: `${60}vh` }}>
                  <CardContent>
                    {!selectedPublisher ? (
                        <LinearProgress
                        style={{ color: 'gold' }}
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
