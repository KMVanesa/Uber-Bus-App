import React, { Component } from "react";
import axios from "axios";
import "antd/dist/antd.css";
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import SignInImage from './Images/download.jpg';
import { Form, Input, Button } from "antd";
import BookingDetails from './../Components/BookingDetails';


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

class Search extends Component {
  state = {
    "trip":{},
    "res_received":false
  };

  handleSubmit = e => {

    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if (!err) {
        const values = {
          ...fieldsValue,        
        };
        console.log("Received values of form: ", values);
        axios
          .post("http://localhost:5000/trip/booking", 
              {
                  "user": values.username,
                  "trip_id": values.bookingid
              }
          )
          .then(response => {
            console.log(response.data);
            localStorage.setItem('AuthToken' ,response.data.auth_token)
            this.setState({ trip: response.data });
            this.setState({ res_received: true });
          })
          .catch(error => {
            alert("ERROR: Please check your User name/Booking id");
            console.log(error);
          });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    let result = null;
    if (this.state.res_received) {
      result = this.state.res_recieved;
      console.log(this.state.res_recieved);
    }
    const res = result!==null?<BookingDetails trips={this.state.trip}/>:null;
    return (
      <Paper style={stylePaper}>
        
        <Form onSubmit={this.handleSubmit} className="signup-form">
          <div style={{marginLeft:'0px', marginBottom: '40px'}}>
              <Avatar src={SignInImage} size='80px' />  
              <div style={styleText}>
                Search your Bookings
              </div>
          </div>
          <FormItem>
            {getFieldDecorator("username", {
              rules: [{ required: true, message: "Please input your User Name!" }]
            })(<Input placeholder="Username" />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator("bookingid", {
              rules: [
                { required: true, message: "Please input your Bookingid!" },
              ]
            })(<Input type="text" placeholder="Booking Id" />)}
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              className="signup-form-button"
            >
              SEARCH
            </Button>
          </FormItem>
          {res}
        </Form>
      </Paper>
    );
  }
}

const SearchPage = Form.create()(Search);

export default SearchPage;
