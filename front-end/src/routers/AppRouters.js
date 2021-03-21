import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomePage from './../Components/HomePage';
import NotFoundPage from './../Components/NotFoundPage';
import ToolBar from './../Components/Toolbar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import LoginPage from './../Components/LoginPage';
import Logout from './../Components/Logout';
import RidePage from './../Components/RidePage';
import Admin from './../Components/Admin';
import Search from './../Components/Search';
import AddBus from './../Components/AddBus';
import GetAllBus from './../Components/GetAllBus';
import RidesHistory from './../Components/RidesHistory';
import DeleteBusPage from './../Components/Deletebus'
import BookingConfirmation from './../Components/BookingConfirmation'

const AppRouter = () => (
    <BrowserRouter>
        <MuiThemeProvider>
            <ToolBar />
            <Switch>
                <Route path="/" component={HomePage} exact={true} />
                <Route path="/yourRides" component={RidesHistory} />
                <Route path="/Login" component={LoginPage} />
                <Route path="/bookACab" component={RidePage} />
                <Route path="/logout" component={Logout} />
                <Route path="/admin" component={Admin} />
                <Route path="/search" component={Search} />
                <Route path="/addBus" component={AddBus} />
                <Route path="/viewBuses" component={GetAllBus} />
                <Route path="/deleteBus" component={DeleteBusPage} />
                <Route path="/bookingConfirmation" component={BookingConfirmation}/>
                <Route component={NotFoundPage} />
            </Switch>
        </MuiThemeProvider>
    </BrowserRouter>
);

export default AppRouter;