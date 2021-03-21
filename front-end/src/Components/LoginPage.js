import React, { Component } from "react";
import "antd/dist/antd.css";
import HomePage from './../Components/HomePage'
import { Form, Input, Button } from "antd";
import LoginRefresh from "./LoginRefreshPage";

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

class Signup extends Component {
  state = {
    res: {},
    res_received: false
  };

  render() {
    let result = null;
    const page = localStorage.getItem("loggedinuser")==="admin"?<HomePage/>:<LoginRefresh/>;
    return(
      <div>
      {page}
      </div>
      );
  }
}

const Sign_up = Form.create()(Signup);

export default Sign_up;
