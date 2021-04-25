import React from 'react'
import CIcon from '@coreui/icons-react'

const _nav =  [
  {
    _tag: 'CSidebarNavItem',
    name: 'Home',
    to: '/dashboard',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>,
    badge: {
      color: 'info',
      text: 'NEW',
    }
  },
  {
    _tag: 'CSidebarNavItem',
    name: localStorage.getItem("loggedinuser")==="admin"?'Buses':'Book A Bus',
    to: localStorage.getItem("loggedinuser")==="admin"?'/buses':'/book',
  },
  {
    _tag: 'CSidebarNavItem',
    name: localStorage.getItem("loggedinuser")==="admin"?'Rides':'Search Buses',
    to: localStorage.getItem("loggedinuser")==="admin"?'/rides':'/search',
  },      
  {
    _tag: 'CSidebarNavItem',
    name: localStorage.getItem("loggedinuser")==="admin"?null:'My Rides',
    to: localStorage.getItem("loggedinuser")==="admin"?null:'/myrides',
  }
 ]

export default _nav
