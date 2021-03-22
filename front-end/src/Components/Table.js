const stylePaper = {
  height: '200px',
  width: '700px',
  float: 'left',
  background: '#f8f8f9',
  marginRight: '30px',
  marginLeft: '150px',
  marginTop: '90px',
  border: "1px solid black"
}

const Table = ({ rides }) => {
  return (
    <table style={stylePaper}>
      <thead>
        <tr style={{ border: "1px solid black" }}>
          <th style={{ border: "1px solid black" }}>Username</th>
          <th style={{ border: "1px solid black" }}>Booking Id</th>
          <th style={{ border: "1px solid black" }}>Pick Up Location</th>
          <th style={{ border: "1px solid black" }}>Drop Location</th>
          <th style={{ border: "1px solid black" }}>Date</th>
          <th style={{ border: "1px solid black" }}>Duration</th>
          <th style={{ border: "1px solid black" }}>Time</th>
        </tr>
      </thead>
      <tbody>
        {(rides.length > 0) ? rides.map((ride, index) => {
          return (
            <tr style={{ border: "1px solid black" }} key={index}>
              <td style={{ border: "1px solid black" }}>{ride.user}</td>
              <td style={{ border: "1px solid black" }}>{ride._id}</td>
              <td style={{ border: "1px solid black" }}>{(ride.bus !== null) ? ride.bus.start : null}</td>
              <td style={{ border: "1px solid black" }}>{(ride.bus !== null) ? ride.bus.end : null}</td>
              <td style={{ border: "1px solid black" }}>{(ride.bus !== null) ? ride.bus.date : null}</td>
              <td style={{ border: "1px solid black" }}>{(ride.bus !== null) ? ride.bus.duration : null}</td>
              <td style={{ border: "1px solid black" }}>{(ride.bus !== null) ? ride.bus.time : null}</td>
            </tr>
          )
        }) : <tr><td colSpan="5">Loading...</td></tr>}
      </tbody>
    </table>
  );
}

export default Table;
