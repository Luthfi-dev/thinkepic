import React, { useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

const TabScroll = ({ categories, pKategori }) => {
 const [val, setVal] = useState(0);

 const handleTab = (e, newVal) => {
        setVal(newVal);
        pKategori(newVal);
    };

  return (
<Tabs
      value={val}
      onChange={handleTab}
      variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
      style={{ boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)" }}
    >
      {categories.map((CategoryScaleOptions, index) => (
        <Tab
          key={index}
          label={CategoryScaleOptions}
          className={val === index ? 'active' : ''}
          style={{ color: val === index ? '#4659F1' : ''}}
        />
      ))}
    </Tabs>
  );
};

export default TabScroll;
