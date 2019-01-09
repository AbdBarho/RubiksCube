const lengthInput = document.getElementById("scrambleLengthInput");
const scrambleElement = document.getElementById("scramble");
const numOfRepeatsElement = document.getElementById("numberOfRepeats");
var lastScramble = [];

function randomMove() {
  return allNormalMoves[Math.floor(Math.random() * allNormalMoves.length)];
}

function scramble() {
  var inputValue = lengthInput.value;
  var scrambleLength = inputValue > 0 ? inputValue : 25;
  var list = [randomMove()];
  var isRedundant = false;
  while (list.length < scrambleLength) {
    var last = list[list.length - 1];
    var x = randomMove();
    if (last == x && !isRedundant) {
      isRedundant = true;
      list.push(x);
    } else if ((last == x && isRedundant) || last == invertChar(x)) {
      while (last == x || last == invertChar(x))
        x = randomMove();
      isRedundant = false;
      list.push(x);
    } else {
      isRedundant = false;
      list.push(x);
    }
  }
  lastScramble = list;
 scrambleElement.innerHTML = list.join(" ");
}

function isDone(cube) {
  return compare(cube.corners, defaultCorners) &&
    compare(cube.edges, defaultEdges) &&
    compare(cube.middlePieces, defaultMiddlePieces);
}

function testScramble() {
  numOfRepeatsElement.textContent = "calculating...";
  var testCube = new Cube();
  var counter = 1;
  testCube.doAnAlg(lastScramble);
  let runOnce = () => {
    if (isDone(testCube)) {
      numOfRepeatsElement.textContent = counter;
      textCube.update();
      return;
    }
    counter++;
    testCube.doAnAlg(lastScramble);
    requestAnimationFrame(runOnce);
  };
  runOnce();
}

function compare(a, b) {
  for (x in a)
    if (a[x] != b[x])
      return false;
  return true;
}
