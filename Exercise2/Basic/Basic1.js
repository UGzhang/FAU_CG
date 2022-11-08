"use strict";

///////////////////////////
//// global variables  ////
///////////////////////////

// pixel scale
let pixelScale = 10;

// line
let line = new Line(    new Point( 10 / pixelScale,  10 / pixelScale),
                        new Point(180 / pixelScale, 180 / pixelScale),
                        new Color(0, 0, 0));


function swapPoint(p1, p2){
    let t = new Point();
    t = p1;
    p1 = p2;
    p2 = t;
    return p1, p2;
}


//////////////
//// gui  ////
//////////////

// event listener for gui
function onChangePixelScale(value) {
    // rescale line
    let s = pixelScale / value;
    line.startPoint.x = line.startPoint.x * s;
    line.startPoint.y = line.startPoint.y * s;
    line.endPoint.x = line.endPoint.x * s;
    line.endPoint.y = line.endPoint.y * s;
    // set new scaling factor
    pixelScale = value;
    // rerender scene
    RenderCanvas1();
}

function onMouseDownCanvas1(e) {
    let rect = document.getElementById("canvas1").getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;

    console.log("onMouseDownCanvas1: " + x + " " + y);

    // set new points
    if (e.ctrlKey) {
        line.endPoint.x = x / pixelScale;
        line.endPoint.y = y / pixelScale;
    } else {
        line.startPoint.x = x / pixelScale;
        line.startPoint.y = y / pixelScale;
    }

    // rerender image
    RenderCanvas1();
}


//////////////////////////////
//// bresenham algorithm  ////
//////////////////////////////

function bresenham(image, line) {
    // ensure integer coordinates
    let x0 = Math.floor(line.startPoint.x);
    let y0 = Math.floor(line.startPoint.y);
    let x1 = Math.floor(line.endPoint.x);
    let y1 = Math.floor(line.endPoint.y);

    // TODO 2.1     Write code to draw a line
    //              between the start point and
    //              the end point. To make things
    //              easier, there are some comments
    //              on what to do next: 

    // compute deltas and update directions
    let deltaY = Math.abs(y1-y0);
    let deltaX = Math.abs(x1-x0);

    let stepX = 1, stepY = 1;

    if(x0 > x1){
        stepX = -1;
    }
    if(y0 > y1){
        stepY = -1;
    }

    let nPixels = deltaX;
    let useXStep = true;
    if(deltaX < deltaY){
        nPixels = deltaY;
        useXStep = false;
        [deltaX, deltaY] = swap(deltaX, deltaY); 
    }

    // set initial coordinates
    let point = line.startPoint;
    let d = 2 * deltaY - deltaX;

    // start loop to set nPixels 
    for (let i = 0; i < nPixels; ++i) {

        // set pixel using the helper function setPixelS()
        setPixelS(image, point, new Color(255, 0, 0), pixelScale);

        // update error
        if(d >= 0){
            if(useXStep){
                point.y += stepY;
            }else{
                point.x += stepX;
            }
            d = d - 2*deltaX;
        }

        // update coordinates depending on the error
        if(useXStep){
            point.x += stepX;
        }else{
            point.y += stepY;
        }
        d = d + 2*deltaY;
    }
}


//////////////////////////
//// render function  ////
//////////////////////////

function RenderCanvas1() {
    // get canvas handle
    let context = document.getElementById("canvas1").getContext("2d");
    let canvas = context.createImageData(200, 200);

    // clear canvas
    clearImage(canvas, new Color(255, 255, 255));

    // draw line
    bresenham(canvas, line);

    // draw start and end point with different colors
    setPixelS(canvas, line.startPoint, new Color(255, 0, 0), pixelScale);
    setPixelS(canvas, line.endPoint, new Color(0, 255, 0), pixelScale);

    // show image
    context.putImageData(canvas, 0, 0);
}


function setupBresenham(canvas) {
    // execute rendering
    RenderCanvas1();
    // add event listener
    document.getElementById("canvas1").addEventListener('mousedown', onMouseDownCanvas1, false);
}
