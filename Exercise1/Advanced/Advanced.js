"use strict"
/////////////////////////////////////////////
/////////  Complex Number Helpers  //////////
/////////////////////////////////////////////
function ComplexNumber(re, im) {
    this.re = re;
    this.im = im;
}

function ComplexNumberFromCoords(x, y, canvasID) {
    let canvas = document.getElementById(canvasID);
    this.re = (x / (1.0 * canvas.width) - 0.5);
    this.im = (y / (1.0 * canvas.height) - 0.5);
    if (canvasID == 'julia_canvas') {
        this.re *= 3;
        this.im *= 3;
    } else {
        this.re = this.re * 3 * Math.pow(2, zoom) + center.re;
        this.im = this.im * 2 * Math.pow(2, zoom) + center.im;
    }
}

function mult(x, y) {
    let re = (x.re * y.re - x.im * y.im);
    let im = (x.re * y.im + x.im * y.re);
    return new ComplexNumber(re, im);
}

function add(x, y) {
    let re = (x.re + y.re);
    let im = (x.im + y.im);
    return new ComplexNumber(re, im);
}

function sub(x, y) {
    let re = (x.re - y.re);
    let im = (x.im - y.im);
    return new ComplexNumber(re, im);
}

function abs(x) {
    return Math.sqrt(x.re * x.re + x.im * x.im);
}


/////////////////////////////////
/////////  Magic Math  //////////
/////////////////////////////////
function f_c(z, c) {
    // TODO 1.4a):      Compute the result of function f_c for a given z and
    //                  a given c. Use the helper functions.
    return add(mult(z,z), c);

}

function countIterations(start_z, c, max_iter) {
    // TODO 1.4a):      Count iterations needed for the sequence to diverge.
    //                  z is declared diverged as soon as its absolute value
    //                  exceeds 2. If the sequence does not diverge during
    //                  the first max_iter iterations, return max_iter. Use
    //                  function f_c().
    
    // TODO 1.4b):      Change the return value of this function to avoid
    //                  banding. 

    let z = start_z;
    for (let i = 0; i < max_iter; ++i){
        z = f_c(z,c);
        if (abs(z) > 2) return i + 1 - Math.log(Math.log(abs(z)) / Math.log(2));
        // if (abs(z) > 2 ) return i ;
    }
    return max_iter;

}


/////////////////////////////
/////////  Colors  //////////
/////////////////////////////
function getColorForIter(iter) {

    // find out which radio button is checked, i.e. which color scheme is picked
    let colorscheme;
    let radios = document.getElementsByName('colors');
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            colorscheme = radios[i].value;
            break;
        }
    }

    // return color according to chosen color scheme
    // let color = [128, 128, 128];


    
    if (colorscheme == "black & white") {
        // TODO 1.4a):      Return the correct color for the iteration count
        //                  stored in iter. Pixels corresponding to complex
        //                  numbers for which the sequence diverges should be
        //                  shaded white. Use the global variable max_iter.
        return iter == max_iter ? [0, 0, 0] : [255, 255, 255];


    } else if (colorscheme == "greyscale") {
        // TODO 1.4b):      Choose a greyscale color according to the given
        //                  iteration count in relation to the maximum
        //                  iteration count. The more iterations are needed
        //                  for divergence, the darker the color should be.
        //                  Be aware of integer division!
        let temp = 255 - Math.round((iter / max_iter) * 255);
        return iter == max_iter ? [0, 0, 0] : [temp, temp, temp];


    } else if (colorscheme == "underwater") {
        // TODO 1.4b):      Choose a color between blue and green according
        //                  to the given iteration count in relation to the
        //                  maximum iteration count. The more iterations are
        //                  needed for divergence, the more green and less
        //                  blue the color should be.
        let temp = Math.round((iter / max_iter) * 255);
        return iter == max_iter ? [0, 0, 0] : [0, temp, 255 - temp];

    } else { // rainbow
        // TODO 1.4b):      Choose a rainbow color according to the given
        //                  iteration count in relation to the maximum
        //                  iteration count. Colors should change from cyan
        //                  (for very few needed iterations) over blue, violet, pink,
        //                  red, yellow and green back to cyan (for lots of
        //                  needed iterations). Use the HSV model and convert
        //                  HSV to RGB colors using function hsv2rgb.
        let temp = 359 - (iter / max_iter) * 359;

        let hsv = hsv2rgb([temp, 1.0, 1.0]);
        var t = hsv[0];
        hsv[0] = hsv[2];
        hsv[2] = t;

        return iter == max_iter ? [0, 0, 0] : hsv;

    }

}


