const { nextISSTimesForMyLocation } = require('./iss');
//fetch my Ip:

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });

// fetch coords by ip:

// let ip = '11.11.111.111';
// fetchCoordsByIP(ip, (error, coords) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned coords:' , coords);
// });
 
// fetch pass times:

// const coords = {
//   "latitude": '11.1111',
//   "longitude": '-11.111',
// };
// fetchISSFlyOverTimes(coords, (error, riseTimes) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned risetimes:' , riseTimes);
// });

//next iss pass times:
const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }

  printPassTimes(passTimes);
});