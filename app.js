import Cube from "./src/cube";
import createCubeUI from "./src/cubeInterface";
import Scrambler from "./src/scrambler";


createCubeUI();
let cube = new Cube();
cube.update();

let scrambler = new Scrambler(cube);
scrambler.generateScramble();

document.querySelectorAll(".controlButton").forEach(button => {
  button.addEventListener("click", () => cube.move(button.textContent));
});

document.getElementById("generateScramble").addEventListener("click", () =>
  scrambler.generateScramble()
);

document.getElementById("applyScramble").addEventListener("click", () =>
  scrambler.applyScramble()
);

document.getElementById("reset").addEventListener("click", () => cube.reset());

document.getElementById("calculate").addEventListener("click", () => scrambler.testScramble());

window.cube = cube;
