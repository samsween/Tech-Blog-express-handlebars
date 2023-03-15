const express = require("express");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const sequelize = require("./config/connection");
const helpers = require("./utils/helpers");
const routes = require("./controller");
const exphbs = require("express-handlebars");
require("dotenv").config();

const PORT = process.env.PORT || 3001;

const app = express();

app.use(
  session({
    secret: "secret",
    store: new SequelizeStore({
      db: sequelize,
    }),
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 30, // 30 minutes
      sameSite: "strict",
      secure: false,
    },
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

const hbs = exphbs.create({ helpers });

app.use("/public", express.static("public"));
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT);
});
