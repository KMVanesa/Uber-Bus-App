import React from 'react';
import Admin from './../Components/Admin';
import UserToolbar from './UserToolbar';
const styleDiv = {
  padding: '0px 127px',
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
