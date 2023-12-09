import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function MobileList({ selectedAdSlot, handleChange, data}) {
    const mobile = ['banner', 'mrec', 'mrec_btf', 'Inpage', 'Inpage_btf', 'Inread', 'Inread_btf', 'Inread_sticky', '']
    const desktop =  ['superbanner', 'Superbanner_btf', 'Superbanner_sticky', 'Superbanner_btf_sticky', 'mrec', 'Mrec_btf', 'Mrec_sticky', 'Mrec_btf_sticky', 'billboard', 'Billboard_btf', 'Billboard_sticky', 'Billboard_btf_sticky', 'Inpage', 'Inread', 'Inread_btf', 'Inread_sticky', 'Inread_btf_sticky', 'sky', 'sky_btf']

    if (!data || !data.report || !data.report[7]) {
        return <div>Loading...</div>; // Or any other placeholder you prefer
    }
    
  return (
    <FormControl>
      <FormLabel id="mobile-adslot">Mobile</FormLabel>
      <RadioGroup
        row
        aria-labelledby="mobile-adslot"
        name="mobile-adslot"
        value={selectedAdSlot} 
        onChange={handleChange}
      >
        {data.report[7]?.adslots.filter(adslot => mobile.includes(adslot.slot)).map((adslot, index) => (
            <FormControlLabel key={index} value={adslot.slot} control={<Radio />} label={adslot.slot} />
        ))}
      </RadioGroup>
      <FormLabel id="mobile-adslot">Desktop</FormLabel>
      <RadioGroup
        row
        aria-labelledby="mobile-adslot"
        name="mobile-adslot"
        value={selectedAdSlot} 
        onChange={handleChange}
      >
        {data.report[7]?.adslots.filter(adslot => desktop.includes(adslot.slot)).map((adslot, index) => (
            <FormControlLabel key={index} value={adslot.slot} control={<Radio />} label={adslot.slot} />
        ))}
      </RadioGroup>
    </FormControl>
  );
}