import React from 'react';
import {
  AppBar, Toolbar, IconButton, Box, Typography, Divider, InputBase, Badge, Menu, MenuItem
} from '@mui/material';
import {
  Menu as MenuIcon, Mail as MailIcon, Notifications as NotificationsIcon, AccountCircle, Search as SearchIcon
} from '@mui/icons-material';
import { alpha } from '@mui/material/styles';

const TopAppBar = ({ open, handleDrawerOpen, anchorEl, handleMenu, handleClose }) => (
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
);

export default TopAppBar;
