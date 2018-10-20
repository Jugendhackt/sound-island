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
  song = loadSound('/assets/sound/cc.wav');
}

function draw() {
    if (started) {
      if (!song.isPlaying())
        //panner1.positionX(-2);
        song.play();
    }

  background(255, 0, 0);

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
