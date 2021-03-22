import React, { Component } from "react";
import axios from "axios";
import "antd/dist/antd.css";
import "./Example.css";
import Paper from 'material-ui/Paper';
import TripDetails from './../Components/TripDetails';
import { Form, Input, Button } from "antd";
import BookingConfirmation from "./BookingConfirmation";


const stylePaper = {
  height: '500px',
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

class BookCab extends Component {
  state = {
    res: [],
    bookDetails: [],
    res_received: false,
    book: false
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
              "user": values.username,
              "bus": values.bus
            }
          )
          .then(response => {
            console.log(response.data);
            this.setState({ book: true })
            this.setState({ bookDetails: response.data })
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
              "start": values.start,
              "end": values.end,
              "date": values.date
            }
          )
          .then(response => {
            console.log(response.data);
            if (!Object.keys(response.data).length) {
              alert("no buses found");
            }

            this.setState({ res: response.data })
            this.setState({ res_received: true })
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
    let result = null
    if (this.state.res_received) {
      result = this.state.res_recieved;
    }
    const res = (this.state.book === false && result !== null) ? <TripDetails trips={this.state.res} /> : null;
    const bookres = this.state.book === true ? <BookingConfirmation trips={this.state.bookDetails} /> : null;
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
            {getFieldDecorator("start", {
              rules: [{ required: true, message: "Please input your Pick up location" }]
            })(<Input placeholder="Pick up location" />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator("end", {
              rules: [{ required: true, message: "Please input your Drop location" }]
            })(<Input placeholder="Drop location" />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator("date", {
              rules: [{ required: true, message: "Please input your Date" }]
            })(<Input placeholder="Date" />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator("bus", {
              rules: [{ message: "Please input your Bus id" }]
            })(<Input placeholder="Bus id" />)}
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
          {res}
          {bookres}
        </Form>
      </Paper>
    );
  }
}

const BookCabForm = Form.create()(BookCab);

export default BookCabForm;
