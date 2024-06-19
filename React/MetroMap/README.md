# Metro Guesser Anastasia Bondarenko

Express + React app

Description: The app shows a map and a pannel where the user can choose
to view metro lines information or play multiple-choice metro coordinates guess quiz

## Attribution

# Leaflet
Leaflet is an open source JavaScript library used to build web mapping applications. 

# stm_arrets_sig_wgs84.geojson
Shows line and coordinations information about all STM stations 

## Structure

There are two directories in the __root__ of the project.

* The Express server is in `server/`
* The React app is in `metro-map-client/
* The server responsd to API calls and serves the __built__ React app.

There are 3 package.json files -- see what `scripts` they define.

## Setup

To install all the dependencies and build the React app run:

```
npm run build
```

## To run the app

### Just the client

If `metro-map-client/package.json` has a `proxy` line, remove it. 

```
cd metro-map-client
npm start
```

### Just the server

cd server
nodemon api.mjs

### Client and Server

# first
cd server
nodemon api.mjs

# next

cd metro-map-client
npm start



