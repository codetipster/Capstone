import React from 'react'
import {Box, IconButton, Input, useTheme} from '@mui/material'
import {useContext} from 'react'
import {ColorModeContext, tokens} from '../../theme'
import  LightModeOutlinedIcon  from '@mui/icons-material/LightModeOutlined';
import  DarkModeOutlinedIcon  from '@mui/icons-material/DarkModeOutlined';
import  NotificationsOutlinedIcon  from '@mui/icons-material/NotificationsOutlined';
import  SettingsOutlinedIcon  from '@mui/icons-material/SettingsOutlined';
import  PersonOutlinedIcon  from '@mui/icons-material/PersonOutlined';
import  SearchIcon  from '@mui/icons-material/Search';
import {InputBase} from '@mui/material'

const Topbar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
    
        <Box display="flex" backgroundColor={colors.primary[400]} boarderRadius="3px">
            <InputBase placeholder="Search" sx={{ ml: 2, flex: 1 }} />
            <IconButton type="button" sx={{p:1}}>
                <SearchIcon />
            </IconButton>
        </Box>

        <Box display="flex">
            <IconButton >
                <NotificationsOutlinedIcon />
            </IconButton>
            <IconButton >
                <SettingsOutlinedIcon />
            </IconButton>
            <IconButton >
                <PersonOutlinedIcon />
            </IconButton>
            <IconButton onClick={colorMode.toggleColorMode}>
                {theme.palette.mode === 'dark' ? (<DarkModeOutlinedIcon /> ): (<LightModeOutlinedIcon />)}
            </IconButton>
        </Box>
    </Box>
  )
}

export default Topbar