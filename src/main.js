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
    try {
      this.mSounds.filter(x => x.special_snowflake == special_snowflake)[0].mSound.pause();
    } catch {
      // this can fail, when the sound is not playing and therefore is not part
      // of the sound array anymore
    }
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

var v_pos1 = new p5.Vector(0, 0);
var v_panner1 = new p5.Vector(50, 0);
var v_dir1;
var v_pos2 = new p5.Vector(0, 0);
var v_panner2 = new p5.Vector(-150, 50);
var v_dir2;
var x = 0;
var y = -200;
var angle = 90;
var soundManager = new SoundManager();

function setup() {
  angleMode(DEGREES);

  createCanvas(windowWidth, windowHeight);
}

function preload() {
  sound = loadSound('/assets/sound/glitter_1.mp3');
  sound.disconnect()
  panner = new p5.Panner3D();
  sound.connect(panner)
  soundObject = new Sound(sound, 0, 0, panner, true);

  sound2 = loadSound('/assets/sound/fire.mp3')
  steps = loadSound('/assets/sound/steps-gravel.mp3')
  panner3 = new p5.Panner3D()
  //sound2.disconnect()
  panner2 = new p5.Panner3D();
  //sound2.connect(panner2);
  soundObject2 = new Sound(sound2, 0, 0, panner2, true)
  soundObject3 = new Sound(steps, 0, 0, panner3, true)

  angleMode(DEGREES);
}

function draw() {
  noStroke()
  soundManager.manageSounds();
  soundManager.playSound(soundObject2);
  translate(windowWidth / 2, windowHeight / 2);
  rectMode(CENTER);

  background(51);

  push()
  rotate(-angle + 90);
  translate(-v_pos1.x, -v_pos1.y);

  v_dir1 = createVector(cos(angle), sin(angle));

  player = rect(v_pos1.x, v_pos1.y, 10, 10);
  obj1 = ellipse(50, 0, 10, 10);
  push()
  let red = color(255, 0, 0)
  fill(red)
  obj2 = ellipse(-150, 50, 10, 10);
  pop()
  sound2.setVolume(0.5);
  steps.setVolume(0.5);
  soundManager.playSound(soundObject);

  if (keyIsDown(LEFT_ARROW)) {

    angle -= 1
    soundManager.playSound(soundObject3);
  } else if (keyIsDown(RIGHT_ARROW)) {

    angle += 1
    soundManager.playSound(soundObject3);
  } else if (keyIsDown(DOWN_ARROW)) {
    v_pos1.add(v_dir1.mult(2))
    soundManager.playSound(soundObject3);
  } else if (keyIsDown(UP_ARROW)) {
    v_pos1.sub(v_dir1.mult(2))
    soundManager.playSound(soundObject3);

  } else {
     soundManager.removeSound(soundObject3.special_snowflake);
  }

  v_panner1 = new p5.Vector(50, 0);
  v_panner2 = new p5.Vector(-150, 50);

  v_panner1.sub(v_pos1);
  v_panner1.rotate((-angle + 90) / 180 * PI);

  v_panner2.sub(v_pos1);
  v_panner2.rotate((-angle + 90) / 180 * PI);

  panner.positionX(v_panner1.x * 40)
  panner.positionY(v_panner1.y * 40)

  panner2.positionX(v_panner2.x * 40)
  panner2.positionY(v_panner2.y * 40)

  panner3.positionX(v_pos1.x)
  panner3.positionX(v_pos1.y)

  console.log(v_panner2.x,v_panner2.y)


}
