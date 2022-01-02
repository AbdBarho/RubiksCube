import Cube from "./cube";
import createCubeUI from "./cubeInterface";
import Scrambler from "./scrambler";


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
