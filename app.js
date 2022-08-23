const express = require("express");
const ThingController = require("./controllers/thing.controller");
const app = express();

const bodyParser = express.json();

app.use(bodyParser);

app.route("/thing")
  .get(ThingController.getAllThing)
  .post(ThingController.createThing);

app.route("/thing/:id")  
  // .get(ThingController.getThing)
  // .put(ThingController.updateThing)
  .delete(ThingController.deleteThing);

module.exports = app;
