import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomePage from './../Components/HomePage';
import NotFoundPage from './../Components/NotFoundPage';
import ToolBar from './../Components/Toolbar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import LoginPage from './../Components/LoginPage';
import Logout from './../Components/Logout';
import RidePage from './../Components/RidePage';
import MapPage from './../Components/MapPage';
import RidesHistory from './../Components/RidesHistory';

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
                <Route path="/map" component={MapPage} />
                <Route component={NotFoundPage} />
            </Switch>
        </MuiThemeProvider>
    </BrowserRouter>
);

export default AppRouter;