function hsv2rgb(hsv) {
    
    let h = hsv[0];
    let s = hsv[1];
    let v = hsv[2];


    // TODO 1.4b):      Replace the following line by code performing the
    //                  HSV to RGB convertion known from the lecture.
    if ( v > 1.0 ) v = 1.0;
    if ( s > 1.0 ) s = 1.0;
    var hp = h/60.0;
    var c = v * s;
    var x = c*(1 - Math.abs((hp % 2) - 1));
    var rgb = [0,0,0];
  
    if ( 0<=hp && hp<1 ) rgb = [c, x, 0];
    if ( 1<=hp && hp<2 ) rgb = [x, c, 0];
    if ( 2<=hp && hp<3 ) rgb = [0, c, x];
    if ( 3<=hp && hp<4 ) rgb = [0, x, c];
    if ( 4<=hp && hp<5 ) rgb = [x, 0, c];
    if ( 5<=hp && hp<6 ) rgb = [c, 0, x];
  
    var m = v - c;
    rgb[0] += m;
    rgb[1] += m;
    rgb[2] += m;
  
    rgb[0] *= 255;
    rgb[1] *= 255;
    rgb[2] *= 255;
    return rgb;

}



////////////////////////////////////
/////////  Canvas Fillers  //////////
/////////////////////////////////////
function mandelbrotSet(image) {
    for (let i = 0; i < 4 * image.width * image.height; i += 4) {
        let pixel = i / 4;
        let x = pixel % image.width;
        let y = image.height - pixel / image.width;
        let c = new ComplexNumberFromCoords(x, y, 'mandelbrot_canvas');

        // TODO 1.4a):      Replace the following line by creation of the
        //                  Mandelbrot set. Use functions countIterations() 
        //                  and getColorForIter().
        
        let startZ = new ComplexNumber(0,0);
        let iter = countIterations(startZ, c, max_iter);
        let rgb = getColorForIter(iter);

        image.data[i] = rgb[0];
        image.data[i + 1] = rgb[1];
        image.data[i + 2] = rgb[2];
        image.data[i + 3] = 255;
    }
}

function juliaSet(image) {
    for (let i = 0; i < 4 * image.width * image.height; i += 4) {
        let pixel = i / 4;
        let x = pixel % image.width;
        let y = image.height - pixel / image.width;

        // TODO 1.4d):      Replace the following line by creation of the
        //                  Julia set for c = juliaC (global variable). Use
        //                  functions ComplexNumberFromCoords(),
        //                  countIterations() and getColorForIter().

        let rgb = [128, 128, 128];

        image.data[i] = rgb[0];
        image.data[i + 1] = rgb[1];
        image.data[i + 2] = rgb[2];
        image.data[i + 3] = 255;
    }
}

///////////////////////////////
/////////  Renderers  //////////
///////////////////////////////
function RenderMandelbrotSet() {
    // get the canvas
    let canvas = document.getElementById("mandelbrot_canvas");
    let ctx = canvas.getContext("2d");

    // create a new image
    let image = ctx.createImageData(canvas.width, canvas.height);

    // render Mandelbrot set
    mandelbrotSet(image);

    // write image back to canvas
    ctx.putImageData(image, 0, 0);
}

function RenderJuliaSet() {
    // get the canvas
    let canvas = document.getElementById("julia_canvas");
    let ctx = canvas.getContext("2d");

    // create a new image
    let image = ctx.createImageData(canvas.width, canvas.height);

    // render Julia set
    juliaSet(image);

    // write image back to canvas
    ctx.putImageData(image, 0, 0);
}


///////////////////////////////
//////////   "main"   /////////
///////////////////////////////

// maximum iteration number for Mandelbrot computation
let max_iter = 30;

// coordinate system center
let center = new ComplexNumber(-0.5, 0);

// zoom stage
let zoom = 0;

// flag to show if mouse is pressed
let dragging = false;

