import React from 'react';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton';
import { Tabs, Tab } from 'material-ui/Tabs';
const styleDiv = {
  padding: '0px 0px',
};

const styleToolbar = {
  background: 'white',
  padding: '0px',
};

const styleUber = {
  margin: '0px',
  hoverColor:'grey',
};

const styleTabs = {
  marginLeft: '28px',
  background: 'white',
};

const StyleTab = {
  TabLeft: {
    padding: '0px 20px',
    borderTop: '4px',
    background: 'white',
    color: 'black',
    textTransform: 'capitalize',
    hoverColor: 'grey'
  },
  TabRight: {
    padding: '0px',
    margin: '0px',
    borderTop: '4px',
    background: 'white',
    color: 'black',
    hoverColor: 'grey'
  },
};

const styleInkBar = {
  background: 'white',
};

export default class UserToolbar extends React.Component {

  render() {
    return (
      <div style={styleDiv}>

        <Toolbar style={styleToolbar}>
          <ToolbarGroup>
            <FlatButton
              label='Uber bus Service'
              labelStyle={{fontSize:'larger'}}
              hoverColor='white'
              style={styleUber}
              href="/" />
            <Tabs style={styleTabs} inkBarStyle={styleInkBar}>
              <Tab label="Book Bus" style={StyleTab.TabLeft} href="/bookACab">
              </Tab>
              <Tab label="Search Bookings" style={StyleTab.TabLeft} href="/search">
              </Tab>
            </Tabs>
          </ToolbarGroup>
          <ToolbarGroup>
            <FlatButton label="Login" style={StyleTab.TabRight} href="/Login" />
          </ToolbarGroup>
        </Toolbar>
      </div>
    );
  }
}
