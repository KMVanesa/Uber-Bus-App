const Table = ({ rides }) => {
    return (
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Booking Id</th>
            <th>Pick Up Location</th>
            <th>Drop Location</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          { (rides.length > 0) ? rides.map( (ride, index) => {
             return (
              <tr key={ index }>
                <td>{ ride.id }</td>
                <td>{ ride.name }</td>
                <td>{ ride.region.slug}</td>
                <td>{ ride.memory }</td>
                <td>{ ride.vcpus }</td>
                <td>{ ride.disk }</td>
              </tr>
            )
           }) : <tr><td colSpan="5">Loading...</td></tr> }
        </tbody>
      </table>
    );
  }

  export default Table;
