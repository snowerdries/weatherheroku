import { Router, Response, Request } from "express";

const weatherRouter: Router = Router();
const http = require('http');
const url = 'http://api.openweathermap.org/data/2.5/weather?q=Antwerp,BE&units=metric&appid=059c8a5c2e2e15362cbebcae80b68e7b';

weatherRouter.get("/", (request: Request, response: Response) => {
  http.get(url, function(res) {
    var body = ''; // Will contain the final response
    // Received data is a buffer.
    // Adding it to our body
    res.on('data', function(data){
      body += data;
    });
    // After the response is completed, parse it and log it to the console
    res.on('end', function() {      
      var parsed = JSON.parse(body);
      response.json(parsed);
    });
  })
  // If any error has occured, log error to console
  .on('error', function(e) {
    console.log("Got error: " + e.message);
  });

});

export { weatherRouter };
