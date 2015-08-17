var prompt = require('prompt');
var natural = require('natural');
var request = require('request');
var classifier;
var filePath;
var data = {};
var count = 0;
var recordKey = '';

module.exports.init = init;

function getData(url) {
  request(url,
    function(err, response, body) {
      data = JSON.parse(body).results;
      count = data.count;
      loadClassifier();
    });
}

function classify() {
  recordKey = Object.keys(data)[0];
  console.log('Classifier will predict news class. Provide prediction feedback');
  console.log('1. Prediction correct 2. Prediction Incorrect 3. Save & Exit');
  loop(0);
}

function loop(ct) {
  if(ct == undefined) ct = 0;
  if(ct >= count) {
    save();
    return;
  }
  if(typeof data[recordKey][ct] != 'object') {
    save();
    return;
  }
  var headLinesKey = Object.keys(data[recordKey][ct])[0];
  var headlineText = data[recordKey][ct][headLinesKey].text;

  displayClass(headlineText,function(st) {
    if(st) return loop(++ct);
    else return;
  })
}

function displayClass(headlineText,callback) {
  var classified = classifier.classify(headlineText);
  var result = classified == 'crime' ? 'crime'.red : 'nocrime'.green;
  prompt.start();
  prompt.get({
    properties : {
      choice : {
        description : headlineText.black + ' ' + result,
        required : true
      }
    }
  },function(err,result) {
    switch(result.choice) {
      case '1' : callback(true);
      break;
      case '2' :
      var toggle;
      if(classified == 'crime') toggle = 'nocrime';
      else toggle = 'crime';
      classifier.addDocument(headlineText,toggle);
      callback(true);
      break;
      case '3' : save();
      callback(false);
      break;
    }
  })
}

function loadClassifier() {
  prompt.start();
  prompt.get({
    properties : {
      file : {
        description : 'Enter file to load classifier (from data lib)'
      }
    }
  },function(err,res) {
    filePath = 'data/'+res.file+'.json';
    console.log('Loading training data from ' + filePath);
    natural.BayesClassifier.load(filePath, null, function(err, classif) {
        if(err) {
          console.log('Not trained or invalid filePath');
        } else {
          classifier = classif;
          classify();
        }
    });
  })
}

function save() {
  classifier.train();
  classifier.save(filePath,function(err,clas) {
    if(!err) {
      console.log('classification data saved to ' + filePath);
    } else {
      console.log('saving error ...');
    }
  });
}

function init() {
  prompt.start();
  prompt.get({
    properties : {
      url : {
        description : 'Enter url to fetch data (kimono labs api only)'
      }
    }
  },function(err,res) {
    getData(res.url);
  })
}
