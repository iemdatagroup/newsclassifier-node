var natural = require('natural')
var tokenizer = new natural.TreebankWordTokenizer()
var FILE_PATH = 'data/knowledge.json'
var utils = require('./utils')

module.exports = {
  prepare: prepare,
  train: train,
  save: save
}

function prepare (data) {
  if (data instanceof Array) {
    return data.map(function (s) {
      return utils.removeStopWords(s)
    })
  } else {
    return utils.removeStopWords(data)
  }
}

function train (data, callback) {
  natural.BayesClassifier.load(FILE_PATH, null, function (err, classifier) {
    if (err) throw err
    data.train.crime.forEach(function (news) {
      classifier.addDocument(tokenizer.tokenize(prepare(news)), 'crime')
    })
    data.train.nocrime.forEach(function (news) {
      classifier.addDocument(tokenizer.tokenize(prepare(news)), 'nocrime')
    })
    console.log('Training data..')
    classifier.train()
    console.log('Data trained.')
    var acc = accuracy(classifier, data)
    console.log('Accuracy : ' + acc + ' %')
    console.log('Proceeding to save ...')
    save(classifier, function (err, status) {
      if (err) throw err
      callback(null, {
        'saved': status,
        'accuracy': acc
      })
    })
  })
}

function accuracy (classifier, data) {
  var count_right = 0
  data.test.crime.forEach(function (news) {
    console.log('classifying crime news : "' + news + '"" as ' + classifier.classify(news))
    if (classifier.classify(news) === 'crime') {
      count_right++
    }
  })
  data.test.nocrime.forEach(function (news) {
    console.log('classifying non crime news : "' + news + '"" as ' + classifier.classify(news))
    if (classifier.classify(news) === 'nocrime') {
      count_right++
    }
  })
  return (count_right / (data.test.crime.length + data.test.nocrime.length)) * 100
}

function save (classifier, callback) {
  classifier.save(FILE_PATH, function (err, clas) {
    if (!err) {
      console.log('classification data saved to ' + FILE_PATH)
      callback(null, true)
    } else {
      console.log('saving error ...')
      throw new Error('saving classifier data issue')
    }
  })
}
