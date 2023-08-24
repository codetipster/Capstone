import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { MainListItems, SecondaryListItems } from './ListItems';
import { PublisherDetails2 } from '../PublisherDetails2';
 import Chart from './Chart';
 import Deposits from './Deposits';
 import Orders from './Orders';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
        AdTech,AxelSpringer
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: '#FFFFFF', 
  color:'#0E15E5',
  position: 'fixed',
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const defaultTheme = createTheme();

export default function Dashboard() {
  const [open, setOpen] = React.useState(true);
  const [selected, setSelected] = React.useState({
    option: "Dashboard", 
    publisherId: null
  });
  const [loading, setLoading] = React.useState(true);
  const [publishers, setPublishers] = React.useState([]);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  //what option is selected from side bar?
  const handleOptionSelected = ({option, publisherId = null}) => {
    setSelected({option, publisherId});
    
  };
  

  React.useEffect(() => {
    const token = localStorage.getItem('authToken'); 
    fetch('https://reports.asadcdn.com:5200/getViewablePublishers', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      console.log('response', response)
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`Server response was not ok. Status: ${response.status} ${response.statusText}`);

      }
    })
    .then(data => {
      console.log('data',data);
      setPublishers(data);
      setLoading(false); 
    })
    .catch(error => console.error('Error:', error)
    );
  }, []);

//   Determining what is shown on the main section based on user action

  const renderMainContent = () => {
    switch (selected.option) {
        case "Dashboard":
            // Placeholder for Dashboard Content
            return <Typography variant="h4">Dashboard Content</Typography>;
        case "Reports":
            // Placeholder for Reports Content
            return <Typography variant="h4">Reports Content</Typography>;
        case "Current month":
            // Placeholder for Current Month Content
            return <Typography variant="h4">Current Month Content</Typography>;
        // ... add other cases as per your options return <PublisherDetails2 publisherId={selectedOption} />;
        default:
            return <PublisherDetails2 publisherId={selected.publisherId} />
    }
};


  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open} >
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              sx={{color:'#0000FF', fontWeight: 'bold' }}
              noWrap
            >
              Ads Viewability Dashboard
            </Typography>
            <Box sx={{ flexGrow: 1 }} /> {/* This acts as a spacer between the title and the icons */}
            <IconButton >
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>

        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          {/* side bar column options */}
          <List component="nav">
          <MainListItems onOptionSelected={handleOptionSelected} selectedOption={selected.option} /> 
            <Divider sx={{ my: 1 }} />
          <SecondaryListItems onOptionSelected={handleOptionSelected} selectedOption={selected.option} publishers={publishers}/>
          </List>
        </Drawer>
        
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
        
          

          <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    {renderMainContent()}
                </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
         </Container>

        </Box>
      </Box>
    </ThemeProvider>
  );
}