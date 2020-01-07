class Canvas {
    constructor(image) {
        this.image = image;

        this.canvas = document.getElementById('canvas');
        this.canvas.style.backgroundColor = 'white';
        this.context = this.canvas.getContext('2d');

        this.maxWidth = 1350;
        this.maxHeight = 680;

        this.calculateCanvasRatioFit();
    }


    drawTopArc(piece) {
        let coordinates = piece.topEdgeCoordinates();
        let arcRadius = radius(piece);

     
        if (isOdd(piece.column)) {
            if (isOdd(piece.row)) {
                this.context.arc(coordinates.x, coordinates.y, arcRadius, Math.PI, 0, true);
            }
            else {
                this.context.arc(coordinates.x, coordinates.y, arcRadius, Math.PI, 0, false);
            }
        } else {
            if (isOdd(piece.row)) {
                this.context.arc(coordinates.x, coordinates.y, arcRadius, Math.PI, 0, false);
            } else {
                this.context.arc(coordinates.x, coordinates.y, arcRadius, Math.PI, 0, true);
            }
        }

    }

    drawRightArc(piece) {
        let coordinates = piece.rightEdgeCoordinates();
        let arcRadius = radius(piece);

    
        if (isOdd(piece.column)) {
            if (isOdd(piece.row)) {
                this.context.arc(coordinates.x, coordinates.y, arcRadius, Math.PI / 180 * 270, Math.PI / 180 * 90, false);
            }
            else {
                this.context.arc(coordinates.x, coordinates.y, arcRadius, Math.PI / 180 * 270, Math.PI / 180 * 90, true);
            }
        }
        else {
            if (isOdd(piece.row)) {
                this.context.arc(coordinates.x, coordinates.y, arcRadius, Math.PI / 180 * 270, Math.PI / 180 * 90, true);
            }
            else {
                this.context.arc(coordinates.x, coordinates.y, arcRadius, Math.PI / 180 * 270, Math.PI / 180 * 90, false);
            }
        }
    }

    drawBottomArc(piece){
        let coordinates = piece.bottomEdgeCoordinates();
        let arcRadius = radius(piece);

    
        if(isOdd(piece.column)){
            if(isOdd(piece.row)){
                this.context.arc(coordinates.x, coordinates.y, arcRadius, 0 , Math.PI, false);
            } else {
                this.context.arc(coordinates.x, coordinates.y, arcRadius, 0 , Math.PI, false);
            }
        } else {
            if(isOdd(piece.row)){
                this.context.arc(coordinates.x, coordinates.y, arcRadius, 0 , Math.PI, false);
            } else {
                this.context.arc(coordinates.x, coordinates.y, arcRadius, 0 , Math.PI, true);
            }
        }
    }

    drawLeftArc(piece){
        let coordinates = piece.leftEdgeCoordinates();
        let arcRadius = radius(piece);

        if(isOdd(piece.column)){
            if(isOdd(piece.row)){
                this.context.arc(coordinates.x, coordinates.y, arcRadius, Math.PI / 180 * 90, Math.PI / 180 * 270 , false);
            } else {
                this.context.arc(coordinates.x, coordinates.y, arcRadius, Math.PI / 180 * 90, Math.PI / 180 * 270 , true);
            }
        } else {
            if(isOdd(piece.row)){
                this.context.arc(coordinates.x, coordinates.y, arcRadius, Math.PI / 180 * 90, Math.PI / 180 * 270 , true);
            } else {
                this.context.arc(coordinates.x, coordinates.y, arcRadius, Math.PI / 180 * 90, Math.PI / 180 * 270 , false);
            }
        }
    }




    drawPuzzlePieceBoundary(piece, rows, columns) {
        this.context.beginPath();

        this.context.moveTo(piece.currentLocation.x, piece.currentLocation.y);

        if (piece.row > 0) {
            this.drawTopArc(piece);
        }

        this.context.lineTo(piece.currentLocation.x + piece.width, piece.currentLocation.y);

        if (piece.column < columns - 1) {
            this.drawRightArc(piece);
        }

        this.context.lineTo(piece.currentLocation.x + piece.width, piece.currentLocation.y + piece.height);

        if (piece.row < rows - 1) {
            this.drawBottomArc(piece);
        }

        this.context.lineTo(piece.currentLocation.x, piece.currentLocation.y + piece.height);

        if (piece.column > 0) {
            this.drawLeftArc(piece);
        }

        this.context.lineTo(piece.currentLocation.x, piece.currentLocation.y);
        this.context.closePath();
    }

    drawPuzzlePiece(piece, rows, columns) {
        this.context.save();

        if (!piece.isVisible()) {
            this.context.globalAlpha = 0.25;
        }

        this.drawPuzzlePieceBoundary(piece, rows, columns);

        this.context.clip();

        let drawCoordinates = fitImageOnPieceCoordinates(piece)

        this.context.drawImage(this.image, drawCoordinates.x, drawCoordinates.y, this.canvas.width, this.canvas.height);

        this.context.stroke();
        this.context.restore();
    }

    clickOnCanvasCoordinates(event) {
        let canvasCoordinates = this.canvas.getBoundingClientRect();

        let x = event.clientX - canvasCoordinates.left;
        let y = event.clientY - canvasCoordinates.top;

        if (typeof event.changedTouches !== 'undefined'){
            x = event.changedTouches[0].pageX - canvasCoordinates.left;
            y = event.changedTouches[0].pageY - canvasCoordinates.top;
        }
        return new AxisCoordinates(x, y);    
    }
    
    

    // https://stackoverflow.com/questions/3971841/how-to-resize-images-proportionally-keeping-the-aspect-ratio
    calculateCanvasRatioFit() {

        let heightRatio = this.maxHeight / this.image.height;
        let widthRatio = this.maxWidth / this.image.width;

        if (heightRatio < widthRatio) {
            this.canvas.height = this.image.height * heightRatio;
            this.canvas.width = this.image.width * heightRatio;
        }
        else {
            this.canvas.height = this.image.height * widthRatio;
            this.canvas.width = this.image.width * widthRatio;
        }

    }

    solvedPieceDrawer() {
        this.context.drawImage(this.image, 0, 0, this.canvas.width, this.canvas.height);
    }

    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}




