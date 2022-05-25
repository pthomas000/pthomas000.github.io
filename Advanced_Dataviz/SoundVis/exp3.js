let particles = [];
const num = 100;


var song;
var fft;
var button;
var width = windowWidth*.58;
var height = windowHeight;

function toggleSong() {
  if (song.isPlaying()) {
    song.pause();
  } else {
    song.play();
  }
}

function preload() {
  song = loadSound('AhOh.mp3');
}

var noiseScale = 0.01;

function setup() {
    createCanvas(windowWidth*.583,windowHeight);
    for(let i = 0; i < num; i ++) {
        particles.push(createVector(random(width), random(height)));
    }

    button = createButton('toggle');
    button.mousePressed(toggleSong);
    song.play();
    fft = new p5.FFT(0.9, 1024);

}

function draw() {
    background(0, 7);
    var spectrum = fft.analyze();
    var bass = fft.getEnergy("bass", [song]);
    // console.log(bass);

    var lowMid = fft.getEnergy("lowMid", [song]);
    // console.log(lowMid);

    var mid = fft.getEnergy("mid", [song]);
    // console.log(mid);

    var highMid = fft.getEnergy("highMid", [song]);
    // console.log(highMid);

    var treble = fft.getEnergy("treble", [song]);
    // console.log(treble);


    // console.log(spectrum);
    for(let i = 0; i < num; i ++) {
        let p = particles[i];
        let scale = 2;
        ellipse(width/2,height/2 , bass*scale, bass*scale);
        stroke(bass[i], bass[i], 255, 90)
        fill(0,0);

        ellipse((100+ windowWidth/4) - (windowWidth/2) + width /2, height/2 , lowMid*scale, lowMid*scale);
        stroke(lowMid, lowMid, 255, 90)
        fill(0,0)

        ellipse(2*(windowWidth/4)- (windowWidth/2) + width /2,  height/2, mid*scale, mid*scale);
        stroke(mid, mid, 255, 90)
        fill(0,0)

        ellipse(-100+3 *(windowWidth/4)- (windowWidth/2)+ width /2, height/2, highMid*scale, highMid*scale);
        stroke(highMid, highMid, 255, 90)
        fill(0,0)

        ellipse(4 *(windowWidth/4)- (windowWidth/2)+ width /2,height/2, treble*scale, treble*scale);
        stroke(treble * 100, treble * 100, 255, 90)
        fill(0,0)


        // stroke(spectrum[i], spectrum[i], spectrum[i])
        let n = noise(p.x * noiseScale, p.y * noiseScale);
        let a =  TAU * n;
        p.x += cos(a);
        p.y += sin(a);
        if(!onScreen(p)) {
            p.x = random(0,10);
            p.y = random(0,10);
        }
    }
}

// function mouseReleased() {
//     noiseSeed(millis());
// }

function onScreen(v) {
    return v.x >= 0 && v.x <= width && v.y >= 0 && v.y <= height;
}


// var points = []
// var mult = 0.001

// function setup() {
//     createCanvas(windowWidth, windowHeight)
//     background(30)
//     angleMode(DEGREES)
//     noiseDetail(1)

//     var density = 20
//     var space = width / density

//     for (var x = 0; x < width; x += space) {
//         for (var y = 0; y < height; y += space) {
//             var p = createVector(x + random(-10,10), y + random(-10,10))
//             points.push(p)
//         }
//     }
// }

// function draw() {
//     noStroke()
//     fill(255)

//     for (var i = 0; i < points.length; i++) {
//         var angle = map(noise(points[i].x * mult, points[i].y * mult), 0, 1, 0, 720)

//         points[i].add(createVector(cos(angle), sine(angle)))

//         ellipse(points[i].x, points[i].y, 1)
//     }
// }