"use strict"

function drawArcCircle(canvas) {

    let context = canvas.getContext("2d");

    //TODO 1.2)       Use the arc() function to
    //                rasterize the two circles
    //                from Task 1.1.


    // ring 
    context.beginPath();
    context.fillStyle = 'red';
    context.arc(100,100,50,0,2*Math.PI);
    context.fill();

    // filled
    var width = 10;
    context.lineWidth = width;
    context.strokeStyle = 'green';
    context.arc(100,100,50,0,2*Math.PI);
    context.stroke();


    // but i'm not sure how to apply colors
}
