///REMEMBER NOT TO FORCE PLAYERS TO JOIN THEM
const Listener = require("../../listeners.js");

class Minigame {

    //These will be overwritten by the extending class
    static start(){
		console.warn("start() was not overwritten in class", this)
	}
    static tick(){
		console.warn("tick() was not overwritten in class", this)
	}
	
    static mouseMove(player,x,y) {
		console.warn("mouseMove() was not overwritten in class", this)
    }
    static buttonChanged(player,pressed) {
		console.warn("buttonChanged() was not overwritten in class", this)
    }
    static colorChanged(player,color) {
		console.warn("colorChanged() was not overwritten in class", this)
    }
    static nickChanged(player,nick) {
		console.warn("nickChanged was not overwritten in class", this)
    }
    static chatMessage(player,message) {
		console.warn("chatMessage() was not overwritten in class", this)
    }
}

module.exports = Minigame;