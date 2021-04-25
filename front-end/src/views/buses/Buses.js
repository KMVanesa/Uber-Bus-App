import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
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
import axios from "axios"
import Dashboard from '../dashboard/Dashboard'

const getBadge = status => {
  switch (status) {
    case 0: return 'success'
    case 1: return 'secondary'
    default: return 'primary'
  }
}
const localStorageAuthKey = 'uber:auth';

const Buses = () => {
  
  const [buses,setBuses] = useState([]) ;
  const history = useHistory()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [page, setPage] = useState(currentPage)

  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/buses?page=${newPage}`)
  }
  useEffect(function effectFunction() {
    console.log(localStorage.getItem(localStorageAuthKey))
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
  useEffect(() => {
    currentPage !== page && setPage(currentPage)
  }, [currentPage, page])

  

  return (
    <div>
      <Dashboard/>
    <CRow>
      <CCol xl={6}>
        <CCard>
          <CCardHeader>
            Buses
          </CCardHeader>
          <CCardBody>
          <CDataTable
            items={buses}
            fields={[
              { key: '_id', _classes: 'font-weight-bold' },
              'start', 'end'
            ]}
            hover
            striped
            itemsPerPage={5}
            activePage={page}
            clickableRows
            onRowClick={(item) => history.push(`/buses/${item._id}`)}
            scopedSlots = {{
              'seats':
                (item)=>(
                  <td>
                    <CBadge color={getBadge(item.seats)}>
                      {item.seats}
                    </CBadge>
                  </td>
                )
            }}
          />
          <CPagination
            activePage={page}
            onActivePageChange={pageChange}
            pages={5}
            doubleArrows={false} 
            align="center"
          />
          <CButton color="primary" className="px-4" onClick={() => history.push(`/addbus`)}>Add New Bus</CButton>
          </CCardBody>
        </CCard>
      </CCol>
      

    </CRow>
    </div>
    
  )
}

export default Buses
