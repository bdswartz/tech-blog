const express = require("express");
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3001;
// access the connection info
const sequelize = require('./config/connection.js');

// begin routing of requests to the server
const routes = require('./controllers');


//help with authentication with session cookies
const session = require('express-session');

//handlebars 
const exphbs = require('express-handlebars');
const hbs = exphbs.create({ helpers });

const SequelizeStore = require('connect-session-sequelize')(session.Store);

// create the session object to set up cookies and db session info
const sess = {
    // secret to authenticate cookie (not modified by client)
    secret: 'secret password',
    // cookie object
    cookie: {},
    // recommneded setting false
    resave: false,
    saveUninitialized: true,
    // create session by connecting with db, set up session table, and save session in db
    store: new SequelizeStore({
      db: sequelize
    })
  };

  // turn on session on server by calling middleware and passing session obj
app.use(session(sess));
// turn on handlebars as the template
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Middleware to parse and send information to the db
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

// access static html/css files
app.use(express.static(path.join(__dirname, 'public')));

// turn on routes
app.use(routes);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
  });