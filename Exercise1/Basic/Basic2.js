"use strict"

function drawArcCircle(canvas) {

    let context = canvas.getContext("2d");

    //TODO 1.2)       Use the arc() function to
    //                rasterize the two circles
    //                from Task 1.1.

    // circle without contour
    context.beginPath();
    context.fillStyle = "#00ff00";;
    context.arc(60,60,50,0,2*Math.PI);
    context.fill();
    // context.stroke();

    
    // circle with contour
    context.beginPath();
    var width = 10;
    context.lineWidth = width;
    context.strokeStyle = "#007f00";
    context.arc(140,140,50,0,2*Math.PI);
    context.fillStyle =  "#00ff00";
    context.fill();
    context.stroke();
}
