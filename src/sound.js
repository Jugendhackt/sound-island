class Sound{
	constructor(soundFile,posX,posY){
		this.mSound = soundFile;
		this.mPanner = p5.Panner3D();
		this.mX = posX;
		this.mY = posY;
	}

	function play(){
		if(!this.mSound.isPlaying())
			this.mSound.play();
	}
}
