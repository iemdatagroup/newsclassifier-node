var commander = require('commander')
var trainer = require('./lib/trainer')
var classifier = require('./lib/classifier')
var utils = require('./lib/utils')
var user = require('./lib/user')
// var fs = require('fs')
// var file

commander
  .version('0.0.1')
  .option('-t --trainer <file>', 'train the classifier')
  .option('-c --classify <file>', 'classify news sources')
  .parse(process.argv)

if (commander.trainer) {
  utils.serializeData(commander.trainer, function (err, data) {
    if (err) throw err
    user(data.headLines, function (res) {
      trainer.train(res, function (err, res) {
        if (!err) console.log('classifier trained and saved in knowledge.json')
        else console.log('error')
      })
    })
  })
}

if (commander.classify) {
  utils.serializeData(commander.classify, function (err, data) {
    if (err) throw err
    classifier.classify(data.headLines)
  })
}

/*
prompt.start()
prompt.get({
  properties: {
    choice: {
      description: 'Enter 1 to train or 2 to classify'
    }
  }
}, function (err, res) {
  if (err) process.exit
  switch (res.choice) {
    case '1' : trainer.init(file)
      break
    case '2' : classifier.init(file)
      break
  }
})
*/
