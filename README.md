# Birdnest

My submission for Reaktor [recruitment task](https://assignments.reaktor.com/birdnest/).

## Backend

The backend is a TypeScript Node.js application implemented mainly with [Express](https://expressjs.com/) and [Mongoose ODM](https://mongoosejs.com/).

The backend has two responsibilities:

1. Polling the drone API and saving NDZ violations to a MongoDB database
2. Serving client requests

Only NDZ _infractions_ are saved to the database. Data saved about infractions includes, for example, the distance from the bird nest, coordinates, and a timestamp. Data is stored only of the infraction closest to the bird nest for each drone. The information persist for 10 minutes after the drone was last reported by the drone API.

The API provided by the backend is briefly documented in openapi.yaml. The backend provides two endpoints. _/infractions_ serves all infractions stored to the database, and _/pilot/:serialNumber_ servers pilot information.

Polling the drone API and saving NDZ violations to the database is implemented in _streamProcessing.ts_. Otherwise the backend uses a common structure for Express application.

## Frontend

The frontend is a [Vue.js](https://vuejs.org/). It provides a simple view for the data provided by the backend. [Bootstrap](https://getbootstrap.com/) is used for styling.

<sub>the project does not have tests because yolo </sub>
