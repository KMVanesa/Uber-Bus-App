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
 
    handleSubmit = e => {

        e.preventDefault();
        this.props.form.validateFields((err, fieldsValue) => {
          if (!err) {
            const values = {
              ...fieldsValue,        
            };
            console.log("Received values of form: ", values);
            axios
              .post("http://54.205.209.4/admin/login", 
                  {
                      "username": values.firstname,
                      "password": values.password
                  }
              )
              .then(response => {
                console.log(response);
                localStorage.setItem('AuthToken' ,response.data.auth_token)
                this.setState({ res: response.data });
                if(response.data==="Login Success"){
                  this.setState({ res_received: true });
                  localStorage.setItem("loggedinuser",values.firstname);
                  alert("Login Succesful");            
                }else{
                  alert("ERROR: Login Failed!");
                }
                if(!window.location.hash) {
                  window.location = window.location + '#loaded';
                  window.location.reload();
              }
              })
              .catch(error => {
                alert("ERROR: User name does not exists!");
                console.log(error);
              });
          }
        });
      };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Paper style={stylePaper}>
        <Form onSubmit={this.handleSubmit} className="signup-form">
          <div style={{marginLeft:'0px', marginBottom: '40px'}}>
              <Avatar src={SignInImage} size='80px' />  
              <div style={styleText}>
                Ride With Uber
              </div>
          </div>
          <FormItem>
            {getFieldDecorator("firstname", {
              rules: [{ required: true, message: "Please input your First Name!" }]
            })(<Input placeholder="First Name" />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator("password", {
              rules: [
                { required: true, message: "Please input your Password!" },
                { min: 8, message: "Minimum password length is 8 characters" }
              ]
            })(<Input type="password" placeholder="Password" />)}
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              className="signup-form-button"
            >
              LOGIN
            </Button>
          </FormItem>
        </Form>
      </Paper>
    );
  }
}

const LoginRefresh = Form.create()(Signup);

export default LoginRefresh;
