import React, { Component } from "react";
import "antd/dist/antd.css";
import HomePage from './HomePage'
import { Form } from "antd";
import LoginRefresh from "./LoginRefreshPage";

class Signup extends Component {
  state = {
    res: {},
    res_received: false
  };

  render() {

    const page = localStorage.getItem("loggedinuser") === "admin" ? <HomePage /> : <LoginRefresh />;
    return (
      <div>
        {page}
      </div>
    );
  }
}

const Sign_up = Form.create()(Signup);

export default Sign_up;
