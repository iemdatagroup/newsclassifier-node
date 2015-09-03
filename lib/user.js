var inquirer = require('inquirer')
var _ = require('lodash')

module.exports = function (data, callback) {
  inquirer.prompt({
    type: 'checkbox',
    name: 'trainer',
    message: 'Select crime news only',
    paginated: true,
    choices: data,
    validate: function (answer) {
      if (answer.length < 1) {
        return 'Choose at least one'
      }
      return true
    }
  }, function (answers) {
    var crime = answers.trainer
    var nocrime = _.difference(data, crime)
    var crime_chunk = _.chunk(crime, _.floor(crime.length * 0.7))
    var nocrime_chunk = _.chunk(nocrime, _.floor(nocrime.length * 0.7))
    var train_data = {
      'crime': crime_chunk[0],
      'nocrime': nocrime_chunk[0]
    }
    var test_data = {
      'crime': crime_chunk[1],
      'nocrime': nocrime_chunk[1]
    }
    callback({
      'train': train_data,
      'test': test_data
    })
  })
}
