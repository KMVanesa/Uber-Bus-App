import React, { useState, useEffect } from 'react'
import { CButton,CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useHistory, useLocation } from 'react-router-dom'
import Dashboard from "../dashboard/Dashboard.js"
import axios from 'axios'
const localStorageAuthKey = 'uber:auth';
const Ride = ({match}) => {
    const [rides,setRides] = useState([]) ;
    const history = useHistory()

    console.log(history)
    useEffect(function effectFunction() {
        axios.get('http://localhost:5000/trip/all', {headers: { "auth": localStorage.getItem(localStorageAuthKey) } })
            .then(response => {
              console.log(response);
              if (response.data !== "permission denied") {
                setRides(response.data);
              } else {
                alert("ERROR: Unable to Fetch Rides!")
              }
            })
            .catch(error => {
              alert("ERROR: Unable to Fetch Rides!")
              console.log(error);
            });
           
      }, []);
       
  const ride = rides.find( ride => ride._id === match.params.id)
  const bus = ride!==undefined?ride.bus:undefined;
  console.log(ride)
  const rideDetails = bus ? Object.entries(bus) : 
    [['_id', (<span><CIcon className="text-muted" name="cui-icon-ban" /> Not found</span>)]]

  return (
    <div>
      <Dashboard/>
      <CRow>
        <CCol lg={6}>
          <CCard>
            <CCardHeader>
              Trip id: {match.params.id}
            </CCardHeader>
            <CCardBody>
                <table className="table table-striped table-hover">
                
                  <tbody>
                      {  rideDetails.map( ([key,value], index) => {
                      return (
                          
                          <tr key={index}>
                          <td>{`${key}:`}</td>
                          <td><strong>{value}</strong></td>
                        </tr>
                      )
                  }) }
                  </tbody>
                </table>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  )
}

export default Ride
