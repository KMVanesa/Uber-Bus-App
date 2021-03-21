import React from 'react';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton';
import {Tabs, Tab} from 'material-ui/Tabs';

const styleDiv = {
  padding: '0px 127px',
};

const styleToolbar = {
  background: 'white',
  padding: '0px',
};

const styleUber = {
  margin: '0px', 
};

const styleTabs = {
  marginLeft: '28px',
  background: 'white',
};

const StyleTab = {
  TabLeft : {
  padding: '0px 20px',
  borderTop: '4px',
  background: 'white',
  color: 'black',
  textTransform: 'capitalize',
  },
  TabRight: {
    padding: '0px',
    margin: '0px',
    borderTop: '4px',
    background: 'white',
    color: 'black',
  },
};

const styleInkBar = {
  background:'white',
};

export default class Admin extends React.Component {

  render() {
    return (
      <div style={styleDiv}>
        <Toolbar style={styleToolbar}>
          <ToolbarGroup>
            <FlatButton 
              label='UBER' 
              hoverColor='white'
              style= {styleUber}
              href="/"
            /> 
            <Tabs style={styleTabs} inkBarStyle={styleInkBar}>
              <Tab label="Add a Bus" style={StyleTab.TabLeft} href="/addBus">
              </Tab>
              <Tab label="View Buses" style={StyleTab.TabLeft} href="/viewBuses">
              </Tab>
              <Tab label="Delete A Bus" style={StyleTab.TabLeft} href="/deleteBus">
              </Tab>
              <Tab label="Your Rides" style={StyleTab.TabLeft} href="/yourRides">
              </Tab>
            </Tabs> 
          </ToolbarGroup>
          <ToolbarGroup>
            <FlatButton label="Log out" style={StyleTab.TabRight}  href="/Logout"/>
          </ToolbarGroup>
        </Toolbar>
      </div>  
    );
  }
}
