# Uber-Bus-App

# Introduction 

# Back-end
* This is a server side python webapi
* Here we instantiate a flask object
* Return the response from mongodb with the body for the below apis as json object 
* Run the flask object app to listen for requests on localhost:5000

# /admin/login
* Enables admin to login with proper credentials
# /admin/logout 
* Enables admin to logout
# /bus/new
* Enables admin to add new bus
# /bus/all
* Enables admin to view all the buses
# /bus/delete/<bus_id>
* Enables admin to delete an existing bus
# /trip/all
* Enables admin to view all the trips of the users
# /trip/search
* Enables user to search for the available buses to book a trip
# /trip/new
* Enables user to book a new trip 
# /trip/booking
* Enables user to search for the trip with booking id as input

# How to Run?
## Prerequisites
* Install Python
* Install mongodb
* Navigate to Uber-Bus-App and enter commands
  * python m pip install r requirements.txt
## Run
* And enter command python main.py
* Our application is running and listening for HTTP Requests on port 5000 on localhost

# Front-end
# Introduction
* This is a client side React application 
* Here the react app displays the application and sends the POST/GET/DELETE request to python webapp
* This sends the request to python application, this returns the required response.

# How to Run?
## Prerequisites
* Install node js

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.
