import * as React from 'react';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
//import Datepicker from './Datepicker';

//import { usePublisher } from '../PublisherContext';
import PublishersTable from './PublishersTable';
import PublishersTable2 from './PublishersTable2';


function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
 



  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 1 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs({sizesData}) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  console.log('sizesData from basicTabs',sizesData)

  const tabPanelStyles = {
    width: '75%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
    padding: 40,
  };



  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>  
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
        {sizesData.map((item, index) => (
          <Tab key={index} label={item.slot} {...a11yProps(index)} />
        ))}
        </Tabs>
      </Box>
      {sizesData.map((item, index) => (
        <CustomTabPanel value={value} index={index} key={index}>
          <PublishersTable2 sizes={item.sizes} />
          
        </CustomTabPanel>
      ))}
    </Box>
  );
}