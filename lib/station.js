
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

  self.on('i.siteDown.o.siteDown', function(source, ev, data){
    self.sendAlerts({
      subject: "[station] Site Down - " + data.name,
      message: data.name + ' has gone down. Someone should look into that.'
    });
  });

  self.on('i.siteBackOnline.o.siteBackOnline', function(source, ev, data){

    //
    // Send alerts for site going back up
    //
    self.sendAlerts({
      subject: "[station] Site Back Online - " + data.name,
      message: data.name + ' is back up. Great Success!'
    });

  });


  self.on('ready', function(){

    //
    // Add some startup commands here
    //

    self._start();

  });

};

// Station inherits from Hook Webserver
util.inherits(Station, Webserver);

Station.prototype._start = function() {

  var self = this;

  //
  // Require some hooks
  //

  self.spawn(['pinger', 'webhook', 'twilio', 'mailer'], function(){

  });

};


Station.prototype.sendAlerts = function(alert) {

  var self = this;

  //
  // Send alerts for site being down
  //

  //
  // Gather list of people to alert
  //
  var people = self.get('people');

  people.forEach(function(person){

    //
    // SMS Alerts
    //
    self.emit('i.sendSms', {
      message: alert.message,
      smsNumber: person.mobile
    });

    //
    // Email Alerts
    //

    self.emit('i.sendEmail', {
      to: person.email,
      from: "alerts@nodejitsu.com",
      subject: alert.subject,
      body: alert.message
    });

    //
    // TODO: Twitter Statjitsu Alerts
    //

      //self.emit('o.tweet');

    //
    // TODO: IRC Alerts
    //

      //self.emit('o.sendIRCMessage');

  });

}