const stylePaper = {
    height: '200px',
    width: '700px',
    float:'left',   
    background: '#f8f8f9',
    marginRight:'30px',
    marginLeft:'-150px',
    marginTop: '90px'
};
const TripDetails = ({ id, username, start, end, date, duration, time }) => {
    return (
      <table style={stylePaper}>
        <thead>
          <tr>
            <th>Username</th>
            <th>Booking Id</th>
            <th>Pick Up Location</th>
            <th>Drop Location</th>
            <th>Date</th>
            <th>Duration</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
              <tr key={ username }>
                <td>{ id}</td>
                <td>{ start }</td>
                <td>{ end}</td>
                <td>{ date }</td>
                <td>{ duration}</td>
                <td>{ time }</td>
              </tr>
        </tbody>
      </table>
    );
  }

  export default TripDetails;
