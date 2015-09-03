var request = require('request')

module.exports = {
  getKimonoData: getKimonoData
}

function getKimonoData (url, callback) {
  request(url,
    function (err, response, body) {
      if (err) {
        console.log('Sorry! Unable to fetch data from source')
        callback(false)
      } else {
        var data = JSON.parse(body)
        callback(data)
      }
    })
}
