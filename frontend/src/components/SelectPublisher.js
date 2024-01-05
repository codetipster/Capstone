import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { usePublisher } from './../PublisherContext'; 


export default function SelectPublisher({combinedData}) {
  const { selectedPublisher, setPublisher } = usePublisher();

  const handleChange = (event) => {
    
    const selectedPublisher = combinedData.find(
      (item) => item.id === event.target.value || item.name === event.target.value
      
    );
    if (selectedPublisher) {
      console.log('Selected Publisher:', selectedPublisher);
      // You can use the selectedPublisher object as needed in your application
      
        setPublisher(selectedPublisher);
      
    }
  };

  // React.useEffect(() => {
  //   if (!selectedPublisher) {
  //     const defaultPublisher = combinedData.find((item) => item.id === 1000493);
  //     if (defaultPublisher) {
  //       setPublisher(defaultPublisher);
  //     }
  //   }
  // }, [selectedPublisher, combinedData, setPublisher]);

  // const handleChange = (event) => {
  //   const selectedPublisher = combinedData.find(
  //     (item) => item.id === event.target.value || item.name === event.target.value
  //   );
  //   if (selectedPublisher) {
  //     console.log('Selected Publisher:', selectedPublisher);
  //     setPublisher(selectedPublisher);
  //   }
  // };

  

  return (
    <div >
      <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
        <InputLabel id="demo-simple-select-standard-label" >Publisher</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={selectedPublisher ? selectedPublisher.name : ''}
          onChange={handleChange}
          label="Publisher"
          sx={{ color: "#D709A0"}}
        >
          <MenuItem value="" >
            <em>None</em>
          </MenuItem>
          {combinedData.map((item) => (
            <MenuItem key={item.id} value={item.name} >
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}