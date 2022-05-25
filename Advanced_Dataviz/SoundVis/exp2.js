let particles = [];
var num = 1000;


var song;
var fft;
var button;

function toggleSong() {
  if (song.isPlaying()) {
    song.pause();
  } else {
    song.play();
  }
}

// function dropSelect(dropdown) {
  
//   song = list[index];

//   var myindex  = dropdown.selectedIndex
//   var SelValue = dropdown.options[myindex].value
//   var baseURL  = `{$dropdown.options[myindex].value`
//   top.location.href = baseURL;
  
//   return true;

// }

function preload() {
  song = loadSound('AhOh.mp3');
  
}

var noiseScale = 0.01;

function setup() {
    createCanvas(windowWidth*.58,windowHeight);
    for(let i = 0; i < num; i ++) {
        particles.push(createVector(random(width), random(height)));
    }
    stroke(0,50);

    button = createButton('toggle');
    button.mousePressed(toggleSong);
    song.play();
    fft = new p5.FFT(0.9, 128);

}

function draw() {
    background(0, 0);
    var spectrum = fft.analyze();
    // console.log(spectrum);
    for(let i = 0; i < num; i ++) {
        let p = particles[i];
        point(p.x, p.y);

        let width = spectrum[i];
        let height = spectrum[i];
        let num = spectrum.length;
        // console.log(width);
        // console.log(spectrum[i]);
        console.log(spectrum.length)

        let n = noise(p.x * noiseScale, p.y * noiseScale);
        let a =  TAU * n;
        p.x += cos(a);
        p.y += sin(a);

        if(!onScreen(p)) {
            p.x = random(-10,10);
            p.y = random(-10,10);
        }
    }

}

function mouseReleased() {
    noiseSeed(millis());
}

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