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

function preload() {
  song = loadSound('AhOh.mp3');
}

function setup() {
  // createCanvas(windowWidth,windowHeight);
  createCanvas(windowWidth,windowHeight, WEBGL);


  colorMode(RGB);
  angleMode(DEGREES);
  button = createButton('toggle');
  button.mousePressed(toggleSong);
  song.play();
  fft = new p5.FFT(0.9, 128);
}

function draw() {
    background(230,220,210,30);
  var spectrum = fft.analyze();
  //console.log(spectrum);
  //stroke(255);
  noStroke();
  // translate(width / 2, height / 2);
  //beginShape();
  for (var i = 0; i < spectrum.length; i++) {
    var angle = map(i, 0, spectrum.length, 0, 360);
    var amp = spectrum[i] * (windowWidth/200);
    var r = map(amp, 0, 500, 0, 200);
    //fill(i, 255, 255);
    var x = r * cos(angle);
    var y = r * sin(angle);
    var t = 2;
    t--;
    var alpha = 0.5 * t;


    stroke(100, 0,2*i);
    line(0, 0, x, y);
   
    //vertex(x, y);
    //var y = map(amp, 0, 256, height, 0);
    //rect(i * w, y, w - 2, height - y);
  }
  //endShape();
}