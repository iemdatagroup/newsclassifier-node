var natural = require('natural')
var FILE_PATH = 'data/knowledge.json'
var colors = require('colors') // eslint-disable-line

module.exports = {
  classify: classify
}

function classify (data) {
  natural.BayesClassifier.load(FILE_PATH, null, function (err, classifier) {
    if (err) throw err
    data.map(function (record) {
      console.log(record + ' ' + displayClass(classifier.classify(record)))
    })
  })
}

function displayClass (newsClass) {
  switch (newsClass) {
    case 'crime' :
      return 'crime'.red
    case 'nocrime' :
      return 'nocrime'.green
  }
}
