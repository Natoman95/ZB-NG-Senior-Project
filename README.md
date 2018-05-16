# ZB-NG-Senior-Project

## Table of Contents
* [Dependencies](#dependencies)
  * [Descriptions](#descriptions)
  * [Links](#links)
* [Conventions](#conventions)
  * [Naming](#naming)
  * [Issue Tracking](#issue-tracking)
* [Installation](#installation)
  * [Development](#development)
* [Testing](#testing)
  * [Client](#client)
  * [Server](#server)
* [Server API](#server-api)
  * [Endpoint Arguments](#endpoint-arguments)
  * [Authentication](#authentication)
  * [User](#user)
  * [Rides](#rides)
  * [Requests](#requests)
* [Database Schema](#database-schema)
  * [Rides](#rides)
  * [Requests](#requests)
* [Code and Class Guide](#code-and-class-guide)
  * [Client](#client)
  * [Server](#server)
* [Features to Implement](#features-to-implement)
  * [Highland Express](#highland-express)
  * [Ride Search](#ride-search)
  * [Communication](#communication)
  * [Displaying Information](#displaying-information)
  * [UI Design](#ui-design)
  * [Security](#security)
  * [Liability](#liability)
  * [Deployment](#deployment)

## Dependencies

#### Descriptions
* `cross-env` -- Allows app commands like `start` and `build` to be run with unix variables on both Windows and Mac
* `material-ui` -- Pre-made user interface components like buttons, tabs, etc.
* `material-ui-icons` -- Standard material icons that work seemlessly with Material UI
* `npm` -- Javascript package manager
* `react` -- The basic React libraries for constructing a React app
* `react-dom` -- DOM for React
* `react-router` -- Allows for navigation between React components
* `react-router-dom` -- DOM for React Router
* `react-scripts` -- Commands for running, building, testing a React App
* `yarn` -- Another Javascript package manager created by developers who were dissatisfied with npm in some ways. It does not replace npm entirely, but supplements it

#### Links
* React JS Documentation https://reactjs.org/docs/hello-world.html
* Create React App Documentation https://github.com/facebook/create-react-app
  * Our app is built on top of Create React App, whic takes care a lot of React JS headache
  * This documentation gives pointers for configuring the app and adding basic features that we'll need
* Material-UI Documentation https://material-ui-next.com
* NPM packages for anything not built into React or Material-UI https://www.npmjs.com
* Standard Material-UI Icons https://material.io/icons/
* Custom Material-UI Icons https://materialdesignicons.com/
  * Using these Icons is a bit more involved, but by downloading any icon as an SVG, you gain access to a special code that can be used to generate the Icon properly
  * https://material-ui-next.com/style/icons/ documents how to use one of these codes
* Gordon Branding Standards http://www.gordon.edu/brandstandards

## Conventions

#### Naming
* Branches: `{issuenumber}-{summary-description}`
* Pull Requests (Should have names identical to the Issue they're linked to, but with the issue number at the front): `{linked issue number}-{linked issue description}`

#### Issue Tracking

###### Creating an issue
* Give the issue a name that briefly describes the bug or feature
* Assign the issue to the appropriate person
* Label the issue appropriately
* Add the issue to the goco-transit project
* Add the issue to a sprint if applicable
* If the issue is high-priority, add it to the "priority" column on the project board
* Move the issue to "In Progress" once you have begun work on it

###### Completing an issue
* When you have finished work on the issue, create a pull request to merge the issue into master
* Assign that pull request to the appropriate reviewer
* Add the pull request to the goco-transit project
* Add the pull request to the current sprint
* Wait for the pull request to be approved and merged
* Delete the branch associated with the pull request
* Close out the issue manually

## Installation

#### Development
In order to run the client locally, perform the following operations:
* Install the NPM package manager through Node.js from https://nodejs.org/en/
* Install react globally (with the -g option) via the npm package manager https://www.npmjs.com/package/react/tutorial
* Install yarn globally in one of the ways listed https://yarnpkg.com/lang/en/docs/install/
* Clone the client repository into some directory on your computer from https://github.com/Natoman95/ZB-NG-Senior-Project.git
* Navigate to the goco-transit folder of the repository
* Execute `yarn install` if this is your first time running the project
* Execute `yarn dev` to run the project
* Navigate to http://localhost:8080/
* Login to the app with your Gordon 360 credentials

To link up the client and server do the following:
* Edit the two “proxy” links in the `package.json` file in the client
* To connect to a locally hosted version of the server, enter: http://localhost:5678

In order to run the server locally, perform the following operations
* Navigate to https://desktops.gordon.edu from a web browser
* Download the Remote Desktops file for the Gordon CS Virtual Machine
* Open Microsoft Remote Desktops (or download it on a Mac from the App Store)
* Open the Remote Desktops File
* Login with your Gordon credentials
* Clone the Transit version of the Gordon 360 back end server: https://github.com/Natoman95/Project-Raymond.git
* Switch from the `master` to `Goco-Transit` branch
* Open the project solution in Visual Studio
* Generate database models by “Updating” CCT_DB_Models.edmx
* Retrieve the “secrets.config” file from the cs-devA virtual machine in “C:\Users\Public\Documents\360 Shared files” and place it in the * Gordon 360 directory of the project
* Build the project
* Run the Gordon 360 Project in Debug mode

## Testing

#### Client
The basic functionality of the app and its connection to the server can be tested in the following way:

1. Login
  * Login to the app with your 360 credentials
  * If you get an error back that does not concern username/password mismatch, a proper connection to the server has probably not been established
2. Offer a ride
  * Navigate to the ‘Driver’ tab of the app
  * Offer a new ride with the ‘plus’ button
  * Enter data for a new ride
  * Tap confirm
  * The new ride should appear on the ‘Driver’ page
  * Now tap the ride and delete it
  * It should disappear from the ‘Driver’ page
3. Request a ride
  * Navigate to the ‘Passenger’ tab of the app
  * Find a ride that you might want to be a passenger on with the ‘search’ button
  * Submit a request for the ride, or if none appear, submit a standing request
  * The request should now appear on the ‘Passenger’ page
  * Now tap the request and delete it
  * It should disappear from the ‘Driver’ page
4. Update passengers
  * Tap a ride on the ‘Driver’ page
  * Click on the seat icon on the bottom left of the dialog
  * Change the status of a passenger on the ride
  * Confirm this change
  * Close the dialogs and the page should reload
  * Confirm that the change has persisted
  
#### Server
* In order to test server endpoints, follow these steps:
* Download Postman
* Import our collection of postman calls using this link: https://www.getpostman.com/collections/c8134f635718fd0488f1
* Each item tests one of our endpoints, all of which are documented in the ‘Server Api’ section
* Depending on whether the server is running in production, production test, or locally, these tests will need to be modified slightly
* They should also be modified to reflect the user for which you wish to retrieve data (each has a selection of dummy data that can be swapped out)
* Each test passes an auth token to the server
* The ‘Token’ may need to be executed first and the auth token copied into the various tests

## Server API
Our app uses a modified version of the 360 server. It does its user and authentication related tasks with pre-existing 360 endpoints. Ride and request operations use our custom endpoints.

Base url (varies depending on which server is used): https://360Api.gordon.edu/

#### Endpoint Arguments
Data passed through these endpoints as arguments are enclosed in { } brackets.

* `{username}` -- “nathan.gray” or “zach.brown”
* `{id}` / `{requestid}` / `{rideid}`  -- the unique id of a ride or request: “34” or “72”
* `{origin}` / `{destination}` -- right now just a string representing a city: “Boston”
* `{note}` -- any string a user wants to pass as a note: “Pay me back for gas!”
* `{capacity}` -- the max number of seats available in a car: “3” or “4”
* `{datetime}` -- a string representing a date and a time: “2017-12-07T20:30” means December 7th, 2017 at 8:30 PM
* `{isconfirmed}` -- a boolean representing whether a request has been accepted or not: “true” or “false”

Example objects to pass through POST’s can be found in our Postman tests.

#### Authentication
###### GET
* `/token` -- Gets an authentication token to be used for all other requests by sending username and password

#### User
###### GET
* `/api/profiles/{username}` -- Gets a bunch of user data. We only use contact information and username
* `/api/Image/{username}` -- Gets a user’s headshot

#### Rides
Url prefix: `/api/transit/ride`

###### GET
* `/id/{id}` -- Gets a ride by its unique id
* `/user/{username}/offered` -- Gets a list of rides where a user is the driver
* `/user/{username}/confirmed` -- Gets a list of rides where a user is the passenger
* `/user/{username}/pending` -- Gets a list of rides that a user wants to be a passenger on

###### POST
* `/location/` -- Gets a list of rides related to desired origin, destination, and date
* `/` -- Adds the ride attached to the request body to the database

###### PUT
* `/origin/{id}/{origin}` -- Updates the origin of a ride
* `/destination/{id}/{destination}` -- Updates the destination of a ride
* `/date/{id}/{datetime}` -- Updates the date/time of a ride
* `/note/{id}/{note}` -- Updates the driver note on a ride
* `/capacity/{id}/{capacity}` -- Updates the max number of seats on a ride

###### DELETE
* `/delete/{id}` -- Deletes a ride by its unique id

#### Requests
Url prefix: `/api/transit/request`

###### GET
* `/id/{id}` -- Get a request by its unique id
* `/user/{username}` -- Get all the requests belonging to a user

###### POST
* `/` -- Adds the request attached to the request body to the database

###### PUT
* `/confirmed/{id}/{isconfirmed}` -- Updates the status of a request to confirmed or not confirmed

###### DELETE
* `/delete/{id}` -- Deletes a ride by its unique id

## Database Schema

#### Rides
<img src=https://github.com/Natoman95/ZB-NG-Senior-Project/blob/master/ride_table.png width="500">

#### Requests
`ride_id` is no longer nullable

<img src=https://github.com/Natoman95/ZB-NG-Senior-Project/blob/master/request_table.png width="500">

## Code and Class Guide

#### Client
| src |                |                  |                             |                                                       |
|:--- |:-------------- |:---------------- |:--------------------------- |:----------------------------------------------------- |
|     | **components** |                  |                             | **Modular ui elements used in various pages**         |
|     |                | **dialog-boxes** |                             | **Dialog boxes that open on a screen**                |
|     |                |                  | add-offer-dialog.js         | Opened when you create a new offer on the driver page |
|     |                |                  | add-request-dialog.js       | Opened when you request a ride on the search page     |
|     |                |                  | confirmation-dialog.js      | Opened when you hit the check button on any data-entry dialog|
|     |                |                  | confirmed-details-dialog.js | Opens with info on a confirmed ride on the passenger page|
|     |                |                  | information-dialog.js       | Generic dialog that contains text information         |
|     |                |                  | offer-details-dialog.js     | Opens with info on an offer on the driver page        |
|     |                |                  | passenger-list-dialog.js    | Opens from the offer details dialog with info and options about the passsengers on that offered ride|
|     |                |                  | requested-details-dialog.js | Opens with info on a request on the passenger page    |
|     |                | loader.js        |                             | The circular loading animation used when a tab is fetching data|
|     | **images**     |                  |                             | Images used in the project                            |
|     |                | gordon_logo.svg  |                             | Used on the login page                                |
|     | **models**     |                  |                             | **Objects that represent data from the server**       |
|     |                | request-model.js |                             | Used to store data about a request                    |
|     |                | ride-model.js    |                             | Used to store data about a ride                       |
|     |                | user-model.js    |                             | Used to store user data                               |
|     | **pages**      |                  |                             | **The main views displayed in the app**               |
|     |                | driver-page.js   |                             | The middle tab where you offer rides to others        |
|     |                | login-page.js    |                             | The login page                                        |
|     |                | main-page.js     |                             | The page that has the tabs and contains most other pages|
|     |                | passenger-page.js|                             | The first tab where you track rides you’ve requested  |
|     |                | search-page.js   |                             | Linked from the passenger page. This is where you find rides to join|
|     |                | settings-page.js |                             | Where you can see your user information and logout    |
|     | **services**   |                  |                             | **Data storage and retrieval - often in the form of database view models**|
|     |                | auth-service.js  |                             | Deals with user authentication                        |
|     |                | date-service.js  |                             | Creates and formats dates in a style the UI and DB can understand|
|     |                | error-service.js |                             | Formats errors that will be displayed to the user     |
|     |                | http-service.js  |                             | Makes http requests to the server. Is used by several other services|
|     |                | request-service.js|                            | Gets data about requests from the server              |
|     |                | ride-service.js  |                             | Gets ride data from the server                        |
|     |                | storage-service.js|                            | Caches data like user and authentication data         |
|     |                | user-service.js  |                             | Gets data about the user from the server              |
|     | App.js         |                  |                             | The root of the project. Decides to load “login” or “main” page depending on authentication status|
|     | index.js       |                  |                             | Contains the router and renders into either the main page or the login page|
|     | theme.js       |                  |                             | Contains Gordon colors used throughout the project    |
| package.json|        |                  |                             | Lists dependencies, proxies, project commands         |

#### Server
Only the custom classes we added to the 360 server

| ApiControllers |                      |                           | Contain Endpoints                                           |
|:-------------- |:-------------------- |:------------------------- |:----------------------------------------------------------- |
|                | RequestController.cs |                           | Endpoints for requests                                      |
|                | RideController.cs    |                           | Endpoints for rides                                         |
| **Models**     |                      |                           | **Model database tables to allow for reading/writing to database**|
|                | **ViewModels**       |                           | **Put models of database tables into a more usable form for the client to read and write to. Are transformed back into regular models for database interactions.**|
|                |                      | TransitRequestViewModel.cs| Friendly request model                                      |
|                |                      | TransitRideViewModel.cs   | Friendly ride model                                         |
|                | Transit_Requests.cs  |                           | Exact correspondence to database table - used to interact with the database|
|                | Transit_Rides.cs     |                           | Exact correspondence to database table - used to interact with the database|
| **Services**   |                      |                           | **Called by controllers. Read and write to the database**   |
|                | RequestService.cs    |                           | Uses request models to interact with the database           |
|                | RideService.cs       |                           | Uses ride models to interact with the database              |

## Features to Implement
See this repository's issues for a list of immediate tasks left unfinished

#### Highland Express
* Allow the HE to poll users for optimal airport Shuttle times
* Ride scheduling for highland express staff
  
#### Ride Search
* Allow users to browse available rides
* Allow users to adjust the radius around a location to search for rides
* Incorporate a maps API to allow for better location matching and searching
* Allow users to add a request that isn't linked to a ride yet
* Filter out rides that have already been requested

#### Communication
* In-app messaging between drivers and passengers
* Add banner notifications
  * When a passenger's request is rejected
  * When a driver's ride is requested
* Adding a note to a rejected passenger

#### Displaying Information
* Add return time to rides
* Add identification information for driver's vehicles
* Show relevant requests to drivers adding new rides
* Show driver phone number on a ride if available
* Figure out what to do with rides and requests whose dates have passed

#### UI Design
* Optimize the app for desktop use

#### Security
* Prevent users from modifying rides and requests that don't belong to them (say, through Postman with any old auth token)
* Client and Server data validation

#### Liability
* Flesh out the legal agreements

#### Deployment
* Set up a production version of the project on a virtual machine with an external IP
