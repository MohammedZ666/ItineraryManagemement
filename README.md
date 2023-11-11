# Itinerary management

This REST API project allows a user to manage their travel itineraries by allowing a user to create, read, list, update, and delete itineraries. Itineraries are saved per user, hence authorization and authentication are also necessary before the CRUD (create, read, update, and delete) operations. All endpoints have a rate limit of 10 requests per minute.  

Check the [API Documentation](https://documenter.getpostman.com/view/15336332/2s9YXk31Cv) for usage details.

## NPM
NPM can be used to setup the project, for this please ensure Node.js with version 18.13.0 is installed. For windows download `.msi` file from [here](https://nodejs.org/dist/v18.13.0/) according to your architechture and install. For linux based distributions, follow the instructions provided [here](https://github.com/nodesource/distributions#installation-instructions).


To install and run the project, at first clone the project. Then create a `.env` file in the root directory of the project and write the following in the file - 

```
PORT=3000
DB_KEY=YOUR_MONGODB_CONNECTION_STRING
SECRET=YOUR_JWT_SECRET
```
Then execute the following commands to install, test, and run the project

```
npm install
npm test
npm start
```

## [Docker](https://hub.docker.com/r/mohammedz666/itinerary_management) 
Docker can also be used to run the project in a container. To do this, please install docker following the instructions from [here](https://docs.docker.com/desktop/), then run the following -

```
docker pull mohammedz666/itinerary_management

# For subsequent runs, just run the follwing command only

docker run -e "PORT=3000" -e "SECRET=YOUR_JWT_SECRET" -e "DB_KEY=YOUR_MONGODB_CONNECTION_STRING" -p 3000:3000 -it mohammedz666/itinerary_management:latest
```
