var express = require('express');
var router = express.Router();
var game = require('../game');

/* GET home page. */
router.get('/', function(req, res, next) {
  game.initializeGame();
  res.render('index', { title: 'Battleship Game', displayArray: game.displayArray(), displayBoard: game.displayBoard()})
});

router.post('/processInput', function(req, res, next) {
  if ((game.getScore().countMisses < 5) && (game.getScore().countHits < 5)) 
  {
    game.playGame(req.body.number);
    res.render('index', { title: 'Battleship Game', displayArray: game.displayArray(), displayBoard: game.displayBoard(), debug: false /*to see the array as needed*/})
  }
  else if ((game.getScore().countMisses >= 5) && (game.getScore().countHits < 5)) {
    res.render('score', { title: 'Battleship Game Ended', countTries: game.getScore().countTries, countMisses: game.getScore().countMisses, countHits: game.getScore().countHits, condition: true});
  } 
  else if ((game.getScore().countMisses < 5) && (game.getScore().countHits >= 5)) {
    res.render('score', { title: 'Battleship Game Ended', countTries: game.getScore().countTries, countMisses: game.getScore().countMisses, countHits: game.getScore().countHits, condition: false})
  }

});

module.exports = router;
