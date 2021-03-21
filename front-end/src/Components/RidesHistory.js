import React, { Component } from "react";
import axios from "axios";
import "antd/dist/antd.css";
import "./Example.css";
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import DriverImage from './Images/driver.jpg';
import { Form, Input, Button } from "antd";
import Table from "../Components/Table";

    
  class RidesHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
          rides: []
        };
      }
    componentDidMount(){
        fetch('http://localhost:5000/trip/all').then(response => response.json())
        .then((data) => {
        for (let i = 0; i < data.length; i++) {
            this.setState({
            rides: data[i].rides
            });
            console.log(data[i])   
        }
        })
    }
         
  
    render() {  
      return (
        <Paper >
           <Table rides={ this.state.rides } />
        </Paper>
      );
    }
  }
const Rides_History = Form.create()(RidesHistory);

export default Rides_History;
