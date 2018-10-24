class GameObject {
  constructor(x, y, sound) {
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

  manageSounds(playerVec,angle) {
    this.mSounds.forEach(sound => {
	  sound.updateSound(playerVec,angle);
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
  constructor(filePath, posVec, repeat) {
    this.special_snowflake = Math.random().toString(36);
    this.mSound = loadSound(filePath);
    this.x = posVec.x;
	this.y = posVec.y;
	this.mPanner = new p5.Panner3D();
    this.mRepeat = repeat;
    this.mFinished = false;
    this.mSound.disconnect();
    this.mSound.connect(this.mPanner);
	//soundManager.playSound(this);

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

  updateSound(v_pos1,angle){
 	var v_panner = new p5.Vector(this.x,this.y);
	v_panner.sub(v_pos1);
	v_panner.rotate((-angle + 90) * PI / 180);
	this.mPanner.positionX(v_panner.x * 40);
	this.mPanner.positionY(v_panner.y * 40);
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
  soundObject = new Sound('/assets/sound/steps-gravel.mp3', createVector(50,0), true);
  soundObject2 = new Sound('/assets/sound/fire.mp3', createVector(-150,50), true);
  soundManager.playSound(soundObject2);
  angleMode(DEGREES);
}

function draw() {
  noStroke()
  soundManager.manageSounds(v_pos1,angle);
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

  if (keyIsDown(LEFT_ARROW)) {
    soundManager.playSound(soundObject);
    angle -= 1
  } else if (keyIsDown(RIGHT_ARROW)) {
    soundManager.playSound(soundObject);
    angle += 1
  } else if (keyIsDown(DOWN_ARROW)) {
    v_pos1.add(v_dir1.mult(2))
    soundManager.playSound(soundObject);
  } else if (keyIsDown(UP_ARROW)) {
    v_pos1.sub(v_dir1.mult(2))
    soundManager.playSound(soundObject);
  } else {
    soundManager.removeSound(soundObject.special_snowflake);
  }

  /*v_panner1 = new p5.Vector(50, 0);
  v_panner2 = new p5.Vector(-150,50);

  v_panner1.sub(v_pos1);
  v_panner1.rotate((-angle + 90) / 180 * PI);

  v_panner2.sub(v_pos1);
  v_panner2.rotate((-angle + 90) / 180 * PI);

  panner.positionX(v_panner1.x * 40)
  panner.positionY(v_panner1.y * 40)

  panner2.positionX(v_panner2.x * 40)
  panner2.positionY(v_panner2.y * 40)*/

  console.log(v_panner2.x,v_panner2.y)


}
