const request = require('request');
//fetch ip
const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) {
      return callback(error, null);
    }
    if (response.statusCode !== 200) {
      callback(Error(`Status code ${response.statusCode} when fetching IP: ${body}`), null);
    }
    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};

//fetch coords by ip
const fetchCoordsByIP = function(ip, callback) {
  request('https://api.freegeoip.app/json/?apikey=xxxxxxxxxxxxxxxxxxxxxx', (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    
    const coords = {
      "latitude": JSON.parse(body).latitude,
      "longitude": JSON.parse(body).longitude
    };

    if (response.statusCode !== 200) {
      callback(Error(`Status code ${response.statusCode} when fetching coords for IP. Response: ${body}`), null);
      return;
    }
    callback(null, coords);
  });
};

//fetch pass times
const fetchISSFlyOverTimes = function(coords, callback) {
  request(`https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    if (error) {
      return callback(error, null);
    }
    if (response.statusCode !== 200) {
      callback(Error(`Status code ${response.statusCode} when fetching Iss pass times: ${body}`), null);
    }
    const pass = JSON.parse(body).response;
    callback(null, pass);
  });
};

//next iss pass times
const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if(error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(coords, (error, nextPasses) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, nextPasses);
      });
    });
  });

};

module.exports = { nextISSTimesForMyLocation };