import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';

export const MainListItems = ({ onOptionSelected, selectedOption }) => (
  <React.Fragment>
    <ListItemButton onClick={() => onOptionSelected("Dashboard")}>
      <ListItemIcon>
        <DashboardIcon sx={{ color: selectedOption === "Dashboard" ? '#0E15E5' : 'inherit' }}/>
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    {/* <ListItemButton onClick={() => onOptionSelected("Orders")}>
      <ListItemIcon>
        <ShoppingCartIcon sx={{ color: selectedOption === "Orders" ? '#0E15E5' : 'inherit' }}/>
      </ListItemIcon>
      <ListItemText primary="Orders" />
    </ListItemButton> */}

    {/* <ListItemButton onClick={() => onOptionSelected("Customers")}>
      <ListItemIcon>
        <PeopleIcon sx={{ color: selectedOption === "Customers" ? '#0E15E5' : 'inherit' }}/>
      </ListItemIcon>
      <ListItemText primary="Customers" />
    </ListItemButton> */}

    <ListItemButton onClick={() => onOptionSelected("Reports")}>
      <ListItemIcon>
        <BarChartIcon sx={{ color: selectedOption === "Reports" ? '#0E15E5' : 'inherit' }}/>
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItemButton>

    {/* <ListItemButton onClick={() => onOptionSelected("Integrations")}>
      <ListItemIcon>
        <LayersIcon sx={{ color: selectedOption === "Integrations" ? '#0E15E5' : 'inherit' }}/>
      </ListItemIcon>
      <ListItemText primary="Integrations" />
    </ListItemButton> */}
  </React.Fragment>
);

export const SecondaryListItems = ({ onOptionSelected, selectedOption }) => (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
    <ListItemButton onClick={() => onOptionSelected("Current month")}>
      <ListItemIcon>
        <AssignmentIcon sx={{ color: selectedOption === "Current month" ? '#0E15E5' : 'inherit' }}/>
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
    <ListItemButton onClick={() => onOptionSelected("Last quarter")}>
      <ListItemIcon>
        <AssignmentIcon sx={{color:  selectedOption === "Last quarter" ? '#0E15E5' : 'inherit'}}/>
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItemButton>
    <ListItemButton onClick={() => onOptionSelected("Year-end sale")}>
      <ListItemIcon>
        <AssignmentIcon sx={{color: selectedOption === "Year-end sale" ? '#0E15E5': 'inherit'}}/>
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton>
  </React.Fragment>
);
