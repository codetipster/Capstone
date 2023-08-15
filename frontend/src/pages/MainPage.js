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
  
 

  const drawer = (
    <div>
      <List>
        {['Dashboard', 'Reports', 'Brands'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon  sx={{ color: '#FFFFFF' }}>
              {index % 2 === 0 ? <DashboardIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ backgroundColor: '#141414' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>

          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
            <Typography variant="h6" component="div">
                AdTech
            </Typography>
            <Divider orientation="vertical" flexItem sx={{ height: '25px', m: 'auto 10px' }} />
            <Box sx={{
                position: 'relative',
                borderRadius: '4px',
                backgroundColor: alpha('#FFFFFF', 0.15),
                '&:hover': {
                backgroundColor: alpha('#FFFFFF', 0.25),
                },
                marginRight: '2px',
                marginLeft: 0,
                width: '100%',
            }}>
                <InputBase
                placeholder="Search by publisher and date"
                inputProps={{ 'aria-label': 'search' }}
                sx={{ pl: '10px', color: 'inherit', width: '100%' }}
                />
                <Box sx={{ position: 'absolute', right: '5px', top: '50%', transform: 'translateY(-50%)' }}>
                <SearchIcon />
                </Box>
            </Box>
          </Box>

          <IconButton size="large" color="inherit">
            <Badge color="error">
              <MailIcon />
            </Badge>
          </IconButton>
          <IconButton size="large" color="inherit">
            <Badge color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton size="large" color="inherit" onClick={handleMenu}>
            <Badge color="error">
              <AccountCircle />
            </Badge>
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Settings</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        anchor="left"
        open={open}
        onClose={handleDrawerClose}
        PaperProps={{
        sx: {
        width: 220,
        backgroundColor: '#141414',  // Set the drawer color
        color: '#FFFFFF',  // Set the text color
        },
      }}
      >
        {drawer}
      </Drawer>
      <main>
        <Box 
        sx={{ 
            padding: 3, 
            minHeight: '100vh', 
            backgroundColor: '#040404',
            marginTop: '64px' 
        }}
        >
        <Typography variant="h4" gutterBottom>
            Welcome to the Main Page!
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
