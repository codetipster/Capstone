import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, AppBar, Toolbar, IconButton, Badge, Drawer, List, ListItem, ListItemIcon, ListItemText, Menu, MenuItem, InputBase, Divider, Typography} from '@mui/material';
import { Menu as MenuIcon, Mail as MailIcon, Notifications as NotificationsIcon, AccountCircle, Dashboard as DashboardIcon, Search as SearchIcon } from '@mui/icons-material';
import { alpha } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import LoadingOverlay from '../components/LoadingOverlay';
import styles from '../styles/PublisherCard.module.css';
import TopAppBar from '../components/TopAppBar';
import SideDrawer from '../components/SideDrawer';

const MainPage = () => {
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [loading, setLoading] = useState(true); // Declare loading state
  
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const [publishers, setPublishers] = useState([]);

  

  useEffect(() => {
    //setLoading(true); // Set loading to true when fetch starts
    const token = localStorage.getItem('authToken'); // Replace 'token' with the actual key you used to store your token
  // 'http://localhost:5000/fetch-report'
    fetch('https://reports.asadcdn.com:5200/getViewablePublishers', {
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
      setPublishers(data);
      setLoading(false); // Set loading to false when the data is fetched
    })
    .catch(error => console.error('Error:', error)
    
    );
  }, []);
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <TopAppBar
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        anchorEl={anchorEl}
        handleMenu={handleMenu}
        handleClose={handleClose}
      />
      <SideDrawer open={open} handleDrawerClose={handleDrawerClose} />
      <main>
        <Box 
        sx={{ 
            padding: 8, 
            minHeight: '100vh', 
            backgroundColor: '#040404',
            marginTop: '80px',
            maxWidth: '2100px',   // You can adjust this value as needed
            margin: '0 auto'   // This will center the content
        }}
        >
        <Typography variant="h4" gutterBottom>
            Welcome to the Ads Viewability Dashboard
        </Typography>

        {loading ? (
          // LoadingOverlay component and fetching data text
          <div>
            <LoadingOverlay />
            <Typography variant="h6" gutterBottom>
              Fetching data, please wait...
            </Typography>
          </div>
        ) : (
          // Card layout code for each available publisher
          <Grid container spacing={3}>
            {publishers.available_publishers.map((publisher) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={publisher.id}>
              <Link to={`/publishers/${publisher.id}`} className={styles.link} >
                <Card className={styles.card}>
                  <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                      Publisher Name: {publisher.name}
                    </Typography>
                    <Typography color="textPrimary">
                      Publisher ID: {publisher.id}
                    </Typography>
                    <Typography color="textPrimary">
                      Member ID: {publisher.member_id}
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
              </Grid>
            ))}
          </Grid>
        )}
        </Box>
      </main>

    </Box>
  );
}

export default MainPage;
