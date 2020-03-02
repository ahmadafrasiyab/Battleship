
//Setting initial variables
  var x = new Array(10);
  var shipCount = 0;
  var noOfShips = 5;
  var shipSize = 2;
  var countSpot = 0;
  var ship3Count = 0;
  var countHits = 0;
  var countMisses = 0;
  var countTries = 0;
  

  //functions to setup and play game

  function initializeGame() {
    createArray();
    initializeArray();
    shipLocator();
  }

  function playGame(input) {
    
    console.log("touched game");
    var rowCol = parseInput(input);
    var row = rowCol.row;
    var col = rowCol.col;
    updateArray(row, col);
  }

  function parseInput(input) {
    console.log("touched parseInout");
    row = Math.floor(input/10);
    col = input % 10;
    console.log({row,col});
    return {row, col};
  }  

  function createArray(){
    console.log("touched createArray");
    for (var i = 0; i < x.length; i++) {
    x[i] = new Array(10);
    }
  }

  
  function initializeArray() {
    console.log("initialized array")
    for (var i = 0; i < x.length; i++)
      for (var j = 0; j < x[i].length; j++)
        x[i][j] = 'O';
  }
  

  function updateArray(row, col) {
    console.log("updated array");
      if((x[row][col]) == 'X') {
        x[row][col] = 'h';
       console.log(countHits++);
        console.log(countTries++);
      }
      else if ((x[row][col]) == 'O') {
        x[row][col] = 'm';
        console.log(countMisses++);
        console.log(countTries++);
      }
      else {
        console.log(countTries++);
        console.log(countMisses++);
      }
    }
  
    function displayArray() {
      console.log("display Array called");
    var html ="";
    for (var i = 0; i < x.length; i++) {
      for (var j = 0; j < x[i].length; j++) {
        html += ("<tt>" + x[i][j] + "&nbsp" + "</tt>");
      }
      html += "</br>";
    }
    return html;
    } 

 
  function displayBoard(){
    console.log("display Board called");
    var html = "";
    for (var i=0; i < x.length; i++){
      for (var j = 0; j <x.length; j++) {
        
        if (x[i][j] == 'O') {
            
            html = html + "<img src='./images/water.png' height='15' width='15'>"
        }

        if (x[i][j] == 'X'){
            
            html = html + "<img src='./images/water.png' height='15' width='15'>"
        } 

        if (x[i][j] == 'h'){
            
                html = html + "<img src='./images/hit.png' height='15' width='15'>"
        } 
          
        if (x[i][j] == 'm'){
            
                html = html + "<img src='./images/miss.png' height='15' width='15'>"
        } 
      }
      html = html + "</br>";
   }
   return html;
   }
  
  function shipLocator(){	
    
    console.log("shipLocator called");
    while(shipCount < noOfShips) {
      var overlapped = false;
      var orientation = Math.random();
      if (orientation < 0.5) {
        var Ri = getRandomArbitrary(0,x.length - 1);
        var Ci = getRandomArbitrary(0,x.length - shipSize);
        while ((countSpot != shipSize) && (!overlapped)) {
          if (x[Ri][Ci] != 'X') {
            x[Ri][Ci] = 'X';
            Ci++;
            countSpot++;
            }
          else {
            overlapped = true;
          }
        }
        if (countSpot == shipSize){
          if((shipSize == 3) && (ship3Count < 1))
          {
             ship3Count++;
             shipSize--;
          }
          shipSize++;
          shipCount++;
          countSpot = 0;	
        }
      }
      else {
        var Ri = getRandomArbitrary(0, x.length - shipSize);
        var Ci = getRandomArbitrary(0, x.length);
        while ((countSpot != shipSize) && (!overlapped)) {
          if (x[Ri][Ci] != 'X') {
            x[Ri][Ci] = 'X';
            Ri++;
            countSpot++;
            }
          else {
            overlapped = true;
          }
        }
        if (countSpot == shipSize) {
           if((shipSize == 3) && (ship3Count < 1))
           {
             ship3Count++;
             shipSize--;
           }
          shipSize++;
          shipCount++;
          countSpot = 0;	
        }
      }
    }
    } 

    function getRandomArbitrary(min, max) {
      console.log("getRandom called");
      return Math.floor(Math.random() * (max - min));
    }

    function getScore() {
      return {countTries, countMisses, countHits};
    }
    module.exports = {playGame, displayArray, displayBoard, initializeGame, getScore};