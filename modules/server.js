const express = require("express");

const app = express();

const port = process.env.PORT || 5467;

app.use(express.json());

module.exports = {app, port};