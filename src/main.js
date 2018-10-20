var started = false
var posX = 0
var started = false

function start(elem) {
  elem.style.opacity = '0';
  started = true
}

function setup() {


  panner1 = new p5.Panner3D();
  song.disconnect();
  song.loop();
  song.connect(panner1);


}

function preload() {

  song = loadSound('/assets/sound/cc.wav');

}

function draw() {
  if started = true {

    posX += 0.01
    if (started) {
      if (!song.isPlaying())
        //panner1.positionX(-2);
        song.play();
    }
    panner1.positionX(2);
    panner1.positionY(-2);
  }
}
