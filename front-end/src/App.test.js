import React from 'react'
import { shallow } from 'enzyme/build'
import App from './App'
import Dashboard from './views/dashboard/Dashboard.js'
import Login from './views/pages/login/Login.js'
import TheContent from './containers/TheContent.js'
import TheLayout from './containers/TheLayout.js'

it('mounts App without crashing', () => {
  const wrapper = shallow(<App/>)
  wrapper.unmount()
})

it('mounts Dashboard without crashing', () => {
  const wrapper = shallow(<Dashboard/>)
  wrapper.unmount()
})

it('mounts Login without crashing', () => {
  const wrapper = shallow(<Login/>)
  wrapper.unmount()
})

it('mounts TheContent without crashing', () => {
  const wrapper = shallow(<TheContent/>)
  wrapper.unmount()
})

it('mounts Thelayout without crashing', () => {
  const wrapper = shallow(<TheLayout/>)
  wrapper.unmount()
})


