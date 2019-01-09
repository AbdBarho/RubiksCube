var lastScramble = [];

function randomMove() {
  return allNormalMoves[Math.floor(Math.random() * allNormalMoves.length)];
}

function scramble() {
  var inputedValue = document.getElementById("scrambleLengthInput").value;
  var scrambleLength = inputedValue > 0 ? inputedValue : 25;
  var list = [randomMove()];
  var isRedundent = false;
  while (list.length < scrambleLength) {
    var last = list[list.length - 1];
    var x = randomMove();
    if (last == x && !isRedundent) {
      isRedundent = true;
      list.push(x);
    } else if ((last == x && isRedundent) || last == invertChar(x)) {
      while (last == x || last == invertChar(x))
        x = randomMove();
      isRedundent = false;
      list.push(x);
    } else {
      isRedundent = false;
      list.push(x);
    }
  }
  lastScramble = list;
  document.getElementById("scramble").innerHTML = list.join(" ");
}

function isDone(cube) {
  return compare(cube.corners, defaultCorners) &&
    compare(cube.edges, defaultEdges) &&
    compare(cube.middlePieces, defaultMiddlePieces);
}

function testScramble() {
  document.getElementById("numberOfRepeats").innerHTML = "calculating...";
  var testCube = new Cube();
  var counter = 1;
  testCube.doAnAlg(lastScramble);
  let runOnce = () => {
    if (isDone(testCube)) {
      document.getElementById("numberOfRepeats").innerHTML = counter;
      textCube.update();
      return;
    }
    counter++;
    testCube.doAnAlg(lastScramble);
    setTimeout(() => runOnce(), 0);
  };
  runOnce();
}

function compare(a, b) {
  for (x in a) {
    if (a[x] != b[x])
      return false;
  }
  return true;
}
