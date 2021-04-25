import React, { useState, useEffect } from 'react'
import { CButton,CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useHistory, useLocation } from 'react-router-dom'

import axios from 'axios'
import Dashboard from '../dashboard/Dashboard'
const localStorageAuthKey = 'uber:auth';

const Bus = ({match}) => {
    const [buses,setBuses] = useState([]) ;
    const history = useHistory()

    console.log(history)
    useEffect(function effectFunction() {
      let api_url = process.env.REACT_APP_URL;
        axios.get(api_url+'/bus/all', {headers: { "auth": localStorage.getItem(localStorageAuthKey) } })
            .then(response => {
              console.log(response);
              if (response.data !== "permission denied") {
                setBuses(response.data);
              } else {
                alert("ERROR: Unable to Fetch Buses!")
              }
            })
            .catch(error => {
              alert("ERROR: Unable to Fetch Buses!")
              console.log(error);
            });
           
      }, []);
       const handleSubmit = e => {
            console.log(window.location)
            e.preventDefault();
         let api_url = process.env.REACT_APP_URL;
            axios
              .delete(api_url+"/bus/delete/" + match.params.id, {headers: { "auth": localStorage.getItem(localStorageAuthKey) } })
              .then(response => {
                console.log(response);
                
                  window.location.pathname = "/buses";
              })
              .catch(error => {
                console.log(error);
              });
          }
        
    console.log(buses)
  const bus = buses.find( bus => bus._id === match.params.id)
  const busDetails = bus ? Object.entries(bus) : 
    [['_id', (<span><CIcon className="text-muted" name="cui-icon-ban" /> Not found</span>)]]

  return (
    <div>
    <Dashboard/>
    <CRow>
      <CCol lg={6}>
        <CCard>
          <CCardHeader>
            Bus id: {match.params.id}
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
              <CButton block color="danger" onClick={handleSubmit}>Delete</CButton>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    </div>
  )
}

export default Bus
