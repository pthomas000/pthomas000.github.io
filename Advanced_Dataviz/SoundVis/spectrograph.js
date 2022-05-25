
function preload(){
  song = loadSound('collab.mp3');
  // song.rate(0.5)
  playing = false;
  song.onended(() => {playing=false; document.getElementById("audioToggleButton").innerText = "PLAY"; a = 0})
  fr = 30;
  frame = 1;
}

let fft;


function setup() {
  createCanvas(550, 550);
  angleMode(DEGREES);
  fft = new p5.FFT(0, 256);
  a = 360 / (song.duration() * fr);
  b = a;
  frameRate(fr);
  background(0);
}

function draw() {
  let spectrum = fft.analyze();
  push();
    translate(width/2, height/2);
    rotate(a);
    if(playing){
      for (let i = 0; i< spectrum.length; i++){
         {
          stroke(spectrum[i]);
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
    document.getElementById("audioToggleButton").innerText = "PAUSE"
  } else {
    song.pause();
    document.getElementById("audioToggleButton").innerText = "PLAY"
  }
  playing = !playing;
}