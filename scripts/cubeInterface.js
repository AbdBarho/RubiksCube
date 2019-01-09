function create2dCubePieces(){
  var piecesCounter = 0;
  var commandString="";
  for (face in faces){
    //begin by creating a dvider to 3 coloumns
    commandString += '<div class="col-md-4" style="padding: 3%;">';
    //add name of the face as text
    commandString += '<p style="text-align: left;">' + faces[face] + '</p>';
    //add a face div to make it easier to copy to 3d mode
    commandString += '<div id="' + faces[face] + '">';
    //add first row of titles
    commandString += '<div class="row">';
    //add corner + edge + corner
    commandString += '<div class="square" id="corner' + piecesCounter + '"></div>';
    commandString += '<div class="square" id="edge' + piecesCounter + '"></div>';
    commandString += '<div class="square" id="corner' + (piecesCounter+1) + '"></div>';
    //End of first row
    commandString += '</div>';
    //add second row of titles
    commandString += '<div class="row">';
    //add edge + center piece + edge
    commandString += '<div class="square" id="edge' + (piecesCounter+3) + '"></div>';
    commandString += '<div class="square" id="center' + (piecesCounter/4) + '" style="background-color:'
                    + defaultFaceColor[faces[face]] + '"></div>';
    commandString += '<div class="square" id="edge' + (piecesCounter+1) + '"></div>';
    //End second row
    commandString += '</div>';
    //add third row
    commandString += '<div class="row">';
    //add corner + edge + corner
    commandString += '<div class="square" id="corner' + (piecesCounter+3) + '"></div>';
    commandString += '<div class="square" id="edge' + (piecesCounter+2) + '"></div>';
    commandString += '<div class="square" id="corner' + (piecesCounter+2) + '"></div>';
    //End third row
    commandString += '</div>';
    //end facediv
    commandString += '</div>';
    //End coloumn
    commandString += '</div>';
    //the face is now done
    //increment pieces counter
    piecesCounter += 4;
  }
  //after the command is created, add it to the page
  document.getElementById("TextCube").innerHTML = commandString;
}

  function createControlButtons(){
    var commandString="";
    var moveList = allNormalMoves.concat(allMiddleMoves.concat(allRotations));
    //add buttons to control panel
    for(x in moveList){
      //avoid html errors
      var onClickString = 'determineMove("' + moveList[x] +'",textCube)>';
      commandString += '<button class="btn btn-primary" style="width: 50%;" onclick=' +
        onClickString + moveList[x] + '</button>';
    }
    //after the command is created, add it to the page
    document.getElementById("Control").innerHTML = commandString;

}

function create3dCube(){
  var cubeDiv = document.getElementById("Cube3D");
  for(face in faces){
    var copy = document.getElementById(faces[face]).cloneNode(true);
    copy.id += "3D";
    var innerDivs = copy.getElementsByTagName("*");
    for (var i =0; i< innerDivs.length; i++)
      if(innerDivs[i].classList.contains("square")){
        innerDivs[i].className += " square3d";
        innerDivs[i].id+= "3D";
      }

    cubeDiv.appendChild(copy);

  }
}
