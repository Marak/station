var station = exports,
    colors  = require('colors');



station.start = function(){

  //
  // Require some hooks
  //
  
  //
  // Webserver is used to create a basic webserver 
  // for listening to real-time events from hook.io in the browser
  //

  var Webserver = require('hook.io-webserver').Webserver;
  var webserver = new Webserver({
    name: "station",
    options: {
      "port": 9000,
      "basicAuth" : {
        "username": "marak",
        "password": "foobar"
      }
    }
  });

  webserver.on('ready', function(){
    console.log('http web server started on port 9000');
  });

  webserver.listen();

  //
  // Webhook is used to create a simple POST / Recieve HTTP Server
  // These messages are then piped out
  //

  var Webhook = require('hook.io-webhook').Webhook;
  var webhookServer = new Webhook({
    name: "webhook-server",
    options: {
      "port": 9001,
      "debug": true
    }
  });

  // Put some event handlers on your hooks
  webhookServer.on('i.*', function(){
    console.log('webhookserver in');
  });

  webhookServer.on('o.*', function(){
    console.log('webhookserver out');
  });

  webhookServer.on('ready', function(){
    console.log('station starting!'.green + ' ' + webhookServer.options.port);
  });

  // Starts up both a hook.io output server, but also an HTTP webhook server listening on webhookServer.options.port
  webhookServer.connect();



};