const { randint } = require("../utils.js");

class Player {
	constructor(properties) {
		this.x = 0.5;
		this.y = 0.5;
        this.appearX = 0.5;
        this.appearY = 0.5;
		this.p = false; // pressed (mouse click)

		this.c = "#" + randint(256, 4096).toString(16); // colour
		this.nick = "New User"; //nickname

        this.id = null;

        Object.assign(this,properties);
    }
    
    merge(properties) {
        Object.assign(this,properties);
    }

    tickInterpolation() {
        this.appearX += (this.x - this.appearX) / 10;
        this.appearY += (this.y - this.appearY) / 10;
    }

    selfDestruct() {
        //haha player go boom    
    }
}

module.exports = Player;