class Listener {
    constructor() {
        this.listeners = {};
    }

    addEventListener(id, callback) {
        //listeners[id] is an array of callbacks
		this.listeners[id] ??= [];
        this.listeners[id].push(callback);
        return callback;
    }
    removeEventListener(id, callback) {
		if (!this.listeners[id]) return false;

        //Return if event was successfully removed
        let found = false;

        //Find specified callback in listeners with id and remove it
		while(true){
			let i = this.listeners[id].indexOf(callback);
			if (i === -1) break;
			this.listeners[id].splice(i,1);
			found = true;
		}

        return found;
    }
    dispatchEvent(id, ...args) {
        //Find callbacks from listener id and call them with args
        this.listeners[id]?.forEach(callback => {
            callback(...args);
        })
    }
    waitForEvent(id) {
        return new Promise((res,rej) => {
            const listener = this.addEventListener(id, (...args)=>{
                removeEventListener(id, listener);
                res(...args);
            });
        });
    }
}

module.exports = Listener;