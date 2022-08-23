const { Client } = require("pg");
const fs = require("fs");
const path = require("path");
const config = require("../config/db.json");
const currentFileName = path.basename(__filename);
const dbConfig = config[process.env.NODE_ENV || "development"];

// const Thing = require('./Thing')

const client = new Client(dbConfig);

//Thing.client = client;

client.connect();
process.on("beforeExit", () => client.end());

const db = {
  client,
  //Thing
};

fs.readdirSync(__dirname)
  .filter((fileName) => /.js$/.test(fileName) && fileName !== currentFileName)
  .forEach((fileName) => {
    const absPathToFile = path.resolve(__dirname, fileName);
    const Model = require(absPathToFile); //8
    Model.client = client; //12
    db[Model.name] = Model; //16
  });

module.exports = db;
