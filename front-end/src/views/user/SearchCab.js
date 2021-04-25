import React from 'react'
import Dashboard from "../dashboard/Dashboard.js"
import Moment from 'moment';
import axios from 'axios'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import SearchBuses from "./SearchBuses.js"


const minDate = new Date(Date.now());

class SearchCab extends React.Component{
  constructor (props){
    super(props);
    
    this.state = {
      username: "",
      pickup:"",
      drop:"",
      date: new Date(),
      buses:[],
      res_received:false
      }

    }
     
  handleSubmit = e => {
    e.preventDefault();
    const dateFormat = Moment(this.state.date).format('DD/MM/YYYY')
    let api_url = process.env.REACT_APP_URL;
    axios.post(api_url+"/trip/search",
            {
                "start": this.state.pickup,
                "end": this.state.drop,
                "date": dateFormat
            }
          )
          .then(response => {
            console.log(response.data)
            this.setState({buses:response.data})
            this.setState({res_received:true})
          })
          .catch(error => {
            alert("ERROR: Unable to Search Buses!")
            console.log(error);
          });   
    }
  
   setPickup = (e) =>{
    this.setState({pickup:e.target.value})
  }
  setDrop = (e) =>{
    this.setState({drop:e.target.value})
  }
  setDate (date){
    this.setState({date})
  }
  handleChange= (e) =>{
    console.log(e)
    this.setState({
      date: e.target.value
    })
  }
  render(){
  return (
    <div className="justify-content-left">
              <Dashboard source={this.state.pickup} destination={this.state.drop}/>
      {this.state.res_received == true ? <SearchBuses buses={this.state.buses} source={this.state.pickup} destination={this.state.drop} /> : 
            <CRow md="2">
            <CCol md="4">
                <CCardGroup>
                <CCard className="p-4">
                    <CCardBody>
                    <CForm>
                        <h1>Search For Buses</h1>
                        <p className="text-muted">Please Enter the below deails</p>
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
                        {/* <DatePicker onChange={this.handleChange} selected={this.state.date} min={minDate}/> */}
                        <CInput type="date" id="date-input" name="date-input" placeholder="date" onChange={this.handleChange} min={minDate}/>
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

export default SearchCab
