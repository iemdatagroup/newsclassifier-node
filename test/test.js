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
    var data = {'name': 'Telegraph Calcutta Crawler',
      'count': 277,
      'frequency': 'Manual Crawl',
      'version': 5,
      'newdata': true,
      'lastrunstatus': 'success',
      'thisversionstatus': 'success',
      'thisversionrun': 'Mon Aug 24 2015 08:39:09 GMT+0000 (UTC)',
      'results': {
        'Calcutta News': [
          {
            'headlines': {
              'href': 'http://www.telegraphindia.com/1150501/jsp/calcutta/story_17643.jsp',
              'text': 'Stop & start in tale of two halves'
            },
            'url': 'http://www.telegraphindia.com/1150501/jsp/calcutta/index.jsp#.VdrVy4HNfxA',
            'index': 1
          },
          {
            'headlines': {
              'href': 'http://www.telegraphindia.com/1150501/jsp/calcutta/story_17642.jsp',
              'text': 'Eden Gardens at its loudest'
            },
            'url': 'http://www.telegraphindia.com/1150501/jsp/calcutta/index.jsp#.VdrVy4HNfxA',
            'index': 2
          }]
      }
    }
    var expected = {
      headLines: ['Stop & start in tale of two halves', 'Eden Gardens at its loudest'],
      urls: ['http://www.telegraphindia.com/1150501/jsp/calcutta/story_17643.jsp',
        'http://www.telegraphindia.com/1150501/jsp/calcutta/story_17642.jsp']
    }

    assert.deepEqual(utils.serializeData(data), expected)
  })
})
