import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import {
  CFormGroup,
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CPagination, CButton, CContainer
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import axios from "axios"
import Dashboard from "../dashboard/Dashboard.js"
const getBadge = status => {
  switch (status) {
    case 0: return 'success'
    case 1: return 'secondary'
    default: return 'primary'
  }
}

const RideDetail = (props) => {
  
  const [rides,setRides] = useState(props.rides) ;
  const id = rides[0]!==undefined?rides[0]._id:undefined;
  const details = rides[0]!==undefined?rides[0].bus:undefined;
  const busDetails = details ? Object.entries(details) : 
  [['_id', (<span><CIcon className="text-muted" name="cui-icon-ban" /> Not found</span>)]]
  // useEffect(function effectFunction() {
  //      setRides(props.rides)
  // }, []);
  // console.log(props.rides)
  // console.log(rides.bus)
  // const trip = 
  const handleSubmit = e => {
    console.log(window.location)
    e.preventDefault();
    let api_url = process.env.REACT_APP_URL;
    axios
      .delete(api_url+`/trip/delete/${rides[0].user}/${rides[0]._id}`)
      .then(response => {
        console.log(response);
        window.location.pathname="/dashboard"
      })
      .catch(error => {
        alert("ERROR: Please check your Trip id");
        console.log(error);
      });
  }
  return (
    <div>
      <Dashboard/>
      <CRow>
        <CCol lg={6}>
          <CCard>
            <CCardHeader>
              Trip id: {id}
            </CCardHeader>
            <CCardBody>
                <table className="table table-striped table-hover">
                
                  <tbody>
                      {  busDetails.map( ([key,value], index) => {
                      return (
                          
                          <tr key={index}>
                          <td>{`${key}:`}</td>
                          <td><strong>{value}</strong></td>
                        </tr>
                      )
                  }) }
                  </tbody>
                </table>
                {id!==undefined?
                <CButton block color="danger" onClick={handleSubmit}>Delete</CButton>
                :null}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
    
  )
}

export default RideDetail
