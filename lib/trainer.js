var prompt = require('prompt');
var natural = require('natural');
var classifier = new natural.BayesClassifier();
var request = require('request');
var data = {};
var count = 0;
var recordKey = '';

module.exports.init = init;

function getData(url) {
  request(url,
    function(err, response, body) {
      if(err) {
        console.log('Sorry! Unable to fetch data from source');
      } else {
        data = JSON.parse(body).results;
        count = data.count;
        prepare();
      }
    });
}

function prepare() {
  recordKey = Object.keys(data)[0];
  console.log('Now you will train the classifier with some data. Identify whether the news headline corresponds to');
  console.log('1. Crime 2. Non Crime 3. Save & Exit');
  loop(0);
}

function train() {
  console.log('Training data..');
  classifier.train();
  console.log('Data trained. Proceeding to save ...');
  save();
}

function loop(ct) {
  if(ct == undefined) ct = 0;
  if(ct >= count) {
    train();
    return;
  }
  if(typeof data[recordKey][ct] != 'object') {
    train();
    return;
  }
  var headLinesKey = Object.keys(data[recordKey][ct])[0];
  var headlineText = data[recordKey][ct][headLinesKey].text;
  getUserChoice(headlineText,function(st) {
    if(st) return loop(++ct);
    else return;
  })
}

function getUserChoice(headlineText,callback) {
  prompt.start();
  prompt.get({
    properties : {
      choice : {
        description : headlineText,
        required : true
      }
    }
  },function(err,result) {
    switch(result.choice) {
      case '1' : classifier.addDocument(headlineText,'crime');
      callback(true);
      break;
      case '2' : classifier.addDocument(headlineText,'nocrime');
      callback(true);
      break;
      case '3' : train();
      callback(false);
      break;
    }
  })
}

function save() {
  prompt.start();
  prompt.get({
    properties : {
      file : {
        description : 'Enter the file name to save classification data [knowledge]'
      }
    }
  },function(err,result) {
    var fileName;
    if(result.file === '') fileName = 'knowledge.json';
    else fileName = result.file + '.json';
    var filePath = 'data/' + fileName;
    classifier.save(filePath,function(err,clas) {
      if(!err) {
        console.log('classification data saved to ' + filePath);
      } else {
        console.log('saving error ...');
      }
    });
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
