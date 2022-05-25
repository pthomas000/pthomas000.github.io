let squares = [];

var song;
var fft;
var button;
var t;
let p;
// var width = windowWidth;
// var height = windowHeight;

var num = 1000;


function toggleSong() {
    if(song.isplaying()) {
        song.pause();
    } else {
        song.play();
    }
}

function preload() {
    song = loadSound('collab.mp3');
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    stroke(0,50);

    button = createButton('toggle');
    button.mousePressed(toggleSong);
    song.play();
    fft = new p5.FFT(0.9,1024);

}

function draw() {
    background(0.90);

    var spectrum = fft.analyze();
    for(let i = 0; i <num; i++) {
        // let p = spectrum[i];
        // rect(t,i, 10,10);
        
        // fill(10,10,10, particle[i])
        
        // add saturation (mapped to frequency)

        let num = spectrum.length;

    }

    for(let i = 0; i < num; i ++) {
        squares.push(createVector(p.x, p.y));
        console.log(i);

    }

}


// setup function:
// draw function: fft.analyze -> for every