import React, { useState, useContext } from 'react';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList } from 'react-window';
import Typography from '@mui/material/Typography';
import DataContext from '../contexts/DataContext';

export function RenderRow({ index, style, publishers, toggleSelected, selectedPublisherId }) {
    const publisher = publishers[index];
    const isSelected = publisher.id === selectedPublisherId;
    
    return (
      <ListItem style={style} key={index} component="div" disablePadding>
        <ListItemButton style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Checkbox
              edge="start"
              checked={isSelected}
              disabled={!isSelected && selectedPublisherId !== null}
              onChange={() => toggleSelected(publisher.id)}
            />
            <ListItemText primary={publisher ? publisher.name : 'Unknown Publisher'} />
          </div>
          <Typography variant="caption" style={{ color: 'gray' }}>
            {publisher ? `ID: ${publisher.id}` : 'Unknown ID'}
          </Typography>
        </ListItemButton>
      </ListItem>
    );
  }
  

export default function PublisherList({ publishers }) {
    const availablePublishers = publishers.available_publishers;
    const [selectedPublisherId, setSelectedPublisherId] = useState(null);
    const { setPublisherId } = useContext(DataContext);

    const toggleSelected = (id) => {
        if (selectedPublisherId === id) {
          console.log('Deselecting publisher ID:', id); // Log when deselecting
          setSelectedPublisherId(null);
        } else {
          console.log('Selecting publisher ID:', id); // Log new selection
          setSelectedPublisherId(id);
          setPublisherId(id);
        }
      };
  
    return (
      <Box sx={{ width: '100%', height: 200, maxWidth: 360, bgcolor: 'background.paper' }}>
        <FixedSizeList
          height={200}
          width={440}
          itemSize={46}
          itemCount={availablePublishers.length}
          overscanCount={5}
        >
          {({ index, style }) => (
            <RenderRow
              index={index}
              style={style}
              publishers={availablePublishers}
              toggleSelected={toggleSelected}
              selectedPublisherId={selectedPublisherId}
            />
          )}
        </FixedSizeList>
      </Box>
    );
  }