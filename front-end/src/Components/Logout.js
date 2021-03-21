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
    reload:false,
    res_received: false
  };

  componentDidMount(){
        axios
          .get("http://localhost:5000/admin/logout")
          .then(response => {
            console.log(response);
            this.setState({ res_received: true });
            localStorage.removeItem("loggedinuser")
            this.setState({reload:true})
            console.log(localStorage.getItem("loggedinuser"));
            //if(this.state.reload)window.location.reload();
            this.setState({reload:false})
          })
          .catch(error => {
            alert("ERROR: Unable to logout!");
            console.log(error);
          });
      
  };

  render() {
   // this.state.res_received 
    // const result = localStorage.getItem("loggedinuser")!== "admin" ?
    // <Home/> :
    //null;
    return (
      <Paper style={stylePaper}>
        
          <div style={{marginLeft:'0px', marginBottom: '40px'}}>
              <Avatar src={SignInImage} size='120px'/>  
              <div style={styleText}>
                You have been Logged Out Succesfully
              </div>
             { window.onload = function() {
                  if(!window.location.hash) {
                      window.location = window.location + '#loaded';
                      window.location.reload();}
                  }
              }
          </div>
          
      </Paper>
    );
    
  }
}

const Logout = Form.create()(LogoutPage);

export default Logout;
