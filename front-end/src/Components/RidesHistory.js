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
  componentDidMount() {
    axios.get('http://54.83.37.177/trip/all')
      .then(response => {
        console.log(response.data);
        if (response.data !== "permission denied") {
          this.setState({ rides: response.data });
          this.setState({ res_received: true });
        } else {
          alert("ERROR While Loading Rides!");
        }
      })
  }


  render() {
    return (
      <Paper >
        <Table rides={this.state.rides} />
      </Paper>
    );
  }
}
const Rides_History = Form.create()(RidesHistory);

export default Rides_History;
