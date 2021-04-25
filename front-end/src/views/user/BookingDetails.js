import React, { useState, useEffect } from 'react'
import { CButton,CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useHistory, useLocation } from 'react-router-dom'

import axios from 'axios'
import Dashboard from '../dashboard/Dashboard'
const localStorageAuthKey = 'uber:auth';

const BookingDetails = (props) => {
    const [buses,setBuses] = useState([]) ;
    const history = useHistory()

    console.log(history)
    console.log(props)
        
    console.log(props.bookDetails.bus)
    console.log(props.bookDetails)
    const details = props.bookDetails.bus
    console.log(details)
    //const bus = buses.find( bus => bus._id === match.params.id)
  const busDetails = details ? Object.entries(details) : 
    [['_id', (<span><CIcon className="text-muted" name="cui-icon-ban" /> Not found</span>)]]

  return (
    <div>
    <Dashboard source={props.source} destination={props.destination}/>
    <CRow>
      <CCol lg={6}>
        <CCard>
          <CCardHeader>
            Booking id: {props.bookDetails._id}
          </CCardHeader>
          <CCardBody>
              <table className="table table-striped table-hover">
                <tbody>
                  {
                    busDetails.map(([key, value], index) => {
                      return (
                        <tr key={index}>
                          <td>{`${key}:`}</td>
                          <td><strong>{value}</strong></td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    </div>
  )
}

export default BookingDetails
