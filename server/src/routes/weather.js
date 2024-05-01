const express = require('express');

const weatherRouter = express.Router();

const { httpGetWeatherData } = require('./weather.controller');

weatherRouter.get('/',httpGetWeatherData);

module.exports = weatherRouter;

