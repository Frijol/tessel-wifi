tessel-wifi
===========

Layer on Tessel's wifi that automatically connects and reconnects when dropped.

**Edit: Whoops, look like Jia already did this. Check it out [here](https://www.npmjs.com/package/tessel-wifi).**

## Installation

```sh
npm install tessel-wifi
```

## Example

```js
require ('tessel-wifi') ({
  ssid: "tessel", // network
  password: "technicalmachine", // password
  timeout: 40, // seconds
  debug: true // show debug messages
}, function onConnected () {
  // Executes every time connection is gained
  console.log('I got connected!');
}, function onDisconnected () {
  // Executes when connection is dropped
  // tessel-wifi will automatically try to reconnect
  // and will then run the onConnected function if successful
  console.log('Connection dropped :( Trying to reconnect');
});
```

## PRs Welcome

This is simple and perhaps a bit hacky– if you have improvements, please poke around. The code isn't very big.
