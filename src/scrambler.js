import Cube from "./cube";
import CubeConfig from "./cubeConfig";

let lengthInput = document.getElementById("scrambleLengthInput");
let scrambleElement = document.getElementById("scramble");
let numOfRepeatsElement = document.getElementById("numberOfRepeats");

export default class Scrambler {
  constructor(cube) {
    this.cube = cube;
    this.lastScramble = [];
    this.isCalculating = false;
  }

  generateScramble() {
    let inputValue = lengthInput.value;
    let scrambleLength = Math.min(Math.max(0, inputValue), 50);
    let list = [CubeConfig.randomMove()];
    let isRedundant = false;
    while (list.length < scrambleLength) {
      let last = list[list.length - 1];
      let x = CubeConfig.randomMove();
      if (last == x && !isRedundant) {
        isRedundant = true;
        list.push(x);
      } else if ((last == x && isRedundant) || last == CubeConfig.invertChar(x)) {
        while (last == x || last == CubeConfig.invertChar(x))
          x = CubeConfig.randomMove();
        isRedundant = false;
        list.push(x);
      } else {
        isRedundant = false;
        list.push(x);
      }
    }
    this.lastScramble = list;
    scrambleElement.textContent = list.join(" ");
    numOfRepeatsElement.textContent = "???"
  }

  applyScramble() {
    this.cube.doAnAlg(this.lastScramble);
  }

  testScramble() {
    if (this.isCalculating)
      return;
    this.isCalculating = true;
    numOfRepeatsElement.textContent = "calculating...";
    let testCube = new Cube();
    let counter = 1;
    testCube.doAnAlg(this.lastScramble);
    let runOnce = () => {
      if (testCube.isDone()) {
        numOfRepeatsElement.textContent = counter;
        this.isCalculating = false;
        this.cube.update();
        return;
      }
      counter++;
      testCube.doAnAlg(this.lastScramble);
      requestAnimationFrame(runOnce);
    };
    runOnce();
  }
}
