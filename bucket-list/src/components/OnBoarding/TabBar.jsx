import React, { useState } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from './TabPanel';

import Login from './Login';
import RegisterWithFormik from './RegisterWithFormik';

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
};

const TabBar = prop => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <AppBar position='static'>
      <Tabs value={ value } onChange={ handleChange }>
        <Tab label='Register' {...a11yProps(0)} />
        <Tab label='Login' {...a11yProps(1)} />
      </Tabs>

      <TabPanel value={ value } index={ 0 }>
        <RegisterWithFormik />
      </TabPanel>

      <TabPanel value={ value } index={ 1 }>
        <Login />
      </TabPanel>
    </AppBar>
  )
};

export default TabBar;
