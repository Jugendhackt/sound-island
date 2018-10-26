var angle = 90;
var v_pos;
var v_dir;

var started = false
var posX = 0

var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioCtx = new AudioContext();

var panner = audioCtx.createPanner();
var listener = audioCtx.listener;

function start(elem) {
  elem.style.opacity = '0';
  started = true
}

<<<<<<< HEAD
function setup() {

  v_pos = createVector(0, 0);
  angleMode(DEGREES);
  rectMode(CENTER);

  createCanvas(windowWidth, windowHeight);

  panner1 = new p5.Panner3D();
  song.disconnect();
  song.loop();
  song.connect(panner1);


}

function preload() {

  song = loadSound('assets/sound/cc.wav');

}

function draw() {
    if (started) {
      if (!song.isPlaying())
        //panner1.positionX(-2);
        song.play();
    }

  translate(v_pos.x, v_pos.y);
  const v_pos_old = v_pos;
  background(255, 0, 0);
  rotate(angle);
  obj = rect(0, 0, 200, 100);
  v_dir = createVector(cos(angle), sin(angle));

  if (keyIsDown(LEFT_ARROW)) {
    angle -= 3
  }
  if (keyIsDown(RIGHT_ARROW)) {
    angle += 3
  }
  if (keyIsDown(DOWN_ARROW)) {
    v_pos.add(v_dir.mult(2))
  }
  if (keyIsDown(UP_ARROW)) {
    v_pos.sub(v_dir.mult(2))
  }


  translate(-v_pos_old.x, -v_pos_old.y);
  rotate(-angle);


  obj2 = rect(0, 0, 100, 100);
  panner1.positionX(-v_pos.x + windowWidth/2);
  panner1.positionY(-v_pos.y + windowHeight/2);
}

// const rect = (x, y, w, h, angle) => {
//   translate()
//}
=======

>>>>>>> 3a10f9f9fe7430cdb2b81628e304f8a6c9e1985f
