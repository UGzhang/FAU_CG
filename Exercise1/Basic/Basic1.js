"use strict"

function drawPixelwiseCircle(canvas) {
    let context = canvas.getContext("2d");
    let img = context.createImageData(200, 200);

    //TODO 1.1a)      Copy the code from Example.js
    //                and modify it to create a 
    //                circle.
    var radius = 50;
    for (let i = 0; i < 4 * 200 * 200; i += 4) {
        var row = i / 4 / 200;
        var col = i / 4 % 200;
        var dis = Math.sqrt(Math.pow(row - 100, 2) + Math.pow(col - 100,2))
        if (dis < radius) {
	        img.data[i] = 0;
		img.data[i + 1] = 255;
		img.data[i + 2] = 0;
		img.data[i + 3] = 255; //transparence
        }
    }
    context.putImageData(img, 0, 0);
}

function drawContourCircle(canvas) {
    let context = canvas.getContext("2d");
    let img = context.createImageData(200, 200);

    //TODO 1.1b)      Copy your code from above
    //                and extend it to receive a
    //                contour around the circle.
    var radius = 50, contour = 10 ;
    for (let i = 0; i < 4 * 200 * 200; i += 4) {
        var row = i / 4 / 200;
        var col = i / 4 % 200;
        var dis = Math.sqrt(Math.pow(row - 100, 2) + Math.pow(col - 100,2))

        if (dis < radius) {
            img.data[i] = 0;
		    img.data[i + 1] = 255;
            img.data[i + 2] = 0;
            img.data[i + 3] = 255;
        } else if (dis < radius + contour) {
            img.data[i] = 0;
		    img.data[i + 1] = 127;
            img.data[i + 2] = 0;
            img.data[i + 3] = 255;

        }
    }
    context.putImageData(img, 0, 0);
}

function drawSmoothCircle(canvas) {
    let context = canvas.getContext("2d");
    let img = context.createImageData(200, 200);

    //TODO 1.1c)      Copy your code from above
    //                and extend it to get rid
    //                of the aliasing effects at
    //                the border.
    var radius = 50, contour = 10, padding = 1;
    for (let i = 0; i < 4 * 200 * 200; i += 4) {
        var row = i / 4 / 200;
        var col = i / 4 % 200;
        var dis = Math.sqrt(Math.pow(row - 100, 2) + Math.pow(col - 100,2))
        if (dis < radius) {
            img.data[i] = 0;
		    img.data[i + 1] = 255;
            img.data[i + 2] = 0;
		    img.data[i + 3] = 255;
        } else if (dis < radius + padding) {
            var mix = 255 - ((dis - radius) * (255 - 127));
            img.data[i ] = 0;
		    img.data[i + 1] = mix;
            img.data[i + 2] = 0;
		    img.data[i + 3] = 255;
        } else if (dis < radius + contour) {
            img.data[i ] = 0;
		    img.data[i + 1] = 127;
            img.data[i + 2] = 0;
		    img.data[i + 3] = 255;
        } else if (dis < radius + contour + padding) {
            var mix = (1 - (dis - (radius + contour))) * 255;
            img.data[i ] = 0;
		    img.data[i + 1] = 127;
            img.data[i + 2] = 0;
		    img.data[i + 3] = mix;
        }
    }
    context.putImageData(img, 0, 0);
}
