// Setting up required modules
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');

const sequelize = require("./config/config");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

// Setting up express port
const app = express();
const PORT = process.env.PORT || 3001;

// Setting up session
const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

const hbs = exphbs.create({ helpers });

// Setting up handlebars
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// Setting up express
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('routes'));

// Sets up server and announces listening
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
  sequelize.sync({ force: false });
});
