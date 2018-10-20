class GameObject{	
	constructor(x,y){       
		this.mX = x;
		this.mY = y;
        this.mSound = sound;
    }
}

class SoundManager{
    constructor(){
		this.mSounds = [];
	}

    playSound(sound){
        this.mSounds.push(sound);
    }

    manageSounds(){
        for(i = 0; i < mSounds.length; i++){
            if(!mSound[i].mFinished)
                sound.play();
            else
                removeSound(mSound[i]);
        }
    }

    cancelAllSounds(){
        for(i = 0; i < mSounds.length(); i++){
            mSounds[i].stop();
        }
    }   
  
    removeSound(sound){
        newArr = [];
        for(i = 0; i < mSounds.length();i++){
            if(newArr[i] != sound)
                newArr.push(mSounds)
        }
        mSounds = newArr;
    }
}



class Sound{
    constructor(soundFile,posX,posY,repeat){
        this.mSound = soundFile;
        this.mPanner = p5.Panner3D();
        this.x = posX;
		this.y = posY;
        this.mRepeat = repeat;
        this.mFinished = false;
		this.mSound.disconnect();
		this.mSound.connnect(mPanner);
    }

    play(){
        if(!mRepeat){
            if(!this.mSound.isPlaying()){
                this.mSound.play();
                setTimeout(finish,this.mSound.duration())
            }
        }else{
            if(!this.mSound.isLooping())
                this.mSound.loop();
        }
    }

    finish(){
        this.mFinished = true
    }
}

var v_pos = new p5.Vector(0, 0);
var v_panner = new p5.Vector(50, 0);
var v_dir;
var x = 0;
var y = -200;
var angle = 90;
var soundManager = new SoundManager();

function preload() {

  sound = loadSound('/assets/sound/steps-gravel.mp3');
  panner1 = new p5.Panner3D();
  angleMode(DEGREES);
  sound.disconnect()
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
    sound.disconnect()
    sound.play()
    sound.connect(panner1)
  }
  if (keyIsDown(RIGHT_ARROW)) {
    angle += 1
    sound.disconnect()
    sound.play()
    sound.connect(panner1)
  }
  if (keyIsDown(DOWN_ARROW)) {
    v_pos.add(v_dir.mult(2))
    sound.disconnect()
    sound.play()
    sound.connect(panner1)
  }
  if (keyIsDown(UP_ARROW)) {
    v_pos.sub(v_dir.mult(2))
    sound.disconnect()
    sound.play()
    sound.connect(panner1)
  }

  v_panner = new p5.Vector(50, 0);

  v_panner.sub(v_pos);
  v_panner.rotate((-angle + 90)/180*PI);

  panner1.positionX(v_panner.x*30)
  panner1.positionY(v_panner.y*30)

  console.log(v_panner.x, v_panner.y)

}
