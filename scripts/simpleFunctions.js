

//FindPiece, randomly generaes a pair
function generatePiece() {
    "use strict";
    var intValueOfLetterA           = 65;
    var randomNumber                = Math.floor(Math.random() * 1000) % 24;
    var pieceNum                    = String.fromCharCode(intValueOfLetterA + randomNumber);
    //get a new random number
    randomNumber                    = Math.floor(Math.random() * 1000);
    var pieceType                   = randomNumber % 2 ? "Corner" : "Edge";
    document.getElementById("generatedPiece").innerHTML = pieceNum + " " + pieceType;
}
