const Listener = require("../../listeners.js");

class MinigameLoader {
    static minigames = new Map();

    static loadGame(name) {
        const game = require("./"+name+".js");
        game.setup();
        
        this.addEventListener("*", (type, player, ...args) => {
            game[type](player, ...args);
        })

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