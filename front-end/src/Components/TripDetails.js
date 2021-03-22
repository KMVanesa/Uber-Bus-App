const stylePaper = {
  height: '200px',
  width: '700px',
  float: 'left',
  background: '#f8f8f9',
  marginRight: '30px',
  marginLeft: '-150px',
  marginTop: '90px'
};



const TripDetails = ({ trips }) => {
  return (
    <table style={stylePaper}>
      <thead>
        <tr>
          <th>Bus Id</th>
          <th>Pick Up Location</th>
          <th>Drop Location</th>
          <th>Date</th>
          <th>Duration</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>
        {(trips.length > 0) ? trips.map((ride, index) => {
          return (
            <tr key={index}>
              <td>{ride._id}</td>
              <td>{ride.start}</td>
              <td>{ride.end}</td>
              <td>{ride.date}</td>
              <td>{ride.duration}</td>
              <td>{ride.time}</td>
            </tr>
          )
        }) : <tr><td colSpan="5">Loading...</td></tr>}
      </tbody>
    </table>
  );
}

export default TripDetails;
