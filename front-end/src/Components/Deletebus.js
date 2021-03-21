import React, { Component } from "react";
import axios from "axios";
import "antd/dist/antd.css";
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import SignInImage from './Images/download.jpg';
import { Form, Input, Button } from "antd";


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

class DeleteBus extends Component {
  state = {
    "username": "",
    "id": "",
    "start":"",
    "end":"",
    "duration":"",
    "seats":"",
    "date":"",
    "time":""
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
          .delete("http://localhost:5000/bus/delete/"+values.busid
              
          )
          .then(response => {
            console.log(response);
                this.setState({ res: response.data });
                this.setState({ res_received: true });
                alert("Bus Deleted Succesfully");

            
          })
          .catch(error => {
            alert("ERROR: Please check your User Bus id");
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
                Delete your Bus
              </div>
          </div>
          <FormItem>
            {getFieldDecorator("busid", {
              rules: [{ required: true, message: "Please input your Busid!" }]
            })(<Input placeholder="Busid" />)}
          </FormItem>
          
          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              className="signup-form-button"
            >
              DELETE
            </Button>
          </FormItem>
        </Form>
      </Paper>
    );
  }
}

const DeleteBusPage = Form.create()(DeleteBus);

export default DeleteBusPage;
