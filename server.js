// make express available to the app (aka instantiates express)
const express = require('express');

// define the routing
const routes = require('./controllers');
// tell sequelize where the connection is located
const sequelize = require('./config/connection');

// assigns express to the variable app
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware to parse information for the db
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// turn on routes
app.use(routes);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});