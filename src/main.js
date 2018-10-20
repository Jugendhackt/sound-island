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

