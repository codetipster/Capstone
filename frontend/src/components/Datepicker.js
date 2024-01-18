/* eslint-disable react/prop-types */
import * as React from 'react';
import { useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function Datepicker({ SelectedDateData, setSizesData }) {
  // const { setSelectedDate, sizesData, updateSizesData } = useDateData();
  console.log('SelectedDateData from datepicker', SelectedDateData);
  const [selectedDate, setSelectedDate] = useState(null);
  // const [sizesData, setSizesData] = useState([]);

  const formatDate = (date) => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const updateSizesData = (date) => {
    // Find the data for the selected date
    const selectedData = SelectedDateData.find((entry) => entry.date === date);

    // Extract sizes data from adslots for the selected date
    const sizes = selectedData?.adslots.map((slot) => ({
      date,
      slot: slot.slot,
      sizes: slot.sizes,
    })) || [];

    setSizesData(sizes);
  };

  const handleDateChange = (event) => {
    const newDate = event.target.value;
    setSelectedDate(newDate);
    updateSizesData(newDate);
  };

  useEffect(() => {
    // Set default date to yesterday when the component first loads
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    setSelectedDate(formatDate(yesterday));

    // Update sizesData based on the default date
    updateSizesData(formatDate(yesterday));
  }, []); // Run this effect only once on component mount

  // console.log('sizesData from datepicker',sizesData)

  return (
    <div >
      <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
        <InputLabel id="demo-simple-select-standard-label" >Date selector</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={selectedDate}
          onChange={handleDateChange}
          label="Publisher"
          sx={{ color: '#D709A0' }}
        >
          <MenuItem value="" >
            <em>None</em>
          </MenuItem>
          {SelectedDateData?.map((item) => (
            <MenuItem key={item.date} value={item.date}>
                {item.date}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
