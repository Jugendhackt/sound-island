class SoundManager{
	var sounds = []

	var playSound(sound){
		sounds.push(sound)
	}

	function manageSounds(){
		for(i = 0; i < sounds.length; i++){
			sound.play()
		}
	}
}
