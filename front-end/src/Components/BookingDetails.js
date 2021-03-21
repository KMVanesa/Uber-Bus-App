const stylePaper = {
    height: '200px',
    width: '700px',
    float:'left',   
    background: '#f8f8f9',
    marginRight:'30px',
    marginLeft:'-150px',
    marginTop: '90px',
    border: "1px solid black"
}
// table{
//     border: "1px solid black";
//   }
const BookingDetails = ({ trips }) => {
    return (
      <table style={stylePaper}>
        <thead>
          <tr style={{border: "1px solid black"}}>
            <th style={{border: "1px solid black"}}>Username</th>
            <th style={{border: "1px solid black"}}>Booking Id</th>
            <th style={{border: "1px solid black"}}>Bus Id</th>
            <th style={{border: "1px solid black"}}>Pick Up Location</th>
            <th style={{border: "1px solid black"}}>Drop Location</th>
            <th style={{border: "1px solid black"}}>Date</th>
            <th style={{border: "1px solid black"}}>Duration</th>
            <th style={{border: "1px solid black"}}>Time</th>
          </tr>
        </thead>
        <tbody>
        { (trips.length > 0) ? trips.map( (trip, index) => {
              return (
                <tr key={ index } style={{border: "1px solid black"}}>
                <td style={{border: "1px solid black"}}>{ trip._id }</td>
                <td style={{border: "1px solid black"}}>{ trip.user }</td>
                <td style={{border: "1px solid black"}}>{(trip.bus!==null)? trip.bus._id:null}</td> 
                <td style={{border: "1px solid black"}}>{ (trip.bus!==null)?trip.bus.start:null }</td>
                <td style={{border: "1px solid black"}}>{ (trip.bus!==null)?trip.bus.end :null}</td>
                <td style={{border: "1px solid black"}}>{ (trip.bus!==null)?trip.bus.date :null}</td>
                <td style={{border: "1px solid black"}}>{ (trip.bus!==null)?trip.bus.duration:null }</td>
                <td style={{border: "1px solid black"}}>{ (trip.bus!==null)?trip.bus.time:null }</td>
              </tr>
              )
            }) :null}
        </tbody>
      </table>
    );
  }

  export default BookingDetails;
