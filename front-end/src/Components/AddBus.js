import React, { Component } from "react";
import axios from "axios";
import "antd/dist/antd.css";
import "./UserSignIn.css";
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import SignInImage from './Images/download.jpg';
import { Form, Input, Button } from "antd";
import { locales } from "moment";

const stylePaper = {
  height: '640px',
  width: '400px',
  background: '#f8f8f9',
  position: 'relative',
  marginLeft: '35%',
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

class AddBus extends Component {
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
          role: 'user'
        };
        //delete values[""];
        console.log("Received values of form: ", values);
        axios
          .post("http://54.83.37.177/bus/new", {
            "bus_id": values.busid,
            "start": values.start,
            "end": values.end,
            "date": values.date,
            "duration": values.duration,
            "time": values.time,
            "seats": values.seats

          }
          )
          .then(response => {
            console.log(response.data);
            if (response.data !== "permission denied") {
              this.setState({ res: response.data });
              this.setState({ res_received: true });
            } else {
              alert("ERROR While Adding Bus!");
            }
          })
          .catch(error => {
            alert("ERROR While Adding Bus!");
            console.log(error);
          });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    let result = null;
    if (this.state.res_received) {
      alert('Bus has been added succesfully.');
      console.log(this.state.res_recieved);
    }

    return (
      <Paper style={stylePaper}>

        <Form onSubmit={this.handleSubmit} className="signup-form">
          <div style={{ marginLeft: '0px', marginBottom: '40px' }}>
            <Avatar src={SignInImage} size='80px' />
            <div style={styleText}>
              Ride With Uber
              </div>
          </div>
          <FormItem>
            {getFieldDecorator("busid", {
              rules: [{ required: true, message: "Please input your Bus id!" }]
            })(<Input placeholder="Bus Id" />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator("start", {
              rules: [{ required: true, message: "Please input your Pick Up Location!" }]
            })(<Input placeholder="Pick Up Location" />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator("end", {
              rules: [
                {
                  required: true,
                  message: "Please input your Drop Location!"
                }
              ]
            })(<Input placeholder="Drop Location" />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator("date", {
              rules: [
                { required: true, message: "Please input your Date!" }]
            })(<Input type="text" placeholder="Date" />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator("duration", {
              rules: [
                { required: true, message: "Please input Duraion!" }]
            })(<Input type="text" placeholder="Duration" />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator("time", {
              rules: [
                { required: true, message: "Please input your Time!" }]
            })(<Input type="text" placeholder="Time" />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator("seats", {
              rules: [
                { required: true, message: "Please input your Seats!" }]
            })(<Input type="text" placeholder="Seats" />)}
          </FormItem>

          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              className="signup-form-button"
            >
              ADD A BUS
            </Button>
          </FormItem>
          {result}
        </Form>
      </Paper>
    );
  }
}

const AddBusPage = Form.create()(AddBus);

export default AddBusPage;
