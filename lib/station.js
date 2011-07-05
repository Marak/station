
var Webserver = require('hook.io-webserver').Webserver,
    http = require('http'),
    util = require('util');

var Station = exports.Station = function(options){

  //
  // Hook setup
  //
  
  for (var o in options) {
    this[o] = options[o];
  }

  Webserver.call(this);

  var self = this;

  self.use('file', { file: './config.json'});


  self.on('ready', function(){
    
    //
    // Add some startup commands here
    //

    self._start();

  });

};

// Station inherits from Hook Webserver
util.inherits(Station, Webserver);

Station.prototype._start = function(){

  var self = this;

  //
  // Require some hooks
  //

  self.spawn(['pinger', 'webhook'], function(){

  });

    /*
     var TwiloHook = require('hook.io-twilio').TwiloHook;
     var myhook = new TwiloHook( { name: "twillo-hook" } );
     myhook.connect();
    */



};


