import React, { Component } from "react";
import axios from "axios";
import "antd/dist/antd.css";
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import SignInImage from './Images/download.jpg';
import HomePage from './../Components/HomePage'
import { Form, Input, Button } from "antd";
import { Redirect } from 'react-router'
import { locales } from "moment";
import LoginRefresh from "./LoginRefreshPage";

const stylePaper = {
    height: '330px',
    width: '400px',
    background: '#f8f8f9',
    position: 'relative',
    marginLeft:'35%',
    marginTop: '70px'
};

const styleText = {
    marginLeft: '100px',
    marginTop: '-50px',
    fontSize: '1.71429rem',
    fontFamily: 'ff-clan-web-pro,"Helvetica Neue",Helvetica,sans-serif!important',
    fontWeight: '400'
};

const FormItem = Form.Item;

class Signup extends Component {
  state = {
    res: {},
    res_received: false
  };

  

  render() {
    //const { getFieldDecorator } = this.props.form;
    let result = null;
    const page = localStorage.getItem("loggedinuser")==="admin"?<HomePage/>:<LoginRefresh/>;
    //localStorage.getItem("loggedinuser")==="admin"?
    return(
      <div>
      {page}
      </div>
      );

    // return (
    //   <Paper style={stylePaper}>
    //     <Form onSubmit={this.handleSubmit} className="signup-form">
    //       <div style={{marginLeft:'0px', marginBottom: '40px'}}>
    //           <Avatar src={SignInImage} size='80px' />  
    //           <div style={styleText}>
    //             Ride With Uber
    //           </div>
    //       </div>
    //       <FormItem>
    //         {getFieldDecorator("firstname", {
    //           rules: [{ required: true, message: "Please input your First Name!" }]
    //         })(<Input placeholder="First Name" />)}
    //       </FormItem>
    //       <FormItem>
    //         {getFieldDecorator("password", {
    //           rules: [
    //             { required: true, message: "Please input your Password!" },
    //             { min: 8, message: "Minimum password length is 8 characters" }
    //           ]
    //         })(<Input type="password" placeholder="Password" />)}
    //       </FormItem>
    //       <FormItem>
    //         <Button
    //           type="primary"
    //           htmlType="submit"
    //           className="signup-form-button"
    //         >
    //           LOGIN
    //         </Button>
    //       </FormItem>
    //     </Form>
    //   </Paper>
    // );
  }
}

const Sign_up = Form.create()(Signup);

export default Sign_up;
