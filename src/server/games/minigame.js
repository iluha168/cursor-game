///REMEMBER NOT TO FORCE PLAYERS TO JOIN THEM
const Listener = require("../listeners.js");

class Minigame {
    static setup() {
        Listener.attach(this);
    }

    //These will be overwritten by the extending class
    static start() {

    }
    static tick() {
        
    }
}

module.exports = Minigame;