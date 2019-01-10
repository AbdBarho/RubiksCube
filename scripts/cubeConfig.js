const FACES = ["Top", "Left", "Front", "Right", "Back", "Bottom"];
const COLOR_LETTERS = ["y", "b", "r", "g", "o", "w"];
const DEFAULT_COLORS = ["yellow", "blue", "rgb(200, 0, 0)", "green", "#ff7200", "white"];

const NORMAL_MOVES = ["R", "Ri", "U", "Ui", "F", "Fi", "L", "Li", "D", "Di", "B", "Bi"];
const MIDDLE_MOVES = ["M", "Mi", "E", "Ei", "S", "Si"];
const ROTATIONS = ["x", "xi", "y", "yi", "z", "zi"];

const DEFAULT_CORNERS = {
  A: "y", B: "y", C: "y", D: "y",
  E: "b", F: "b", G: "b", H: "b",
  I: "r", J: "r", K: "r", L: "r",
  M: "g", N: "g", O: "g", P: "g",
  Q: "o", R: "o", S: "o", T: "o",
  U: "w", V: "w", W: "w", X: "w"
};

const DEFAULT_EDGES = {
  A: "y", B: "y", C: "y", D: "y",
  E: "b", F: "b", G: "b", H: "b",
  I: "r", J: "r", K: "r", L: "r",
  M: "g", N: "g", O: "g", P: "g",
  Q: "o", R: "o", S: "o", T: "o",
  U: "w", V: "w", W: "w", X: "w"
};

const DEFAULT_MIDDLE_PIECES = {
  A: "y", B: "b", C: "r", D: "g", E: "o", F: "w"
};


const normalMoves = {
  U:[["J","F","R","N"],["I","E","Q","M"],["A","B","C","D"]],
  L:[["A","I","U","S"],["D","L","X","R"],["E","F","G","H"]],
  F:[["D","M","V","G"],["C","P","U","F"],["I","J","K","L"]],
  R:[["C","Q","W","K"],["B","T","V","J"],["M","N","O","P"]],
  B:[["B","E","X","O"],["A","H","W","N"],["Q","R","S","T"]],
  D:[["P","T","H","L"],["O","S","G","K"],["U","V","W","X"]],
  M:[["A","I","U","S"],["C","K","W","Q"],["A","C","F","E"]],
  E:[["L","P","T","H"],["J","N","R","F"],["B","C","D","E"]],
  S:[["D","M","V","G"],["B","O","X","E"],["A","D","F","B"]]
};
const rotations = {
  x: ["R", "Li", "Mi"],
  y: ["U", "Di", "Ei"],
  z: ["F", "Bi", "S"]
};
export default {
  getFaces() {
    return FACES;
  },
  getAllNormalMoves() {
    return NORMAL_MOVES;
  },
  getAllMiddleMoves() {
    return MIDDLE_MOVES;
  },
  getAllRotations() {
    return ROTATIONS;
  },
  getAllPossibleMoves() {
    return NORMAL_MOVES.concat(MIDDLE_MOVES.concat(ROTATIONS));
  },
  getRotation(char) {
    return rotations[char].slice();
  },
  getNormalMove(char) {
    return normalMoves[char].slice();
  },
  randomMove() {
    return NORMAL_MOVES[Math.floor(Math.random() * NORMAL_MOVES.length)];
  },
  getFaceColor(face) {
    return DEFAULT_COLORS[FACES.indexOf(face)];
  },
  invertChar(moveChar) {
    return moveChar[1] == "i" ? moveChar[0] : moveChar + "i";
  },
  invertMove(moveChar) {
    var invertedMove = [];
    for (let x of normalMoves[moveChar])
      invertedMove.push(x.slice().reverse());
    return invertedMove;
  },
  isDone(cube) {
    return isEqual(cube.corners, DEFAULT_CORNERS) &&
      isEqual(cube.edges, DEFAULT_EDGES) &&
      isEqual(cube.middlePieces, DEFAULT_MIDDLE_PIECES);
  },
  resetCube(cube) {
    cube.corners = Object.assign({}, DEFAULT_CORNERS);
    cube.edges = Object.assign({}, DEFAULT_EDGES);
    cube.middlePieces = Object.assign({}, DEFAULT_MIDDLE_PIECES);
  },
  letterToColor(letter) {
    return DEFAULT_COLORS[COLOR_LETTERS.indexOf(letter)];
  }
}

function isEqual(a, b) {
  for (let x in a)
    if (a[x] != b[x])
      return false;
  return true;
}
