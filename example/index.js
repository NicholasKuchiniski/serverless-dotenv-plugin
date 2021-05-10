require('dotenv').config()

const express = require("express");
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
const awsServerlessExpress = require('aws-serverless-express');

const app = express();

app.use(awsServerlessExpressMiddleware.eventContext());

app.get('*', (req, res) => {
  res.status(200).json({ API_URL: process.env.API_URL });
});

const server = awsServerlessExpress.createServer(app);

function http(event, context) {
  return awsServerlessExpress.proxy(server, event, context);
}

module.exports.http = http;