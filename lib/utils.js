'use strict'

var stopwords = require('stopwords').english
var path = require('path')
var csv = require('csv')
var fs = require('fs')

module.exports = {
  serializeData: serializeData,
  removeStopWords: removeStopWords
}

function serializeData (file, callback) {
  var headLines = []
  var urls = []

  fs.readFile(file, function (err, data) {
    if (err) throw err
    if (path.extname(file) === '.json') {
      data = JSON.parse(data)
      if (data.hasOwnProperty('results')) {
        var key = Object.keys(data.results)[0]
        headLines = data.results[key].map(function (record) {
          return record.headlines.text
        })
        urls = data.results[key].map(function (record) {
          return record.headlines.href
        })
        callback(null, {headLines: headLines, urls: urls})
      }
    }
    if (path.extname(file) === '.csv') {
      csv.parse(data, function (err, data) {
        if (err) throw err
        var index = data[0].indexOf('text')
        var records = data.splice(1)
        var urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig
        var usernameRegex = /(^|[^@\w])@(\w{1,15})\b/
        headLines = records.map(function (record) {
          return record[index].replace(urlRegex, function (url) {
            return ''
          }).replace(usernameRegex, function (user) {
            return ''
          })
        })
        urls = records.map(function (record) {
          return record[index].match(urlRegex)[0]
        })
        callback(null, {headLines: headLines, urls: urls})
      })
    }
  })
}

function removeStopWords (sentence) {
  var x
  var y
  var word
  var stop_word
  var regex_str
  var regex
  var cleansed_string = sentence
  // Split out all the individual words in the phrase
  var words = cleansed_string.match(/[^\s]+|\s+[^\s+]$/g)

  // Review all the words
  for (x = 0; x < words.length; x++) {
    // For each word, check all the stop words
    for (y = 0; y < stopwords.length; y++) {
      // Get the current word
      word = words[x].replace(/\s+|[^a-z]+/ig, '') // Trim the word and remove non-alpha

      // Get the stop word
      stop_word = stopwords[y]

      // If the word matches the stop word, remove it from the keywords
      if (word.toLowerCase() === stop_word) {
        // Build the regex
        regex_str = '^\\s*' + stop_word + '\\s*$' // Only word
        regex_str += '|^\\s*' + stop_word + '\\s+' // First word
        regex_str += '|\\s+' + stop_word + '\\s*$' // Last word
        regex_str += '|\\s+' + stop_word + '\\s+' // Word somewhere in the middle
        regex = new RegExp(regex_str, 'ig')

        // Remove the word from the keywords
        cleansed_string = cleansed_string.replace(regex, ' ')
      }
    }
  }
  return cleansed_string.replace(/^\s+|\s+$/g, '')
}
