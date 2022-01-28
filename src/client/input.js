const Listener = require("../listeners.js");

class Input {
    static event = new Listener();
    static leftMousePressed = false;
    static rightMousePressed = false;
    static middleMousePressed = false;
    static mouseX = 0;
    static mouseY = 0;
    static keysPressed = [];
	static canvas = document.querySelector("canvas")

    static listen(element) {
        document.addEventListener("mousedown", (e) => {

            if(e.button == 0) this.leftMousePressed = true;
            if(e.button == 1) this.rightMousePressed = true;
            if(e.button == 2) this.middleMousePressed = true;
            
            this.changed = true;
            this.event.dispatchEvent("mousedown",e.button);
            this.event.dispatchEvent("inputchanged");
        })

        document.addEventListener("mouseup", (e) => {

            if(e.button == 0) this.leftMousePressed = false;
            if(e.button == 1) this.rightMousePressed = false;
            if(e.button == 2) this.middleMousePressed = false;
            
            this.changed = true;
            this.event.dispatchEvent("mouseup",e.button);
            this.event.dispatchEvent("inputchanged");
        })

        element.addEventListener("mousemove", (e) => {
            this.mouseX = e.offsetX;
            this.mouseY = e.offsetY;

            this.changed = true;
            this.event.dispatchEvent("mousemove",this.mouseX,this.mouseY);
            this.event.dispatchEvent("inputchanged");
        })

        element.addEventListener("touchmove", (e) => {
            let cvsOffset = this.canvas.getBoundingClientRect();
            this.mouseX = e.touches[0].clientX - cvsOffset.x;
            this.mouseY = e.touches[0].clientY - cvsOffset.y;

            this.changed = true;
            this.event.dispatchEvent("touchmove",this.mouseX,this.mouseY);
            this.event.dispatchEvent("mousemove",this.mouseX,this.mouseY);
            this.event.dispatchEvent("inputchanged");
        })

        document.addEventListener("keydown", (e) => {

            let key = e.key.toLowerCase();
            if(!this.keysPressed.includes(key)) this.keysPressed.push(key);
            
            this.changed = true;
            this.event.dispatchEvent("keydown".key);
            this.event.dispatchEvent("inputchanged");
        })

        document.addEventListener("keyup", (e) => {

            let key = e.key.toLowerCase();
            if(this.keysPressed.includes(key)) this.keysPressed.splice(this.keysPressed.indexOf(key),1);
            
            this.changed = true;
            this.event.dispatchEvent("keyup",key);
            this.event.dispatchEvent("inputchanged");
        })
    }
}

module.exports = Input;