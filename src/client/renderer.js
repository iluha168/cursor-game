class Renderer {
    static canvas = null;
    static ctx = null;
    static lineSpacing = 5;

    static setup() {
        this.canvas = document.querySelector("canvas");
        this.ctx = this.canvas.getContext("2d");

        window.addEventListener("resize", (e) => {
            this.resizeCanvas();
        });
        this.resizeCanvas();
        
    }

    static resizeCanvas() {
        let size = this.canvas.getBoundingClientRect();
        this.canvas.width = size.width;
        this.canvas.height = size.height;
        
        this.ctx.font = "18px calibri";
    }

    static clear() {
        this.ctx?.clearRect(0,0,this.canvas.width,this.canvas.height);
    }

    static renderPlayer(player, chats = []) {
        if(!this.ctx) return;

        let {p,c} = player;
        let x = player.appearX || player.x;
        let y = player.appearY || player.y;
        x *= this.canvas.width;
        y *= this.canvas.height;

        //Player body
		this.ctx.fillStyle = c;
		this.ctx.beginPath();
		this.ctx.arc(x, y, 5, 0, Math.PI * 2);
		this.ctx.fill();

        //Player name
		this.drawText(player.nick, x + 5, y + this.lineSpacing, {verticalAlign: "top"});

        //Player chat messages
		this.ctx.fillStyle = "#FFF";
		chats = chats.slice(-8)
        this.drawText(chats, x + 5, y);
        
        //Clicked cursor outline
		if(p) {
            this.ctx.strokeStyle = c;
            this.ctx.beginPath();
            this.ctx.arc(x, y, 7, 0, Math.PI * 2);
            this.ctx.stroke();
        }
    }

    static drawText(text,x,y,options = {}) {
        const {verticalAlign} = options;

        if(!this.ctx) return;

        if(text instanceof Array) {
            let line = 0;
            for(let t of text) {
                const metrics = this.ctx.measureText(t);
                let dist = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent + this.lineSpacing;
                this.ctx.fillText(t,x,y + line + dist);

                line += dist;
            }
        } else {
            const metrics = this.ctx.measureText(text);
            let dist = verticalAlign == "top" ? -metrics.actualBoundingBoxAscent - metrics.actualBoundingBoxDescent + this.lineSpacing : metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent + this.lineSpacing;
            this.ctx.fillText(text,x,y + dist);
        }
    }
}

module.exports = Renderer;