function Cube() {

  this.corners = Object.assign({}, defaultCorners);
  this.edges = Object.assign({}, defaultEdges);
  this.middlePieces = Object.assign({}, defaultMiddlePieces);


  this.doAMove = function (moveChar, isInverseMove) {
    var moveSequence = isInverseMove ? invertMove(moveChar) : normalMoves[moveChar].slice();
    moveSequence.forEach((x) => this.switchPieces(x, "corner"));
    moveSequence.shift();
    moveSequence.forEach((x) => this.switchPieces(x, "edge"));
  };

  this.doAMiddleMove = function (moveChar, isInverseMove) {
    let moveSequence = isInverseMove ? invertMove(moveChar) : normalMoves[moveChar].slice();
    this.switchPieces(moveSequence.pop(), "middle");
    moveSequence.forEach((x) => this.switchPieces(x, "edge"));
  };

  this.doARotation = function (moveChar, isInverseMove) {
    let cubeRef = document.getElementById("Cube3D");
    let animationName, moves;
    if (isInverseMove) {
      animationName = moveChar + "iRotation";
      moves = rotations[moveChar].map(x => invertChar(x));
    } else {
      animationName = moveChar + "Rotation";
      moves = rotations[moveChar];
    }
    cubeRef.classList.add(animationName);
    cubeRef.style.animationPlayState = "running";
    setTimeout(() => {
      // debugger
      moves.forEach((x) => determineMove(x, this, false));
      cubeRef.classList.remove(animationName);
      this.update();
    }, 300);
  };

  this.switchPieces = function (toBeMovedPieces, PieceType) {
    var cubePieces = returnPointer(PieceType, this);
    var temp = [];
    for (x in toBeMovedPieces)
      temp.push(cubePieces[toBeMovedPieces[x]]);

    temp.unshift(temp.pop());

    for (x in toBeMovedPieces)
      cubePieces[toBeMovedPieces[x]] = temp[x];

  };

  this.doAnAlg = function (alg) {
    alg.forEach(function (x) {
      determineMove(x, this);
    }, this);
  };


  this.update = function () {
    var i = 0;
    for (x in this.corners) {
      document.getElementById("corner" + i).style.backgroundColor = letterToColor(this.corners[x]);
      document.getElementById("corner" + i + "3D").style.backgroundColor = letterToColor(this.corners[x]);
      i++;
    }

    i = 0;
    for (x in this.edges) {
      document.getElementById("edge" + i).style.backgroundColor = letterToColor(this.edges[x]);
      document.getElementById("edge" + i + "3D").style.backgroundColor = letterToColor(this.edges[x]);
      i++;
    }

    i = 0;
    for (x in this.middlePieces) {
      document.getElementById("center" + i).style.backgroundColor = letterToColor(this.middlePieces[x]);
      document.getElementById("center" + i + "3D").style.backgroundColor = letterToColor(this.middlePieces[x]);
      i++;
    }

  };

  this.reset = function () {
    this.corners = Object.assign({}, defaultCorners);
    this.edges = Object.assign({}, defaultEdges);
    this.middlePieces = Object.assign({}, defaultMiddlePieces);
    this.update();
  }

};
