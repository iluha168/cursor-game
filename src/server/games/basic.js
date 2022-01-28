const Minigame = require("./minigame.js");

class Basic extends Minigame {
    
    static start() {
        
    }

    static tick() {

    }
    static mouseMove(player,x,y) {

    }
    static buttonChanged(player,pressed) {
        //console.log(`\x1b[37mPlayer \x1b[32m${player.id} \x1b[37mis clicking \x1b[33m${pressed}`)
    }
    static colorChanged(player,color) {
        //console.log(`\x1b[37mPlayer \x1b[32m${player.id} \x1b[37mchanged their color to \x1b[33m${color}`)
    }
    static nickChanged(player,nick) {
        //console.log(`\x1b[37mPlayer \x1b[32m${player.id} \x1b[37mset their nick to \x1b[33m${nick}`);
    }
    static chatMessage(player,message) {
        //console.log(`\x1b[32m${player.nick}: \x1b[37m${message}`);
    }
}

module.exports = Basic;