function tw (settings, onConnected, onDisconnected) {
  // Set variables
  var wifi = require('wifi-cc3000');
  var self = this;
  self.wifiSettings = {
    ssid: settings.ssid,
    password: settings.password || null,
    security: settings.security || null,
    timeout: settings.timeout || null
  };
  self.connected = false;
  self.debug = settings.debug || false;
  self.onConnected = onConnected || null;
  self.onDisconnected = onDisconnected || null;
  self.timeouts = 0;

  // Connection function
  self.checkConnection = function () {
    var self = this;
    if (self.debug) {
      console.log('Checking connection...');
    }
    if (wifi.isConnected()) {
      if (self.debug) {
        console.log('Connected!');
      }
      if (!self.connected) {
        self.connected = true;
        if (self.debug) {
          console.log('Calling onConnected callback.');
        }
        if (self.onConnected) {
          self.onConnected();
        }
      }
    } else {
      if (self.debug) {
        console.log('Connecting...');
      }
      wifi.connect(self.wifiSettings, function (err, res) {
        if(err) {
          if(self.debug) {
            console.log('Error connecting:', err);
          }
          if (err.indexOf('timed out') > -1) {
            self.timeouts ++;
            if(self.debug && (self.timeouts > 1)) {
              console.log('Timed out', self.timeouts, 'times in a row. Are you sure the network and password are correct?');
            }
          }
          self.checkConnection();
        }
        if (self.debug) {
          console.log('Finished executing connection callback.');
        }
      });
    }
  };

  // Start trying to connect
  self.checkConnection();

  // Handle events
  wifi.on('connect', function () {
    if (self.debug) {
      console.log('Connected.');
    }
    self.timeouts = 0;
    self.checkConnection();
  });

  wifi.on('disconnect', function () {
    if (self.debug) {
      console.log('Disconnected.');
    }
    if (self.connected) {
      self.connected = false;
      if (self.debug) {
        console.log('Calling onDisconnected callback.');
      }
      if (self.onDisconnected) {
        self.onDisconnected();
      }
    }
    self.checkConnection();
  });
}

module.exports = tw;
