import React, { useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PublisherList from './PublisherList';
import MobileList from './MobileList';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import {useNavigate} from 'react-router-dom';

export default function AccordionDash({ publishers, publisherId, handleChange, data, selectedAdSlot, selectedAdSlotDetails}) {
  console.log('publisherId from accordion', publisherId);  // this could also have been accomplished by useContext directly 
  const navigate = useNavigate();
  //const totalPublishers = publishers.available_publishers.length;

  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography >Available Publishers</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <PublisherList publishers={publishers}/>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Adslots</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <MobileList data={data} selectedAdSlot={selectedAdSlot} handleChange={handleChange} selectedAdSlotDetails={selectedAdSlotDetails}/>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>See Detailed Analytics</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Button variant="outlined" endIcon={<SendIcon />} onClick={()=>{navigate("/analytics")}}>
          Go To Analytics
          </Button>
        </AccordionDetails>
      </Accordion>
      
    </div>
  );
}