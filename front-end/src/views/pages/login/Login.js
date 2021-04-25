import React from 'react'
import { Link } from 'react-router-dom'
import {
  CButton,
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
import Dashboard from "../../dashboard/Dashboard.js"
const localStorageAuthKey = 'uber:auth';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      res_received: false,
      res: []
    };


  }
  saveAuthorisation(keys) {
    if (typeof Storage !== 'undefined') {
      try {

        localStorage.setItem(localStorageAuthKey, keys.access);

      } catch (ex) {
        console.log(ex);
      }
    } else {
      // No web storage Support :-(
    }
  }
  getAuthorisation() {
    if (typeof Storage !== 'undefined') {
      try {
        var keys = JSON.parse(localStorage.getItem(localStorageAuthKey));
        return keys;

      } catch (ex) {
        console.log(ex);
      }
    } else {
      // No web storage Support :-(
    }
  }

  handleSubmit = e => {

    e.preventDefault();
    let api_url = process.env.REACT_APP_URL ;
    alert(api_url)
    if(api_url){
      alert("yes")
    }else{
      alert("no")
    }
    axios
      .post(api_url+"/admin/login",
        {
          "username": this.state.username,
          "password": this.state.password
        }
      )
      .then(response => {
        console.log(response);
        this.setState({ res: response.data });
        if (response.data.access_token != null) {
          this.setState({ res_received: true });
          localStorage.setItem("loggedinuser", this.state.username);
          this.saveAuthorisation({
            access: response.data.access_token,
          });
          console.log(window.location)
          if (window.location.pathname.toLowerCase() == "/login") {
            window.location = window.location.reload();
          }
        } else {
          alert("ERROR: Login Failed!");
        }

      })
      .catch(error => {
        alert("ERROR: User name does not exists!");
        console.log(error);
      });
  };
  setUserName = (e) => {
    this.setState({ username: e.target.value })
  }
  setPassword = (e) => {
    this.setState({ password: e.target.value })
  }

  render() {
    return (
      <div>
        <Dashboard />
        <div className="c-app c-default-layout flex-row align-items-center">
          <CContainer>
            <CRow className="justify-content-center">
              <CCol md="8">
                <CCardGroup>
                  <CCard className="p-4">
                    <CCardBody>
                      <CForm>
                        <h1>Login</h1>
                        <p className="text-muted">Sign In to your account</p>
                        <CInputGroup className="mb-3">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <CIcon name="cil-user" />
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput type="text" placeholder="Username" autoComplete="username" onChange={this.setUserName} />
                        </CInputGroup>
                        <CInputGroup className="mb-4">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <CIcon name="cil-lock-locked" />
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput type="password" placeholder="Password" autoComplete="current-password" onChange={this.setPassword} />
                        </CInputGroup>
                        <CRow>
                          <CCol xs="6">
                            <CButton color="primary" className="px-4" onClick={this.handleSubmit}>Login</CButton>
                          </CCol>
                          <CCol xs="6" className="text-right">
                            <CButton color="link" className="px-0" onClick={() => window.location.pathname = "/"}>Go to Home?</CButton>
                          </CCol>
                        </CRow>
                      </CForm>
                    </CCardBody>
                  </CCard>
                  <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                    <CCardBody className="text-center">
                      <div>
                        <h2>Rides</h2>
                        <p>Airport runs. Daily commutes. A ride for clients. When your business needs to move, a ride can be requested in more than 10,000 cities worldwide.</p>
                        <CButton color="primary" className="mt-3" active tabIndex={-1}>Login Now!</CButton>
                      </div>
                    </CCardBody>
                  </CCard>
                </CCardGroup>
              </CCol>
            </CRow>
          </CContainer>
        </div>
      </div>
    )
  }
}

export default Login
