let particles = [];
const num = 100;


var song;
// var fft;
var button;

let fft;
// var width = windowWidth*.58;
// var height = windowHeight;

// function toggleAudio() {
//   console.log("clicked")
//   if (!playing){
//     song.play();
//     document.getElementById("audioToggleButton").innerText = "PAUSE"
//   } else {
//     song.pause();
//     document.getElementById("audioToggleButton").innerText = "PLAY"
//   }
//   playing = !playing;
// }

function preload() {
  song = loadSound('Indie.mp3');
  // song.rate(0.5)
  playing = false;
  song.onended(() => {playing=false; document.getElementById("audioToggleButton").innerText = "PLAY"; a = 0})
  fr = 30;
  frame = 1;
}


var noiseScale = 0.01;

function setup() {
  createCanvas(windowWidth*0.58, windowHeight);
  angleMode(DEGREES);
  // fft = new p5.FFT(0, 256);
  a = 10 * 360 / (song.duration() * fr);
  b = a;
  frameRate(fr);
  background(0);

    button = createButton('toggle');
    document.querySelector("button").id = "audioToggleButton";
    button.mousePressed(toggleAudio);
    // song.play();
    fft = new p5.FFT(0.9, 1024);

}

function draw() {
    // background(0, 7);
    let spectrum = fft.analyze();
    push();
      translate(width/2, height/2);
      rotate(a);
      if(playing){
        for (let i = 0; i< spectrum.length; i++){
           {
            stroke(spectrum[i], 255*Math.random(), 255*Math.random(), spectrum[i]);
            strokeWeight(0.5*i/150)
            line(0, i, 0, i+1)
          }
        }
      }
    pop();
    if (playing) a += b;
    
}


function toggleAudio() {
  console.log("clicked")
  if (!playing){
    song.play();
  } else {
    song.pause();
  }
  playing = !playing;
}

// function mouseReleased() {
//     noiseSeed(millis());
// }

// function onScreen(v) {
//     return v.x >= 0 && v.x <= width && v.y >= 0 && v.y <= height;
// }


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