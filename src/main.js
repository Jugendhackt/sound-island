var v_pos = new p5.Vector(0, 0);
var v_panner = new p5.Vector(50, 0);
var v_dir;
var x = 0;
var y = -200;
var angle = 90;

function preload() {

  sound = loadSound('/assets/sounds/slumberjack.mp3+');

}

function setup() {


panner1 = new p5.Panner3D();
  angleMode(DEGREES);

  createCanvas(windowWidth, windowHeight);

  sound.disconnect()
  sound.loop()
  sound.connect(panner1)

}

function draw() {


  translate(windowWidth/2, windowHeight/2);

  rectMode(CENTER);

  background(51);

  push()
  rotate(-angle + 90);
  translate(-v_pos.x,-v_pos.y);

  v_dir = createVector(cos(angle), sin(angle));

  player = rect(v_pos.x,v_pos.y, 10, 10);
  obj1 = ellipse(50, 0, 10, 10);

  if (keyIsDown(LEFT_ARROW)) {
    angle -= 1
  }
  if (keyIsDown(RIGHT_ARROW)) {
    angle += 1
  }
  if (keyIsDown(DOWN_ARROW)) {
    v_pos.add(v_dir.mult(2))
  }
  if (keyIsDown(UP_ARROW)) {
    v_pos.sub(v_dir.mult(2))
  }

  v_panner = new p5.Vector(50, 0);

  v_panner.sub(v_pos);
  v_panner.rotate((-angle + 90)/180*PI);

  panner1.positionX(v_panner.x*30)
  panner1.positionY(v_panner.y*30)

  console.log(v_panner.x, v_panner.y)

}
