
class GameNode{
	constructor(x,y){
		this.x = x;
		this.y = y;
	}
}

class GameObject{
    constructor(x,y,sound){
        this.node = new Node(x,y);
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
        this.node = new GameNode(posX,posY);
        this.mRepeat = repeat;
        this.mFinished = false;
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

class Player{
    constructor(x,y,heading){
        this.node = new GameNode(x,y);
        this.playerSpeed = 5;
        this.heading = 270;
    }

    pulse(tryVecs,walls,width,height){
        for(i = 0; i < 180; i++){
            vecX = 1 * Math.cos(i);
            vecY = 1 * Math.sin(i);
            vec = createVector(vecY,vecY);
            line = new Line(vec,createVector(this.mX,this.mY));
            mag = vec.mag();

            for(j = 0; j < tryVecs.length; j++){

            }
        }
    }
}

class Line{
    constructor(vecD, vecM){
        this.vecD = vecD;
        this.vecM = vecM;
    }
}

var v_pos = new p5.Vector(0, 0);
var v_panner = new p5.Vector(50, 0);
var v_dir;
var x = 0;
var y = -200;
var angle = 90;

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
