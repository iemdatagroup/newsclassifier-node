var assert = require('assert')
var trainer = require('../lib/trainer')
var utils = require('../lib/utils')

describe('Testing Trainer suite', function () {
  it('should return stop words array', function () {
    var arr = ['here is a string that has some stop words in it', 'stop words in it']
    var expected = ['string stop words', 'stop words']
    assert.deepEqual(trainer.prepare(arr), expected)
  })
})

describe('Testing utils', function () {
  it('should return proper stop words for sentences', function () {
    assert.equal(utils.removeStopWords('here is a string that has some stop words in it'), 'string stop words')
  })
  it('should serialize kimonolabs api data', function () {
    var file = 'data/testInput.json'
    var expected = {
      headLines: ['Stop & start in tale of two halves', 'Eden Gardens at its loudest'],
      urls: ['http://www.telegraphindia.com/1150501/jsp/calcutta/story_17643.jsp',
        'http://www.telegraphindia.com/1150501/jsp/calcutta/story_17642.jsp']
    }

    utils.serializeData(file, function (err, data) {
      if (err) throw err
      assert.deepEqual(data, expected)
    })
  })
})
