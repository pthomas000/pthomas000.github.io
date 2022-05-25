var song;
var fft;
var button;
var button2;
var songList;
var songSelected = "AhOh.mp3";

var audioFiles = [
    "collab.mp3",
    "AhOh.mp3",

];



function toggleSong() {
  if (song.isPlaying()) {
    song.pause();
    document.getElementById("button").innerHTML = "Play";
    audio.pause();

  } else {
    song.play();
    audio.play();
    document.getElementById("button").innerHTML = "Pause"
  }
}


function download(){
  var download = document.getElementById("download");
  var image = document.getElementById("canvas").toDataURL("image/png")
              .replace("image/png", "image/octet-stream");
  download.setAttribute("href", image);

}



function preload() {
  song = loadSound("Indie.mp3");
  song2 = loadSound("collab.mp3");
  songList = ["collab.mp3", "AhOh.mp3"];
}

// $("#inputGroupSelect02").on("change", function(){
//   var selected = $(this).val();

//   songSelect = songList[selected-1];
//   console.log(songSelect);
//   // location.reload(); 
// })

// function favTutorial() {  
//   var mylist = document.getElementById("inputGroupSelect02");  
//   document.getElementById("favourite").value = mylist.options[mylist.selectedIndex].text;  
//   }  

function setup() {

  
  button = createButton('Play');
  document.querySelector("button").id = "button";
  button.mousePressed(toggleSong);
  song.play();

  button2 = createButton('download');
  document.querySelectorAll('button')[1].id = "button2";

  button2.mousePressed(download);

  createCanvas(windowWidth *.58,windowHeight, WEBGL);


  colorMode(RGB);
  angleMode(DEGREES);

  fft = new p5.FFT(0.9, 128); 

 
 
}



function draw() {
  // song = loadSound(songSelected);
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