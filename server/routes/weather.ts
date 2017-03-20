import { Router, Response, Request } from "express";

const weatherRouter: Router = Router();
const http = require('http');
const baseImageUrl = 'http://openweathermap.org/img/w/';
const url = 'http://api.openweathermap.org/data/2.5/weather?units=metric&appid=059c8a5c2e2e15362cbebcae80b68e7b';
var requestObj = require('request');

/**
 * @swagger
 * /api/weather/image:
 *   get:
 *     tags:
 *       - Weather image
 *     description: Returns weather info image
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Get weather info image
 */
weatherRouter.get('/image/:imgid', (request: Request, response: Response) => {
  const imgid = request.params.imgid;
  requestObj(baseImageUrl + imgid + '.png').pipe(response);
});

/**
 * @swagger
 * /api/weather:
 *   get:
 *     tags:
 *       - Weather
 *     description: Returns weather info
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Get weather info
 */
weatherRouter.get('/', (request: Request, response: Response) => {
  const lat = request.query.lat;
  const lon = request.query.lon;

  let query = '&q=Antwerp,BE';

  if (lat && lon) {
    query = '&lat=' + lat + '&lon=' + lon;
  }

  http.get(url + query, function(res) {
    let body = ''; // Will contain the final response
    // Received data is a buffer.
    // Adding it to our body
    res.on('data', function(data){
      body += data;
    });
    // After the response is completed, parse it and log it to the console
    res.on('end', function() {
      const parsed = JSON.parse(body);
      response.json(parsed);
    });
  })
  // If any error has occured, log error to console
  .on('error', function(e) {
    console.log('Got error: ' + e.message);
  });

});

export { weatherRouter };
