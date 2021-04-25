import React from 'react'
import Dashboard from "../dashboard/Dashboard.js"
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import axios from "axios";
import Moment from 'moment';

const localStorageAuthKey = 'uber:auth';

class AddBus extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      seats: "",
      pickup: "",
      drop: "",
      date: "",
      busid: "",
      duration: [],
      time: "",
    };


  }

  handleSubmit = e => {
    e.preventDefault();
    let api_url = process.env.REACT_APP_URL;
    axios.post(api_url + "/bus/new",

      {
        "bus_id": this.state.busid,
        "start": this.state.pickup,
        "end": this.state.drop,
        "date": this.state.date,
        "duration": this.state.duration,
        "time": this.state.time,
        "seats": this.state.seats

      },

      { "headers": { "auth": localStorage.getItem(localStorageAuthKey) } }
    )
      .then(response => {
        console.log(response.data);
        if (response.data !== "permission denied") {
          this.setState({ res: response.data });
          this.setState({ res_received: true });
          alert("Bus added Succesfully");
          window.location.pathname = "/buses"
        } else {
          alert("ERROR While Adding Bus!");
        }
      })
      .catch(error => {
        alert("ERROR While Adding Bus!");
        console.log(error);
      });
  }
  setTime = (e) => {
    this.setState({ time: e.target.value })
  }
  setSeats = (e) => {
    this.setState({ seats: e.target.value })
  }
  setDuration = (e) => {
    this.setState({ duration: e.target.value })
  }
  setPickup = (e) => {
    this.setState({ pickup: e.target.value })
  }
  setDrop = (e) => {
    this.setState({ drop: e.target.value })
  }
  setDate = (e) => {
    const dateFormat = Moment(e.target.value).format('DD/MM/YYYY')
    this.setState({ date: dateFormat })
  }
  setBusid = (e) => {
    this.setState({ busid: e.target.value })
  }

  render() {
    return (
      <div className="justify-content-left">
        <Dashboard />
        <CRow md="2">
          <CCol md="4">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Add New Bus</h1>
                    <p className="text-muted">Please Enter the below deails</p>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="text" placeholder="BusId" onChange={this.setBusid} />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="text" placeholder="Pick Up Location" onChange={this.setPickup} />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="text" placeholder="Drop Location" onChange={this.setDrop} />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInput type="date" id="date-input" name="date-input" placeholder="date" onChange={this.setDate} />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroup className="mb-4">
                        <CInput type="time" placeholder="Time" onChange={this.setTime} />
                      </CInputGroup>
                      <CInput type="text" placeholder="Duration" onChange={this.setDuration} />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="text" placeholder="Seats" onChange={this.setSeats} />
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton color="primary" className="px-4" onClick={this.handleSubmit}>Add Bus</CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>

      </div>
    )
  }
}

export default AddBus
