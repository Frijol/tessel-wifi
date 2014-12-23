require ('../') ({
  ssid: "BRINELY", // network
  password: "Brinely2011", // password
  timeout: 40, // seconds
  debug: true // show debug messages
}, function onConnected () {
  // Executes every time connection is gained
  console.log('Executing!');
}, function onDisconnected () {
  // Executes when connection is dropped
  // tessel-wifi will automatically try to reconnect
  // and will then run the onConnected function if successful
  console.log('Execution halted.');
});
