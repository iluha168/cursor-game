const Listener = require("../listeners.js")
class CrossTab extends BroadcastChannel{
	event = new Listener;
	constructor(){
		super("tab")
		this.onmessage = this.recieve
		this.alone = true // means there is only 1 tab
		this.send({type: "loaded"})
	}

	send(obj){
		this.postMessage(JSON.stringify(obj))
	}

	recieve(msgEvent){
		let data = JSON.parse(msgEvent.data)
		switch(data.type){
			case "loaded": //another tab loaded (bad)
				this.alone = false
				event.dispatchEvent("newTab")
				console.log("New tab (not cool)")
			break
		}
	}
}
module.exports = CrossTab