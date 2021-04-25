import React from 'react'
import Dashboard from "../dashboard/Dashboard.js"
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
import RideDetail from './RideDetail.js';
import axios from "axios"
class MyRides extends React.Component{
  constructor (props){
    super(props);
    
    this.state = {
      username: "",
      bookingid:"",
      res_received:false,
      rides:[]
      }
    }
 
  handleSubmit = e => {
    e.preventDefault();   
    console.log(window.location) 
    let api_url = process.env.REACT_APP_URL;
    axios
          .post(api_url+"/trip/booking",
            {
              "user": this.state.username,
              "trip_id": this.state.bookingid
            }
          )
          .then(response => {
            console.log(response.data)
            this.setState({rides:response.data})
            this.setState({res_received:true})
          })
          .catch(error => {
            alert("ERROR: Please check your User name/Booking id");
            console.log(error);
          });
    }
  
  
  setUsername = (e) =>{
    this.setState({username:e.target.value})
  }
  setBookingid = (e) =>{
    this.setState({bookingid:e.target.value})
  }
  
  render(){
  return (
    <div className="justify-content-left">
        <Dashboard/>
        {this.state.res_received==true?<RideDetail rides={this.state.rides}/>:
            <CRow md="2">
            <CCol md="4">
                <CCardGroup>
                <CCard className="p-4">
                    <CCardBody>
                    <CForm>
                        <h1>Search For Your Trip</h1>
                        <p className="text-muted">Please Enter the below deails</p>
                        <CInputGroup className="mb-4">
                        <CInputGroupPrepend>
                            <CInputGroupText>
                            <CIcon name="cil-user" />
                            </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput type="text" placeholder="User Name" onChange={this.setUsername}/>
                        </CInputGroup>
                        <CInputGroup className="mb-4">
                        <CInputGroupPrepend>
                            <CInputGroupText>
                            <CIcon name="cil-bus-alt" />
                            </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput type="text" placeholder="Bookingid id" onChange={this.setBookingid}/>
                        </CInputGroup>
                        <CRow>
                        <CCol xs="6">
                            <CButton color="primary" className="px-4" onClick={this.handleSubmit}>Search</CButton>
                        </CCol>
                        </CRow>
                    </CForm>
                    </CCardBody>
                </CCard>
                </CCardGroup>
            </CCol>
            </CRow>
  }
    </div>
  )
}
}

export default MyRides
