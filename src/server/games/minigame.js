///REMEMBER NOT TO FORCE PLAYERS TO JOIN THEM
const Listener = require("../../listeners.js");

class Minigame {

    //These will be overwritten by the extending class
    static start() {

    }
    static tick() {
        
    }
    static mouseMove(player,x,y) {

    }
    static buttonChanged(player,pressed) {
        
    }
    static colorChanged(player,color) {

    }
    static nickChanged(player,nick) {

    }
    static chatMessage(player,message) {
        
    }
}

module.exports = Minigame;