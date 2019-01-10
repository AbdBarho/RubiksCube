import CubeConfig from "./cubeConfig";
const CubeDiv = document.getElementById("Cube3D");

function create2dCubePieces() {
  let piecesCounter = 0;
  let commandString = "";
  let faces = CubeConfig.getFaces();
  for (let face of faces) {
    //begin by creating a divider to 3 columns
    commandString += '<div class="col-4">';
    //add name of the face as text
    commandString += '<p class="faceText">' + face + '</p>';
    //add a face div to make it easier to copy to 3d mode
    commandString += '<div id="' + face + '">';
    //add first row of titles
    commandString += '<div class="row">';
    //add corner + edge + corner
    commandString += '<div class="square" id="corner' + piecesCounter + '"></div>';
    commandString += '<div class="square" id="edge' + piecesCounter + '"></div>';
    commandString += '<div class="square" id="corner' + (piecesCounter + 1) + '"></div>';
    //End of first row
    commandString += '</div>';
    //add second row of titles
    commandString += '<div class="row">';
    //add edge + center piece + edge
    commandString += '<div class="square" id="edge' + (piecesCounter + 3) + '"></div>';
    commandString += '<div class="square" id="center' + (piecesCounter / 4) + '" style="background-color:' +
      CubeConfig.getFaceColor(face) + '"></div>';
    commandString += '<div class="square" id="edge' + (piecesCounter + 1) + '"></div>';
    //End second row
    commandString += '</div>';
    //add third row
    commandString += '<div class="row">';
    //add corner + edge + corner
    commandString += '<div class="square" id="corner' + (piecesCounter + 3) + '"></div>';
    commandString += '<div class="square" id="edge' + (piecesCounter + 2) + '"></div>';
    commandString += '<div class="square" id="corner' + (piecesCounter + 2) + '"></div>';
    //End third row
    commandString += '</div>';
    //end face div
    commandString += '</div>';
    //End column
    commandString += '</div>';
    //the face is now done
    //increment pieces counter
    piecesCounter += 4;
  }
  //after the command is created, add it to the page
  document.getElementById("TextCube").innerHTML = commandString;
}

function createControlButtons() {
  let commandString = "";
  let moveList = CubeConfig.getAllPossibleMoves();
  for (let move of moveList)
    commandString += '<button class="controlButton">' + move + '</button>';
  //after the command is created, add it to the page
  document.getElementById("Control").innerHTML = commandString;

}

function create3dCube() {
  for (let face of CubeConfig.getFaces()) {
    let copy = document.getElementById(face).cloneNode(true);
    copy.id += "3D";
    let innerDivs = copy.getElementsByTagName("*");
    for (let i = 0; i < innerDivs.length; i++)
      if (innerDivs[i].classList.contains("square")) {
        innerDivs[i].className = "square3d";
        innerDivs[i].id += "3D";
      }
    CubeDiv.appendChild(copy);
  }
}

export default function createCubeUI() {
  create2dCubePieces();
  createControlButtons();
  create3dCube();
}
