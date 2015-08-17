var prompt = require('prompt');
var trainer = require('./lib/trainer');
var classifier = require('./lib/classifier');

prompt.start();
prompt.get({
  properties : {
    choice : {
      description : 'Enter 1 to train or 2 to classify'
    }
  }
},function(err,res) {
  switch(res.choice) {
    case '1' : trainer.init();
    break;
    case '2' : classifier.init();
    break;
  }
});
