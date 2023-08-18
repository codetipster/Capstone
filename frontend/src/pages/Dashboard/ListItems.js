import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
//import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
//import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
//import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

export const MainListItems = ({ onOptionSelected, selectedOption }) => (
  <React.Fragment>
    <ListItemButton onClick={() => onOptionSelected({option: "Dashboard"})}>
      <ListItemIcon>
        <DashboardIcon sx={{ color: selectedOption === "Dashboard" ? '#0E15E5' : 'inherit' }}/>
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>

    <ListItemButton onClick={() => onOptionSelected({option: "Reports"})}>
      <ListItemIcon>
        <BarChartIcon sx={{ color: selectedOption === "Reports" ? '#0E15E5' : 'inherit' }}/>
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItemButton>

  </React.Fragment>
);

export const SecondaryListItems = ({ onOptionSelected, selectedOption, publishers }) => {
    const [showMore, setShowMore] = React.useState(false);

    const available_publishers = publishers?.available_publishers || [];
    const displayedPublishers = showMore ? available_publishers : available_publishers.slice(0, 7);
  
    return (
      <React.Fragment>
        <ListSubheader component="div" inset>
          Available Publishers
        </ListSubheader>
        {displayedPublishers.map((publisher) => (
          <ListItemButton key={publisher.id} onClick={() => onOptionSelected({option: publisher.name, publisherId: publisher.id})}>
            <ListItemIcon>
              <AssignmentIcon sx={{ color: selectedOption === publisher.name ? '#0E15E5' : 'inherit' }}/>
            </ListItemIcon>
            <ListItemText primary={publisher.name} />
          </ListItemButton>
        ))}
        {available_publishers.length > 7 && (
          <ListItemButton onClick={() => setShowMore(!showMore)}>
            <ListItemIcon>
              {showMore ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
            </ListItemIcon>
            <ListItemText primary={showMore ? "Show Less" : "Show More"} />
          </ListItemButton>
        )}
      </React.Fragment>
    );
};

