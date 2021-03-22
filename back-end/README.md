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
# /trip/delete/<user_name>/<booking_id>
* Enables user to delete the trip with booking id as input

# How to Run?
## Prerequisites
* Install Python and PIP
* Get Mongodb database
* Navigate to ```Uber-Bus-App/back-end``` and enter commands
  * ```pip3 install -r requirements.txt```
## Run
* And enter command ```python main.py```
* Our application is running and listening for HTTP Requests on port 5000 on localhost