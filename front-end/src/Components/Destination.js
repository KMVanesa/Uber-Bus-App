import React, { Component } from "react";
import axios from "axios";
import "antd/dist/antd.css";
import "./Example.css";
import Paper from 'material-ui/Paper';
import { Form, Input, Button } from "antd";


const stylePaper = {
  height: '360px',
  width: '375px',
  background: '#f8f8f9',
  position: 'relative',
  marginLeft: '35%',
  marginTop: '70px'
};

const styleText = {
  marginLeft: '20px',
  marginTop: '20px',
  fontSize: '1.21429rem',
  fontFamily: 'ff-clan-web-pro,"Helvetica Neue",Helvetica,sans-serif!important',
  fontWeight: '400'
};

const FormItem = Form.Item;

class Signup extends Component {
  state = {
    res: {},
    res_received: false
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if (!err) {
        const values = {
          ...fieldsValue,
          role: 'driver'
        };
        console.log("Received values of form: ", values);
        localStorage.setItem('latitude', values.latitude);
        localStorage.setItem('longitude', values.longitude);
        const x = localStorage.getItem('latitude');
        const y = localStorage.getItem('longitude');
        axios
          .get("http://54.83.37.177/trip/all")
          .then(response => {
            console.log(response);
            localStorage.setItem('rides', response.data.auth_token)
            this.setState({ res: response.data });
            this.setState({ res_received: true });
            alert('Your Cab is on its way.')
          })
          .catch(error => {
            alert("ERROR: Unable to book your cab. Please try again!")
            console.log(error);
          });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    let result = null;
    if (this.state.res_received) {
      alert('Sign Up Succesful!');
      console.log(this.state.res_recieved);
    }

    return (
      <Paper style={stylePaper}>

        <Form onSubmit={this.handleSubmit} className="signup-form">
          <div style={{ marginTop: '20px', marginBottom: '20px' }}>
            <div style={styleText}>
              Look For the Cabs Near you
            </div>
          </div>
          <FormItem>
            {getFieldDecorator("username", {
              rules: [{ required: true, message: "Please input your Username" }]
            })(<Input placeholder="User Name" />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator("latitude", {
              rules: [{ required: true, message: "Please input your Pick up location" }]
            })(<Input placeholder="Pick up location" />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator("longitude", {
              rules: [{ required: true, message: "Please input your Drop location" }]
            })(<Input placeholder="Drop location" />)}
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              className="signup-form-button"
            >
              BOOK A  CAB
            </Button>
          </FormItem>
          {result}
        </Form>
      </Paper>
    );
  }
}

const Sign_up = Form.create()(Signup);

export default Sign_up;
