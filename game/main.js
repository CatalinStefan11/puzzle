/* 
puzzle games: 
http://www.raymondhill.net/puzzle-rhill/jigsawpuzzle-rhill.php
https://shout.setfive.com/2015/04/23/javascript-building-a-html5-canvas-puzzle/
*/

let game;




// TODO: move in navigation.js
const loadImage = document.getElementById('load__image');
loadImage.addEventListener('input', loadImageEventHandler);




const difficulty = document.getElementById('difficulty_slider');



function loadImageEventHandler() {
  
        let reader = new FileReader();
        let imagePath = loadImage.files[0];

        reader.readAsDataURL(imagePath);
        reader.addEventListener("load", () => drawImageFromSrcOnCanvas(reader.result));
    
}


function drawImageFromSrcOnCanvas(imageSrc) {
    let image = new Image();
    image.src = imageSrc;

    image.addEventListener("load", function () {
        
            // let difficulty = new Difficulty(pieceNumber.value, pieceShape.value);
            game = new Game(image, difficulty.value);
       

     

        game.initializeGame();
    });
}

function onUpEventHandler() {
    game.releasePiece();
}

function onDownEventHandler(event) {
    let clickPosition = game.canvas.getClickCoordinatesOnCanvas(event);
    game.determineClickedPiece(clickPosition);
}

function onMoveEventHandler(event) {
    if (game.clickedPieceIndex !== -1) {
        game.movePiece(event);
    }
}

function onResetEventHandler() {
    
    

    game.pieces = [];
    game.solvedPieces = [];
    game.difficulty = difficulty.value;
    game.initializePuzzle();
    
}


function onResolvePieceEventHandler() {
    if (game.isOver()) {
        return;
    }
    resolveRandomPiece();
}


function onResolvePuzzleEventHandler(){
    
    if(!game.isOver()){
        resolveRandomPiece();
        setTimeout(onResolvePuzzleEventHandler, 100);
    }
    else{
        var audio = new Audio('media/flip.mp3');
        audio.play();
        return;
    }
}

// https://stackoverflow.com/questions/5915096/get-random-item-from-javascript-array
function resolveRandomPiece(){
    let randomIndex = Math.floor(Math.random() * game.pieces.length);
    let piece = game.pieces[randomIndex];
    piece.moveToFinalLocation();
    piece.makeVisible();
    piece.markAsSolved();
    game.moveToSolvedPieces(randomIndex);
   
}














