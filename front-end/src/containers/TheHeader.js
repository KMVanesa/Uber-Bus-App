import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CHeader,
  CToggler,
  CHeaderBrand,
  CHeaderNav,
  CHeaderNavItem,
  CHeaderNavLink,
  CSubheader,
  CBreadcrumbRouter,
  CLink
} from '@coreui/react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useHistory } from 'react-router-dom'

// routes config
import routes from '../routes'


const TheHeader = () => {
  const dispatch = useDispatch()
  const [modal, setModal] = useState(false)
  const history = useHistory();
  const sidebarShow = useSelector(state => state.sidebarShow)

  const toggleSidebar = () => {
    const val = [true, 'responsive'].includes(sidebarShow) ? false : 'responsive'
    dispatch({type: 'set', sidebarShow: val})
  }

  const toggleSidebarMobile = () => {
    const val = [false, 'responsive'].includes(sidebarShow) ? true : 'responsive'
    dispatch({type: 'set', sidebarShow: val})
  }

  return (
    <CHeader withSubheader>
      <CToggler
        inHeader
        className="ml-md-3 d-lg-none"
        onClick={toggleSidebarMobile}
      />
      <CToggler
        inHeader
        className="ml-3 d-md-down-none"
        onClick={toggleSidebar}
      />
      <CHeaderBrand className="mx-auto d-lg-none" to="/">
        <CIcon name="logo" height="48" alt="Logo"/>
      </CHeaderBrand>
      {localStorage.getItem("loggedinuser")==="admin"?
      <CHeaderNav className="d-md-down-none mr-auto">
      </CHeaderNav>
      :<CHeaderNav className="d-md-down-none mr-auto">
        </CHeaderNav>}
      <CHeaderNav className="px-3">
        {localStorage.getItem("loggedinuser")==="admin"?
        <CHeaderNavItem className="px-3">
          <CHeaderNavLink>
            <CButton 
                onClick={() => setModal(!modal)} 
                className="mr-1"
              >Log Out</CButton>
              <CModal 
                show={modal} 
                onClose={setModal}
              >
                <CModalHeader closeButton>
                  <CModalTitle>Log out</CModalTitle>
                </CModalHeader>
                <CModalBody>
                  Are you Sure you want to logout?
                </CModalBody>
                <CModalFooter>
                  <CButton color="primary" onClick={()=>history.push("/logout")}>Yes</CButton>{' '}
                  <CButton 
                    color="secondary" 
                    onClick={() => setModal(false)}
                  >No</CButton>
                </CModalFooter>
              </CModal>
            </CHeaderNavLink>
        </CHeaderNavItem>
        :<CHeaderNavItem  className="px-3">
        <CHeaderNavLink to="/login">Login</CHeaderNavLink>
      </CHeaderNavItem>}
      </CHeaderNav>

      <CSubheader className="px-3 justify-content-between">
        <CBreadcrumbRouter 
          className="border-0 c-subheader-nav m-0 px-0 px-md-3" 
          routes={routes} 
        />
          
      </CSubheader>
    </CHeader>
  )
}

export default TheHeader
