import React, { useState, useEffect } from 'react'
import Dashboard from "../dashboard/Dashboard.js"
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

const getBadge = status => {
  switch (status) {
    case 0: return 'success'
    case 1: return 'secondary'
    default: return 'primary'
  }
}

const SearchBuses = (props) => {
  
  const history = useHistory()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [page, setPage] = useState(currentPage)
  const [buses,setBuses] = useState([]) ;
  
  useEffect(function effectFunction() {
       setBuses(props.buses)
  }, []);
  useEffect(() => {
    currentPage !== page && setPage(currentPage)
  }, [currentPage, page])

  

  return (
    <div>
      <Dashboard source={props.source} destination={props.destination}/>
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
              'start', 'end', 'date','time','duration','seats'
            ]}
            hover
            striped
            itemsPerPage={5}
            activePage={page}
            clickableRows
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
            pages={1}
            doubleArrows={false} 
            align="center"
          />
          </CCardBody>
        </CCard>
      </CCol>
      

    </CRow>
    </div>
  )
}

export default SearchBuses
