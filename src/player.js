require('line')

class Player{
	constructor(x,y,heading){
		this.mX = x
		this.mY = y
		this.mHeading = heading
	}

	function pulse(tryVecs){
		for(i = 0; i < 180; i++){
			vecX = 1 * Math.cos(i)
			vecY = 1 * Math.sin(i)
			vec = createVector(vecY,vecY)
			line = new Line(vecX,vecY,this.mX,this.mY)
			for(j = 0; j < tryVecs.length; j++){
				//TODO
			}
		}
	}
}
