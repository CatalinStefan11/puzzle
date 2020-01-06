function isEven(value) {
    return value % 2 === 0;
}

function computeRandom(min, max) {
    return ((Math.random() * (max - min) + min));
}


// https://stackoverflow.com/questions/3971841/how-to-resize-images-proportionally-keeping-the-aspect-ratio
function calculateAspectRatioFit(actualWidth, actualHeight, maxWidth, maxHeight) {
    let ratio = Math.min(maxWidth / actualWidth, maxHeight / actualHeight);
    return { width: actualWidth * ratio, height: actualHeight * ratio };
}

// http://cwestblog.com/2012/11/12/javascript-degree-and-radian-conversion/
// Converts from degrees to radians.
Math.radians = function (degrees) {
    return degrees * Math.PI / 180;
};


class AxisCoordinates {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
