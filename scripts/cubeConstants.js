var faces = ["Top", "Left", "Front", "Right", "Back", "Bottom"];
let colorLetters = ["y", "b", "r", "g", "o", "w"];
var defaultColors = ["yellow", "blue", "rgb(200, 0, 0)", "green", "#ff7200", "white"];

function letterToColor(letter) {
  let index = colorLetters.indexOf(letter);
  if (index === -1)
    throw "Unknown letter given: " + letter;
  return defaultColors[index];
}

var defaultFaceColor = {
  Top: letterToColor("y"),
  Left: letterToColor("b"),
  Front: letterToColor("r"),
  Right: letterToColor("g"),
  Back: letterToColor("o"),
  Bottom: letterToColor("w")
};

var defaultCorners = {
  "A":"y",  "B":"y",  "C":"y",  "D":"y",  "E":"b",  "F":"b",  "G":"b",  "H":"b",
  "I":"r",  "J":"r",  "K":"r",  "L":"r",  "M":"g",  "N":"g",  "O":"g",  "P":"g",
  "Q":"o",  "R":"o",  "S":"o",  "T":"o",  "U":"w",  "V":"w",  "W":"w",  "X":"w"
};

var defaultEdges = {
  "A":"y",  "B":"y",  "C":"y",  "D":"y",  "E":"b",  "F":"b",  "G":"b",  "H":"b",
  "I":"r",  "J":"r",  "K":"r",  "L":"r",  "M":"g",  "N":"g",  "O":"g",  "P":"g",
  "Q":"o",  "R":"o",  "S":"o",  "T":"o",  "U":"w",  "V":"w",  "W":"w",  "X":"w"
};

var defaultMiddlePieces = {
  "A":"y",  "B":"b",  "C":"r",  "D":"g",  "E":"o",  "F":"w"
};

var normalMoves = {
  "U":[["J","F","R","N"],["I","E","Q","M"],["A","B","C","D"]],
  "L":[["A","I","U","S"],["D","L","X","R"],["E","F","G","H"]],
  "F":[["D","M","V","G"],["C","P","U","F"],["I","J","K","L"]],
  "R":[["C","Q","W","K"],["B","T","V","J"],["M","N","O","P"]],
  "B":[["B","E","X","O"],["A","H","W","N"],["Q","R","S","T"]],
  "D":[["P","T","H","L"],["O","S","G","K"],["U","V","W","X"]],
  "M":[["A","I","U","S"],["C","K","W","Q"],["A","C","F","E"]],
  "E":[["L","P","T","H"],["J","N","R","F"],["B","C","D","E"]],
  "S":[["D","M","V","G"],["B","O","X","E"],["A","D","F","B"]]
};

var rotations = {
  "x":["R","Li","Mi"],
  "y":["U","Di","Ei"],
  "z":["F","Bi","S"]
};

var allNormalMoves = ["R","Ri","U","Ui","F","Fi","L","Li","D","Di","B","Bi"];

var allMiddleMoves = ["M","Mi","E","Ei","S","Si"];

var allRotations = ["x","xi","y","yi","z","zi"];

function determineMove (moveChar,cube, shouldRender = true){
  var move           = moveChar.charAt(0);
  var isRotation     = allRotations.indexOf(moveChar) != -1;
  var isMiddleMove   = allMiddleMoves.indexOf(moveChar) != -1;
  var isInverseMove  = moveChar.indexOf("i") != -1;

  if(isRotation)
    cube.doARotation(move,isInverseMove);
  else if (isMiddleMove)
    cube.doAMiddleMove(move,isInverseMove);
  else
    cube.doAMove(move,isInverseMove);

  if(shouldRender)
    cube.update();
}

function invertMove (moveChar){
  var invertedMove = [];
  for( x in normalMoves[moveChar])
    invertedMove.push(normalMoves[moveChar][x].slice().reverse());
  return invertedMove;
}

function invertChar (moveChar){
   return moveChar[1] == "i" ? moveChar[0] : moveChar + "i";
}

function returnPointer (PieceName,cube) {
  switch (PieceName){
    case "edge"   : return cube.edges;
    case "corner" : return cube.corners;
    case "middle" : return cube.middlePieces;
  }
}
