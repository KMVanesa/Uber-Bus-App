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

class GetBus extends Component {
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
        axios
          .post("http://54.83.37.177/trip/new",
            {
              "bus": {
                "start": this.state.start,
                "end": this.state.end
              },
              "user": this.state.user
            }
          )
          .then(response => {
            console.log(response);
            alert('Your Bus is on its way.')

          })
          .catch(error => {
            alert("ERROR: Unable to book Bus!")
            console.log(error);
          });
      }
    });
  };

  handleAlternate(e) {
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if (!err) {
        const values = {
          ...fieldsValue,
          role: 'driver'
        };
        console.log("Received values of form: ", values);
        axios
          .post("http://54.83.37.177/trip/search",
            {
              "start": this.state.start,
              "end": this.state.end,
              "date": this.state.date
            }
          )
          .then(response => {
            console.log(response);
          })
          .catch(error => {
            alert("ERROR: No Buses Found!")
            console.log(error);
          });
      }
    });
  }



  render() {
    const { getFieldDecorator } = this.props.form;
    let result = null;
    return (
      <Paper style={stylePaper}>

        <Form onSubmit={this.handleSubmit} className="signup-form">
          <div style={{ marginTop: '20px', marginBottom: '20px' }}>
            <div style={styleText}>
              Look for the Buses:
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
              onClick={this.handleAlternate.bind(this)}>
              SEARCH FOR AVAILABLE BUSES
            </Button>
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              className="signup-form-button"
            >
              BOOK A  BUS
            </Button>
          </FormItem>
          {result}
        </Form>
      </Paper>
    );
  }
}

const GetBusPage = Form.create()(GetBus);

export default GetBusPage;
