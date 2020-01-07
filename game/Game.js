class Game {
    constructor(image, difficulty) {
        this.canvas = new Canvas(image);
        this.image = image;
        this.src = image.src;
        this.pieces = [];
        this.solvedPieces = [];
        this.rows = 0;
        this.columns = 0;
        this.clickedPieceIndex = -1;
        this.displayHelperImage = false;
        this.difficulty = difficulty;
        this.snapTolerance = 100;
        this.drawingEventHandlerId = null;
        
    }

    isOver() {
        return this.pieces.length === 0;
    }

    toggleDisplayHelperImageWithSolvedPuzzle(event) {
        if (event.code === 'Space') {
            this.displayHelperImage = !this.displayHelperImage;
        }
    }

    makePiecesVisible(pieces) {
        for (let piece of pieces) {
            piece.makeVisible();
        }
    }

    releasePiece() {
        if (this.clickedPieceIndex !== -1) {
            let clickedPiece = this.pieces[this.clickedPieceIndex];
            this.pieces.splice(this.clickedPieceIndex, 1);
            this.pieces.push(clickedPiece);

            this.makePiecesVisible(this.pieces);

            clickedPiece.offsetToClickLocation = new AxisCoordinates(0, 0);

            this.checkSolved();
            this.clickedPieceIndex = -1;
        }
    }

    satisfiesSnapTolerance(x1, x2) {
        return Math.abs(x1 - x2) < this.snapTolerance;
    }

    canBeSnapped(piece) {
        let currentLocation = piece.currentLocation;
        let finalLocation = piece.finalLocation;

        let canBeSnappedByX = this.satisfiesSnapTolerance(currentLocation.x, finalLocation.x);
        let canBeSnappedByY = this.satisfiesSnapTolerance(currentLocation.y, finalLocation.y);

        return canBeSnappedByX && canBeSnappedByY;
    }

    checkSolved() {
        let clickedPiece = this.pieces[this.clickedPieceIndex];

        if (this.canBeSnapped(clickedPiece)) {
            clickedPiece.moveToFinalLocation();
            clickedPiece.markAsSolved();
            this.moveToSolvedPieces(this.clickedPieceIndex);

            this.progress += this.getProgressIncrement();
            setGameProgressBar(this.progress);
        }
    }

    moveToSolvedPieces(index) {
        let piece = this.pieces[index];
        this.pieces.splice(index, 1);
        this.solvedPieces.push(piece);
    }

    drawHelperImageWithSolvedPuzzle() {
        this.canvas.solvedPieceDrawer();
    }

    hidePuzzlePieces() {
        for (let piece of this.pieces) {
            piece.makeInvisible();
        }
    }

    drawPuzzlePieces() {
        this.canvas.clear();

        for (let piece of this.solvedPieces) {
            this.canvas.drawPuzzlePiece(piece, this.rows, this.columns);
        }

        for (let piece of this.pieces) {
            this.canvas.drawPuzzlePiece(piece, this.rows, this.columns);
        }

        if (this.displayHelperImage) {
            this.drawHelperImageWithSolvedPuzzle();
        }

        if (this.isOver()) {
            this.clearDrawingHandler();
           
        }
    }

    initializeGame() {
        this.initializePuzzle();
        this.setupEventHandlers();
    }


    clearDrawingHandler() {
        window.clearInterval(this.drawingEventHandlerId);
    }

    setupDrawingHandler() {
        let self = this;
        this.drawingEventHandlerId = setInterval(function () { self.drawPuzzlePieces(); }, 20);
    }

    initializePuzzle() {
        this.columns = this.difficulty;
        this.rows = this.difficulty;

        this.createPieces();
    }

    determineClickedPiece(click) {
        for (let i = this.pieces.length - 1; i >= 0; --i) {
            let piece = this.pieces[i];

            if (piece.isClicked(click)) {
                this.clickedPieceIndex = i;
                this.hidePuzzlePieces();
                piece.makeVisible();
                piece.offsetToClickLocation = new AxisCoordinates(click.x - piece.currentLocation.x, click.y - piece.currentLocation.y);
                return;
            }
        }
    }

    setupEventHandlers() {
        let onDown = ((document.ontouchstart !== null) ? 'mousedown' : 'touchstart');
        this.canvas.canvas.addEventListener(onDown, onDownEventHandler, false);

        let onUp = ((document.ontouchend !== null) ? 'mouseup' : 'touchend');
        this.canvas.canvas.addEventListener(onUp, onUpEventHandler, false);

        let onMove = ((document.ontouchmove !== null) ? 'mousemove' : 'touchmove');
        this.canvas.canvas.addEventListener(onMove, onMoveEventHandler, false);

        let onReset = ((document.ontouchstart !== null) ? 'mousedown' : 'touchstart');
        document.getElementById('reset').addEventListener(onReset, onResetEventHandler, false);

        let self = this;
        document.onkeypress = function (event) { self.toggleDisplayHelperImageWithSolvedPuzzle(event); };

        document.getElementById('resolve_option').addEventListener('click', onResolvePuzzleEventHandler, false);

        document.getElementById('random_piece').addEventListener('click', onResolvePieceEventHandler, false);
        

        this.clearDrawingHandler();
        this.setupDrawingHandler();
    }

    movePiece(click) {
        let clickPosition = this.canvas.clickOnCanvasCoordinates(click);
        let piece = this.pieces[this.clickedPieceIndex];
        piece.move(clickPosition);
    }


    calculatePieceAspectRatioFit(){
        let actualWidth = this.image.width / this.columns;
        let actualHeight = this.image.height / this.rows;
        let maxWidth = this.canvas.canvas.width / this.columns;
        let maxHeight = this.canvas.canvas.height / this.rows;

        let redimensionRatio = Math.min(maxWidth / actualWidth, maxHeight / actualHeight);

        return { width: actualWidth * redimensionRatio, height: actualHeight * redimensionRatio };
    }




    createPieces() {
        

       let pieceDimension = this.calculatePieceAspectRatioFit();

        for (let row = 0; row < this.rows; ++row) {
            for (let column = 0; column < this.columns; ++column) {


                let randomX = computeRandom(0, this.canvas.canvas.width - pieceDimension.width)
                let randomY = computeRandom(0, this.canvas.canvas.height - pieceDimension.height)
               
                let randomLocation = new AxisCoordinates(randomX, randomY);
                let finalLocation = new AxisCoordinates(pieceDimension.width * column, pieceDimension.height * row);

                let piece = new Piece(randomLocation, finalLocation, pieceDimension.width, pieceDimension.height, row, column);
                this.pieces.push(piece);
            }
        }

    }

   
 

}