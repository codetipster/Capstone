import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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

export function PublisherDetails2({ publisherId }) {
    const [data, setData] = React.useState(null);
  
    React.useEffect(() => {
        console.log('from the publisherDetails page', publisherId)
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
  
    console.log('publisherDetails2', data)
    // Render logic here, for example:
    return (
      <div>
        {data ? (
          <>
            {/* Use the fetched data to display detailed info */}
            {/* For instance: */}
            {/* <h2>{data.publisherName}</h2> */}
            {/* <p>{data.publisherDetails}</p> */}
            {/* ... */}
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
  }
  