const { randint } = require("../utils.js");

class Player {
    static interpolationFactor = 6;

	constructor(properties) {
		this.x = 0.5;
		this.y = 0.5;
        this.appearX = 0.5;
        this.appearY = 0.5;
		this.p = false; // pressed (mouse click)

		this.c = "#" + randint(256, 4096).toString(16); // colour
		this.nick = "Loading Name..."; //nickname

        this.id = null;

        Object.assign(this,properties);
    }
    
    merge(properties) {
        Object.assign(this,properties);
    }

    tickInterpolation() {
        let dx = this.x - this.appearX;
        let dy = this.y - this.appearY;

        this.appearX += (dx) / Player.interpolationFactor;
        this.appearY += (dy) / Player.interpolationFactor;
    }

    selfDestruct() {
		console.warn("TODO", this)
        //haha player go boom    
    }
}

module.exports = Player;