class Sound{
	constructor(soundFile,posX,posY,repeat){
		this.mSound = soundFile;
		this.mPanner = p5.Panner3D();
		this.mX = posX;
		this.mY = posY;
		this.mRepeat = repeat;
		this.mFinished = false;
	}

	function play(){
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

	function finish(){
		this.mFinished = true
	}
}
