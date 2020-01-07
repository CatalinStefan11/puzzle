

function isOdd(number) {
    return number % 2 === 1;
}

function computeRandom(min, max) {
    return ((Math.random() * (max - min) + min));
}

function computeRadius(piece){
    
    if(piece.height < piece.width){
        return piece.height / 4;
    }
    if(piece.width < piece.height){
        return piece.width / 4;
    }

}





// if (typeof click.changedTouches !== 'undefined') {
//     x = click.changedTouches[0].pageX - canvasBoundary.left;
//     y = click.changedTouches[0].pageY - canvasBoundary.top;
// }


function fitImageOnPieceCoordinates(piece){
    return new AxisCoordinates(0 - piece.finalLocation.x + piece.currentLocation.x,0 - piece.finalLocation.y + piece.currentLocation.y)
}


function radius(piece){

    if(piece.height < piece.width){
        return piece.height / 4;
    }
    else{
        return piece.width / 4;
    }
}

function calculateAspectRatioFit(actualWidth, actualHeight, maxWidth, maxHeight) {
    let ratio = Math.min(maxWidth / actualWidth, maxHeight / actualHeight);
    return { width: actualWidth * ratio, height: actualHeight * ratio };
}


class AxisCoordinates {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
