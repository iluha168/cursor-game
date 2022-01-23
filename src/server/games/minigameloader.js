const Listener = require("../../listeners.js");

class MinigameLoader {
    static minigames = new Map();

    static loadGame(name) {
        let game;
		try {
	       game = require(`./${name}.js`);
		} catch(e) {
			console.error(e);
            return;
		}
        
        this.addEventListener("*", (type, player, ...args) => {
            game[type]?.(player, ...args); //repl stfu
        });

        game.start();

        this.minigames.set(name,game);
    }
    static tick() {
        this.minigames.forEach(game => {
            game.tick();
        });
    }
}
Listener.attach(MinigameLoader);

module.exports = MinigameLoader;