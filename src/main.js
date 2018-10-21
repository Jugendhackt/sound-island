class GameObject {
  constructor(x, y) {
    this.mX = x;
    this.mY = y;
    this.mSound = sound;
  }
}

class SoundManager {
  constructor() {
    this.mSounds = [];
  }

  playSound(sound) {
    this.mSounds.push(sound);
  }

  manageSounds() {
    this.mSounds.forEach(sound => {
      if (!sound.mFinished)
        sound.play();
      else
        this.removeSound(sound.special_snowflake);
    })
  }

  cancelAllSounds() {
    this.mSounds.forEach(x => this.removeSound(x.special_snowflake))
  }

  removeSound(special_snowflake) {
    this.mSounds.filter(x => x.special_snowflake == special_snowflake)[0].mSound.pause();
    this.mSounds = this.mSounds.filter(x => x.special_snowflake != special_snowflake);
  }
}

class Sound {
  constructor(soundFile, posX, posY, panner, repeat) {
    this.special_snowflake = Math.random().toString(36);
    this.mSound = soundFile;
    this.mPanner = panner;
    this.x = posX;
    this.y = posY;
    this.mRepeat = repeat;
    this.mFinished = false;
    this.mSound.disconnect();
    this.mSound.connect(this.mPanner);


    this.removeWrapper = function() {
      var e = function(sound, special_snowflake) {
        sound.mFinished = true;
        soundManager.removeSound(sound.special_snowflake);
      }
      e(this, this.special_snowflake);
    }

  }



  play() {
    if (!this.mSound.isPlaying()) {
      this.mSound.play();
      if (!this.mRepeat)
        setTimeout(() => this.removeWrapper(), this.mSound.buffer.duration * 1000);
    }
  }
}

var v_pos = new p5.Vector(0, 0);
var v_panner = new p5.Vector(50, 0);
var v_dir;
var x = 0;
var y = -200;
var angle = 90;
var soundManager = new SoundManager();

function setup() {


  panner1 = new p5.Panner3D();
  angleMode(DEGREES);

  createCanvas(windowWidth, windowHeight);

}

function preload() {

  sound = loadSound('/assets/sound/steps-gravel.mp3');
  panner1 = new p5.Panner3D();
  soundObject = new Sound(sound, 0, 0, panner1, false);
  soundManager.playSound(soundObject);
  angleMode(DEGREES);
  sound.disconnect()
  sound.connect(panner1)
}

function draw() {


  soundManager.manageSounds();
  translate(windowWidth / 2, windowHeight / 2);

  rectMode(CENTER);

  background(51);

  push()
  rotate(-angle + 90);
  translate(-v_pos.x, -v_pos.y);

  v_dir = createVector(cos(angle), sin(angle));

  player = rect(v_pos.x, v_pos.y, 10, 10);
  obj1 = ellipse(50, 0, 10, 10);

  if (keyIsDown(LEFT_ARROW)) {
    angle -= 1
    // sound.disconnect()
    // sound.play()
    // sound.connect(panner1)
  }
  if (keyIsDown(RIGHT_ARROW)) {
    angle += 1
    // sound.disconnect()
    // sound.play()
    // sound.connect(panner1)
  }
  if (keyIsDown(DOWN_ARROW)) {
    v_pos.add(v_dir.mult(2))
    // sound.disconnect()
    // sound.play()
    // sound.connect(panner1)
  }
  if (keyIsDown(UP_ARROW)) {
    v_pos.sub(v_dir.mult(2))
    // sound.disconnect()
    // sound.play()
    // sound.connect(panner1)
  }

  v_panner = new p5.Vector(50, 0);

  v_panner.sub(v_pos);
  v_panner.rotate((-angle + 90) / 180 * PI);

  panner1.positionX(v_panner.x * 20)
  panner1.positionY(v_panner.y * 20)

  //  console.log(v_panner.x, v_panner.y)


}
