import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Dashboard as DashboardIcon, Mail as MailIcon } from '@mui/icons-material';

const SideDrawer = ({ open, handleDrawerClose }) => {
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
    <Drawer
      variant="temporary"
      anchor="left"
      open={open}
      onClose={handleDrawerClose}
      PaperProps={{
      sx: {
      width: 220,
      backgroundColor: '#141414',
      color: '#FFFFFF',
      },
    }}
    >
      {drawer}
    </Drawer>
  );
}

export default SideDrawer;
