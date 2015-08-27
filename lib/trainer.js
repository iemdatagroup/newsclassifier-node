var inquirer = require('inquirer')
var natural = require('natural')
var classifier = new natural.BayesClassifier()
var data = {}
var count = 0
var recordKey = ''
var tokenizer = new natural.TreebankWordTokenizer()
var FILE_PATH = 'data/knowledge.json'
var utils = require('./utils')

module.exports = {
  prepare: prepare
}

function prepare (data) {
  // data available in variable
  return data.map(function (s) {
    return utils.removeStopWords(s)
  })
}

function train (data, choices) {
  for (var i = 0;i < choices.length;i++) {
    switch (choices[i]) {
      case 0 : classifier.addDocument(data[i], 'nocrime')
        break
      case 1 : classifier.addDocument(data[i], 'crime')
        break
    }
  }
  console.log('Training data..')
  classifier.train()
  console.log('Data trained. Proceeding to save ...')
}

function save (callback) {
  classifier.save(FILE_PATH, function (err, clas) {
    if (!err) {
      console.log('classification data saved to ' + FILE_PATH)
      callback(true)
    } else {
      console.log('saving error ...')
      callback(false)
    }
  })
}

function runner (data) {
  // clean data of stopwords
  prepare(data)
}
