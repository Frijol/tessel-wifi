require ('../') ({
  ssid: "BRINELY",
  password: "Brinely2011",
  timeout: 40,
  port: 8000,
  debug: true
}, function onConnected () {
  // Executes every time connection is gained
  console.log('Executing!');
}, function onDisconnected () {
  // Executes when connection is dropped
  console.log('Execution halted.');
});
