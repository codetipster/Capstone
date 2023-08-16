import React, { useEffect, useState } from 'react';
//import { AppBar} from '@mui/material';
import { useParams } from 'react-router-dom';
import TopAppBar from '../components/TopAppBar';
import SideDrawer from '../components/SideDrawer';
import {
  Box,
  Card,
  CardContent,
  Typography,
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
  Grid
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const PublisherDetails = () => {
  const [data, setData] = useState(null);
  const [openn, setOpenn] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const { publisherId } = useParams();

  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

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
  
  

  useEffect(() => {
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



  const handleOpen = (sizes) => {
    setSelectedSizes(sizes);
    setOpenn(true);
  };

  const handleCloser = () => {
    setSelectedSizes([]);
    setOpenn(false);
  };

  if (!data) {
    return <div>Loading...</div>;
  }

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
        Details for Publisher: {data.report[0].publisher_name}
      </Typography>

      {data.report.map((day, index) => (
        <div key={index}>
          <Typography variant="h6" gutterBottom>
            {day.date}
          </Typography>
          <Grid container spacing={3}>
            {day.adslots.map((slot, slotIndex) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={slotIndex}>
                <Card>
                  <CardContent>
                    <List>
                      <ListItem button onClick={() => handleOpen(slot.sizes)}>
                        <ListItemText
                          primary={slot.slot}
                          secondary={`Custom View Rate: ${slot.average_custom_view_rate.toFixed(2)} | View Rate: ${slot.average_view_rate.toFixed(2)}`}
                        />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      ))}

      <Dialog open={openn} onClose={handleCloser} maxWidth="md" fullWidth>
        <DialogTitle>
          Sizes and Details
          <IconButton style={{ position: 'absolute', right: 10, top: 10 }} onClick={handleCloser}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Size</TableCell>
                <TableCell>Impression Type</TableCell>
                <TableCell>Impressions</TableCell>
                <TableCell>View Rate</TableCell>
                <TableCell>Custom View Rate</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {selectedSizes.map((sizeObj, sizeIndex) => (
                <TableRow key={sizeIndex}>
                  <TableCell>{sizeObj.size}</TableCell>
                  <TableCell>{sizeObj.impression_type}</TableCell>
                  <TableCell>{sizeObj.impressions}</TableCell>
                  <TableCell>{sizeObj.view_rate.toFixed(2)}</TableCell>
                  <TableCell>{sizeObj.custom_view_rate.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DialogContent>
      </Dialog>
      </Box>
      </main>
    </Box>
  );
};

export default PublisherDetails;
