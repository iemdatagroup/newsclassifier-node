var prompt = require('prompt');
var trainer = require('./lib/trainer');
var classifier = require('./lib/classifier');
var fs = require('fs');
var file;


if(process.argv.length > 2) {
  var filename = process.argv[2];
  file = fs.readFileSync(filename);
}

prompt.start();
prompt.get({
  properties : {
    choice : {
      description : 'Enter 1 to train or 2 to classify'
    }
  }
},function(err,res) {
  switch(res.choice) {
    case '1' : trainer.init(file);
    break;
    case '2' : classifier.init(file);
    break;
  }
});
