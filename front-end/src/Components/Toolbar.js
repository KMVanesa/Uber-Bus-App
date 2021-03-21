import React from 'react';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton';
import {Tabs, Tab} from 'material-ui/Tabs';
import Admin from './../Components/Admin';
import UserToolbar from './UserToolbar';
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

export default class ToolbarExamplesSimple extends React.Component {

  render() {
    var user = localStorage.getItem("loggedinuser");
    const toolbar = user!=="admin"?<UserToolbar/>:<Admin/>;
    console.log("userrrrrr  "+user)
    return (
      <div style={styleDiv}>
              {toolbar}

        
      </div>  
    );
  }
}
