import React from 'react'
import Dashboard from "../dashboard/Dashboard.js"
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCardText,
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
import BookingDetails from '../user/BookingDetails.js'
class BookARide extends React.Component{
  constructor (props){
    super(props);
    
    this.state = {
      username: "",
      pickup:"",
      drop:"",
      date:"",
      busid:"",
      bookDetails: [],
      res_received: false,
      res:[],
      book:false
      };
    
  
  }
 
  handleSubmit = e => {
    e.preventDefault();    
    let api_url = process.env.REACT_APP_URL;
    axios.post(api_url+"/trip/new",
            {
              "user": this.state.username,
              "bus": this.state.busid
            }
          )
          .then(response => {
            console.log(response.data);
            if(response.data.bus!=null){
              this.setState({ bookDetails: response.data })
              this.setState({ res_received: true })
            }else{
              this.setState({ book: true })
            }
            
          })
          .catch(error => {
            this.setState({ book: true })
            console.log(error);
          });
  }
   setUserName = (e) =>{
    this.setState({username:e.target.value})
  }
   setPickup = (e) =>{
    this.setState({pickup:e.target.value})
  }
  setDrop = (e) =>{
    this.setState({drop:e.target.value})
  }
  setDate = (e) =>{
    this.setState({date:e.target.value})
  }
  setBusid = (e) =>{
    this.setState({busid:e.target.value})
  }

  render(){
  return (
    <div className="justify-content-left">
        <Dashboard source={this.state.pickup} destination={this.state.drop}/>
        {this.state.res_received==true?<BookingDetails bookDetails = {this.state.bookDetails} source={this.state.pickup} destination={this.state.drop}/>:
            <CRow md="2">
            <CCol md="4">
                <CCardGroup>
                <CCard className="p-4">
                    <CCardBody>
                    <CForm>
                        <h1>Book A Bus</h1>
                        <p className="text-muted">Please Enter the below deails</p>
                        <CInputGroup className="mb-3">
                        <CInputGroupPrepend>
                            <CInputGroupText>
                            <CIcon name="cil-user" />
                            </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput type="text" placeholder="Username" autoComplete="username" onChange={this.setUserName}/>
                        </CInputGroup>
                        <CInputGroup className="mb-4">
                        <CInputGroupPrepend>
                            <CInputGroupText>
                            <CIcon name="cil-bus-alt" />
                            </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput type="text" placeholder="Pick Up Location" onChange={this.setPickup}/>
                        </CInputGroup>
                        <CInputGroup className="mb-4">
                        <CInputGroupPrepend>
                            <CInputGroupText>
                            <CIcon name="cil-bus-alt" />
                            </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput type="text" placeholder="Drop Location" onChange={this.setDrop}/>
                        </CInputGroup>
                        <CInputGroup className="mb-4">
                        <CInput type="date" id="date-input" name="date-input" placeholder="date" onChange={this.setDate}/>
                        </CInputGroup>
                        <CInputGroup className="mb-4">
                        <CInputGroupPrepend>
                            <CInputGroupText>
                            <CIcon name="cil-bus-alt" />
                            </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput type="number" placeholder="BusId" onChange={this.setBusid}/>
                        </CInputGroup>
                        <CRow>
                        <CCol xs="6">
                            <CButton color="primary" className="px-4" onClick={this.handleSubmit}>Book A Cab</CButton>
                            {this.state.book==true?
                        <CCardText className="text-danger">Please Enter Valid Values</CCardText>
                        :null}
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

export default BookARide
