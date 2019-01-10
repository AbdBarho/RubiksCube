import CubeConfig from "./cubeConfig";
const cubeRef = document.getElementById("Cube3D");

export default class Cube {
  constructor() {
    CubeConfig.resetCube(this);
  }

  move(moveChar, shouldRender = true) {
    let move = moveChar.charAt(0);
    let isRotation = CubeConfig.getAllRotations().indexOf(moveChar) != -1;
    let isMiddleMove = CubeConfig.getAllMiddleMoves().indexOf(moveChar) != -1;
    let isInverseMove = moveChar.indexOf("i") != -1;

    if (isRotation)
      this.doARotation(move, isInverseMove);
    else if (isMiddleMove)
      this.doAMiddleMove(move, isInverseMove);
    else
      this.doANormalMove(move, isInverseMove);

    if (shouldRender)
      this.update();
  }

  doANormalMove (moveChar, isInverseMove) {
    let moveSequence = isInverseMove ? CubeConfig.invertMove(moveChar) : CubeConfig.getNormalMove(moveChar);
    moveSequence.forEach(x => this.switchPieces(x, "corner"));
    moveSequence.shift();
    moveSequence.forEach(x => this.switchPieces(x, "edge"));
  }

  doAMiddleMove (moveChar, isInverseMove) {
    let moveSequence = isInverseMove ? CubeConfig.invertMove(moveChar) : CubeConfig.getNormalMove(moveChar);
    this.switchPieces(moveSequence.pop(), "middle");
    moveSequence.forEach(x => this.switchPieces(x, "edge"));
  }

  doARotation (moveChar, isInverseMove) {
    let animationName = moveChar + (isInverseMove ? "i" : "") + "Rotation";
    let moves = CubeConfig.getRotation(moveChar)
    if(isInverseMove)
      moves = moves.map(x => CubeConfig.invertChar(x));

    console.log("before")
    cubeRef.classList.add(animationName);
    setTimeout(() => {
      moves.forEach(x => this.move(x, false));
      cubeRef.classList.remove(animationName);
      console.log("now")
      this.update();
      console.log("after")
    }, 300);
  }

  switchPieces(toBeMovedPieces, PieceType) {
    let cubePieces = this.getPieces(PieceType);
    let temp = toBeMovedPieces.map(x => cubePieces[x])
    temp.unshift(temp.pop());
    toBeMovedPieces.forEach((x, i) => cubePieces[x] = temp[i]);
  }

  doAnAlg (alg) {
    alg.forEach(x => this.move(x));
  }

  isDone() {
    return CubeConfig.isDone(this);
  }

  update() {
    console.log("render")
    let i = 0;
    for (let x of Object.values(this.corners)) {
      document.getElementById("corner" + i).style.backgroundColor = CubeConfig.letterToColor(x);
      document.getElementById("corner" + i + "3D").style.backgroundColor = CubeConfig.letterToColor(x);
      i++;
    }

    i = 0;
    for (let x of Object.values(this.edges)) {
      document.getElementById("edge" + i).style.backgroundColor = CubeConfig.letterToColor(x);
      document.getElementById("edge" + i + "3D").style.backgroundColor = CubeConfig.letterToColor(x);
      i++;
    }

    i = 0;
    for (let x of Object.values(this.middlePieces)) {
      document.getElementById("center" + i).style.backgroundColor = CubeConfig.letterToColor(x);
      document.getElementById("center" + i + "3D").style.backgroundColor = CubeConfig.letterToColor(x);
      i++;
    }
  }

  getPieces(pieceType) {
    switch (pieceType) {
      case "edge":
        return this.edges;
      case "corner":
        return this.corners;
      case "middle":
        return this.middlePieces;
    }
  }


  reset() {
    CubeConfig.resetCube(this);
    this.update();
  }
}
