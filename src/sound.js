class Sound{
	constructor(soundFile,posX,posY,repeat){
		this.mSound = soundFile;
		this.mPanner = p5.Panner3D();
		this.mX = posX;
		this.mY = posY;
		this.mRepeat = repeat
	}

	function play(){
		if(!mRepeat){
			if(!this.mSound.isPlaying())
				this.mSound.play();
		}else{
			if(!this.mSound.isLooping())
				this.mSOund.loop()
		}
	}
}
