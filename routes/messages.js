'use strict';
var router = require('express').Router();
var AV = require('leanengine');

var Message = AV.Object.extend('Messages');

// Todo list
router.get('/', function(req, res, next) {
  var query = new AV.Query(Message);
  query.descending('createdAt');
  query.find().then(function(results) {
    res.render('messages', {
      title: 'Messages',
      messages: results
    });
  }, function(err) {
    if (err.code === 101) {
      // Todo class does not exist in the cloud yet.
      res.render('messages', {
        title: 'Messages',
        messages: []
      });
    } else {
      next(err);
    }
  }).catch(next);
});

// Creates a new todo item.
router.post('/', function(req, res, next) {
  var content = req.body.content;
  var message = new Message();
  message.set('content', content);
  message.save().then(function(todo) {
    res.redirect('/messages');
  }).catch(next);
});

module.exports = router;
