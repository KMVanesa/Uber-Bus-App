import React from 'react'
import { Link } from 'react-router-dom'
import {
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import axios from "axios";

const localStorageAuthKey = 'uber:auth';

class Logout extends React.Component{
  constructor (props){
    super(props);
    
    this.state = {
      username: "",
      password:"",
      res_received: false,
      res:[],
      modal:true
      };
  }
  logout() {
    if (typeof Storage !== 'undefined') {
      try {
          localStorage.removeItem(localStorageAuthKey);
      } catch (ex) {
          console.log(ex);
      }
    } else {
        // No web storage Support :-(
    }
  }
  componentDidMount() {
    let api_url = process.env.REACT_APP_URL;
    axios
      .get(api_url+"/admin/logout")
      .then(response => {
        console.log(response);
        this.setState({ res_received: true });
        localStorage.removeItem("loggedinuser")
        console.log(localStorage.getItem("loggedinuser"));
        this.logout()
        if(this.state.res_received)
            window.location.pathname = "/dashboard";
      })
      .catch(error => {
        alert("ERROR: Unable to logout!");
        console.log(error);
      });

  };
  render(){
  return (
    <div>
      {}
    </div>
  )
}
}

export default Logout