// helper variables for Julia set line
let firstLinePointSet = false;
let firstLinePoint;
let secondLinePoint;
let loopVariable = 0;
let looper = null;

// helper variable for moving around
let lastPoint;

// c for Julia set creation
let juliaC = new ComplexNumber(0.4, 0.1);

function setupMandelbrot(canvas) {
    // reset color scheme and maximum iteration number
    let radios = document.getElementsByName('colors');
    radios[0].checked = true;
    let slider = document.getElementById('slider');
    slider.value = 30;

    // render
    RenderMandelbrotSet();
    RenderJuliaSet();

    // add event listeners
    canvas.addEventListener('mousedown', onMouseDown, false);
    canvas.addEventListener('mousemove', onMouseMove, false);
    canvas.addEventListener('mouseup', onMouseUp, false);

    // TODO 1.4c):      Uncomment the following line to enable zooming.

    canvas.addEventListener('DOMMouseScroll', onMouseWheel, false);

}


//////////////////////////////////////
//////////   Event Listeners   ///////
//////////////////////////////////////
function onMouseDown(e) {
    let canvas = document.getElementById("mandelbrot_canvas");
    let rect = canvas.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    y = canvas.height - y;

    if (e.ctrlKey) {
        // choose new c for Julia set creation
        clearInterval(looper);
        juliaC = new ComplexNumberFromCoords(x, y, 'mandelbrot_canvas');
        RenderJuliaSet();
    } else if (e.shiftKey) {
        if (firstLinePointSet == false) {
            firstLinePointSet = true;
            firstLinePoint = [x, y];
            RenderMandelbrotSet();
            clearInterval(looper);
        } else {
            firstLinePointSet = false;
            secondLinePoint = [x, y];
            let c = document.getElementById('mandelbrot_canvas');
            let ctx = c.getContext("2d");
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = "rgb(255,255,255)";
            ctx.moveTo(Math.round(firstLinePoint[0]), canvas.height - Math.round(firstLinePoint[1]));
            ctx.lineTo(Math.round(secondLinePoint[0]), canvas.height - Math.round(secondLinePoint[1]));
            ctx.stroke();
            looper = setInterval(juliaLoop, 20);
            loopVariable = 0;
        }
    } else {
        // TODO 1.4c):      Store the hit point as pixel coordinates and
        //                  start the dragging process. Use the global
        //                  variables dragging (bool) and lastPoint (two
        //                  dimensional vector).
        dragging = true;
        lastPoint = [x,y]


    }
}


function juliaLoop() {
    let alpha = 0.5 * Math.sin(loopVariable * 0.05) + 0.5; // oscillating between 0 and 1
    juliaC = new ComplexNumberFromCoords((1 - alpha) * firstLinePoint[0] + alpha * secondLinePoint[0], (1 - alpha) * firstLinePoint[1] + alpha * secondLinePoint[1], 'mandelbrot_canvas');
    RenderJuliaSet();
    loopVariable++;
}


function onMouseMove(e) {
    if (dragging) {
        let canvas = document.getElementById("mandelbrot_canvas");
        let rect = canvas.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;
        y = canvas.height - y;

        // TODO 1.4c):      Convert both last and current hit point to
        //                  their corresponding complex numbers, compute
        //                  their distance (also as a complex number) and
        //                  shift the plane accordingly. To do so, change
        //                  the global variable center which is used to
        //                  compute the complex number corresponding to a pixel.

        let lastC = new ComplexNumberFromCoords(lastPoint[0], lastPoint[1], 'mandelbrot_canvas');
        let newC = new ComplexNumberFromCoords(x, y, 'mandelbrot_canvas');
        let dis = sub(lastC, newC);
        center = dis;

        // rerender image
        RenderMandelbrotSet();
    }
}

function onMouseUp(e) {
    // TODO 1.4c):      Prevent dragging of the plane once the mouse is
    //                  not pressed anymore.
    dragging = false;

}

function onMouseWheel(e) {
    let delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
    zoom = zoom + delta;

    // render
    RenderMandelbrotSet();

    // do not scroll the page
    e.preventDefault();
}

function onChangeMaxIter(value) {
    max_iter = value;

    // render
    RenderMandelbrotSet();
    RenderJuliaSet();
}

function onChangeColorScheme() {
    // render
    RenderMandelbrotSet();
    RenderJuliaSet();
}
