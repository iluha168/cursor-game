const Minigame = require("./minigame.js");

class Basic extends Minigame {
    
    static start() {
        
    }

    static tick() {

    }
    static mouseMove(player,x,y) {

    }
    static buttonChanged(player,pressed) {
        console.log(`player ${player.id} ${pressed ? " pressed down" : " let go"}`)
    }
    static colorChanged(player,color) {
        console.log(`player ${player.id} changed their color to ${color}`)
    }
    static nickChanged(player,nick) {
        console.log(`player ${player.id} set their nick to ${nick}`);
    }
}

module.exports = Basic;