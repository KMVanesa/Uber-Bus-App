import React, { Component } from "react";
import axios from "axios";
import "antd/dist/antd.css";
import "./Example.css";
import Paper from 'material-ui/Paper';
import { Form } from "antd";
import BusDetails from './../Components/BusDetails'



class GetBus extends Component {
  state = {
    buses: {},
    res_received: false
  };

  componentDidMount() {
    axios
      .get("http://54.83.37.177/bus/all")
      .then(response => {
        console.log(response);
        if (response.data !== "permission denied") {
          this.setState({ buses: response.data })
          this.setState({ res_received: true })
        } else {
          alert("ERROR: Unable to Fetch Buses!")
        }
      })
      .catch(error => {
        alert("ERROR: Unable to Fetch Buses!")
        console.log(error);
      });

  }

  render() {
    let result = null;
    if (this.state.res_received) {
      result = this.state.res_recieved;
      console.log(this.state.res_recieved);
    }
    const res = result !== null ? <BusDetails buses={this.state.buses} /> : null;

    return (
      <Paper >

        {res}
      </Paper>
    );
  }
}

const GetBusPage = Form.create()(GetBus);

export default GetBusPage;
