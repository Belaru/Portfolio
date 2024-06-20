# 520-Project-Anastasia-ShuYa-Mohamed

Project Temperature change and CO2 emissions map
Express + React app

Description: 

## Structure

### App
Controls - user controls to navigate in website
MapChart or Chart - data visualisation in map or charts format
LazyFooter = lazy loaded footer with resources, and website and authors description

### Controls
CountrySelector - country drop down 
YearSelector - year of observation drop down 
NumberSlider - number of countries displayed selector
Story - scrollable list of countries and information requested

### MapChart
ComposableMap - world map view with geographical feature to display countries 

### Chart
LineChart - linear chart of temperature change and CO₂ gaz emission for a specific country

### LazyFooter
Footer - footer of the page for data sources, website description, and authors information

## Setup

To install all the dependencies and build the React app run:

```
npm run build
cd .\utils
node .\utils\seed.js
```

## To run the app

### Just the client

cd .\client
npm start

### Just the server

cd .\sever\bin
nodemon www.js

### Client and Server

#### first terminal
cd .\sever\bin
nodemon www.js

#### second terminal
cd .\client
npm start
