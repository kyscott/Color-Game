var colors = [];
var pickedColor;
var numSquares = 6;

var h1 = document.querySelector('h1');
var squares = document.querySelectorAll('.square');
var colorDisplay = document.getElementById('colorDisplay');
var messageDisplay = document.getElementById('message');
var resetButton = document.getElementById('reset');
var easyButton = document.getElementById('easy');
var hardButton = document.getElementById('hard');
var modeButtons = document.querySelectorAll('.mode');

var game = {
   start: function() {
      game.initializeButtons();
      colors = game.generateRandomColors(numSquares);
      pickedColor = game.pickColor();
      colorDisplay.innerHTML = pickedColor;
      h1.style.backgroundColor = 'steelblue';
      resetButton.innerHTML = 'New Colors';
      messageDisplay.innerHTML = '';
      game.initializeSquares();
   },

   initializeButtons: function() {
      for (var i = 0; i < modeButtons.length; i++) {
         modeButtons[i].addEventListener('click', function() {
            modeButtons[0].classList.remove('selected');
            modeButtons[1].classList.remove('selected')
            this.classList.add('selected');

            if (this.textContent === "Easy") {
               numSquares = 3;
            } else {
               numSquares = 6;
            }
            game.start();
         });
      }
      resetButton.addEventListener('click', function() {
         game.start();
      });
   },

   initializeSquares: function() {
      for (var i = 0; i < squares.length; i++) {

         if (colors[i]) {
            squares[i].style.display = 'block';
            squares[i].style.backgroundColor = colors[i];
         } else {
            squares[i].style.display = 'none';
         }

         squares[i].addEventListener('click', function() {
            var clickedColor = this.style.backgroundColor;
            if (clickedColor === pickedColor) {
               messageDisplay.innerHTML = 'Correct!'
               h1.style.backgroundColor = pickedColor;
               game.changeColors(pickedColor)
               resetButton.innerHTML = "Play Again?";
            } else {
               this.style.background = "#232323";
               messageDisplay.innerHTML = 'Try Again...';
            }
         })
      };
   },

   changeColors: function(color) {
      for (var i = 0; i < squares.length; i++) {
         squares[i].style.backgroundColor = color;
      }
   },

   pickColor: function() {
      var random = Math.floor(Math.random() * colors.length);
      return colors[random];
   },

   generateRandomColors: function(num) {
      var arr = [];
      for (var i = 0; i < num; i++) {
         arr.push(game.randomColor());
      }
      return arr;
   },

   randomColor: function() {
      var red = Math.floor(Math.random() * 255 + 1);
      var green = Math.floor(Math.random() * 255 + 1);
      var blue = Math.floor(Math.random() * 255 + 1);
      var result = `rgb(${red}, ${green}, ${blue})`;
      return result;
   }
}

game.start();
