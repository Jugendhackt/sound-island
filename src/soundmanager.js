class SoundManager{
	var mSounds = [];

	var playSound(sound){
		mSounds.push(sound);
	}

	function manageSounds(){
		for(i = 0; i < mSounds.length; i++){
			if(!mSound[i].mFinished)
				sound.play();
			else
				removeSound(mSound[i]);
		}
	}

	function cancelAllSounds(){
		for(i = 0; i < mSounds.length(); i++){
			mSounds[i].stop();
		}
	}

	function removeSound(sound){
		newArr = [];
		for(i = 0; i < mSounds.length(),i++){
			if(newArr[i] != sound)
				newArr.push(mSounds):
		}
		mSounds = newArr;
	}
}
