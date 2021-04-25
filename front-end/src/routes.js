import React from 'react';


const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));

const Buses = React.lazy(() => import('./views/buses/Buses'));
const Bus = React.lazy(() => import('./views/buses/Bus'));
const AddBus = React.lazy(() => import('./views/buses/AddBus'));
const Rides = React.lazy(() => import('./views/rides/Rides'));
const Ride = React.lazy(() => import('./views/rides/Ride'));
const BookARide = React.lazy(() => import('./views/user/BookARide'));
const SearchACab = React.lazy(() => import('./views/user/SearchCab'));
const SearchBuses = React.lazy(() => import('./views/user/SearchBuses'))
const MyRides = React.lazy(() => import('./views/user/MyRides'))
const RideDetail = React.lazy(() => import('./views/user/RideDetail'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/buses', exact: true,  name: 'Buses', component: Buses },
  { path: '/buses/:id', exact: true, name: 'Bus Details', component: Bus },
  { path: '/addbus', exact: true, name: 'Add Bus', component: AddBus },
  { path: '/rides', exact: true,  name: 'Rides', component: Rides },
  { path: '/rides/:id', exact: true, name: 'Ride Details', component: Ride },
  { path: '/book', exact: true,  name: 'Book A Cab', component: BookARide },
  { path: '/search', exact: true,  name: 'Search A Cab', component: SearchACab },
  { path: '/searchBuses', exact: true,  name: 'Available Buses', component: SearchBuses },
  { path: '/myrides', exact: true,  name: 'My Ride', component: MyRides },
  { path: '/ridedetails', exact: true,  name: 'My Ride', component: RideDetail }




];

export default routes;
