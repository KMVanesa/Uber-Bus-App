import React, { Component } from "react";
import axios from "axios";
import "antd/dist/antd.css";
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import SignInImage from './Images/download.jpg';
import { Form, Input, Button } from "antd";
import { locales } from "moment";

const stylePaper = {
    height: '230px',
    width: '400px',
    background: '#f8f8f9',
    position: 'relative',
    marginLeft:'35%',
    marginTop: '70px'
};

const styleText = {
    marginLeft: '50px',
    marginTop: '10px',
    marginRight: '50px',
    fontSize: '1.5rem',
    fontFamily: 'ff-clan-web-pro,"Helvetica Neue",Helvetica,sans-serif!important',
    fontWeight: '300'
};


class LogoutPage extends Component {
  state = {
    res: {},
    res_received: false
  };

  handleSubmit = e => {
    e.preventDefault();
        axios
          .get("http://localhost:5000/admin/logout")
          .then(response => {
            console.log(response);
            this.setState({ res_received: true });
          })
          .catch(error => {
            alert("ERROR: Unable to logout!");
            console.log(error);
          });
      
  };

  render() {
   // this.state.res_received 
    // const result = this.state.res_received !== undefined ?
    // <Polarity sentence={this.state.sentence} polarity={this.state.polarity}/> :
    // null;
    return (
      <Paper style={stylePaper}>
        
          <div style={{marginLeft:'0px', marginBottom: '40px'}}>
              <Avatar src={SignInImage} size='120px'/>  
              <div style={styleText}>
                You have been Logged Out Succesfully
              </div>
          </div>
          
      </Paper>
    );
    
  }
}

const Logout = Form.create()(LogoutPage);

export default Logout;
