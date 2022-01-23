(()=>{var t={852:t=>{"use strict";function e(t){if(this._offset=0,t instanceof ArrayBuffer)this._buffer=t,this._view=new DataView(this._buffer);else{if(!ArrayBuffer.isView(t))throw new Error("Invalid argument");this._buffer=t.buffer,this._view=new DataView(this._buffer,t.byteOffset,t.byteLength)}}e.prototype._array=function(t){for(var e=new Array(t),s=0;s<t;s++)e[s]=this._parse();return e},e.prototype._map=function(t){for(var e={},s=0;s<t;s++)e[this._parse()]=this._parse();return e},e.prototype._str=function(t){var e=function(t,e,s){for(var i="",n=0,r=e,a=e+s;r<a;r++){var o=t.getUint8(r);if(0!=(128&o))if(192!=(224&o))if(224!=(240&o)){if(240!=(248&o))throw new Error("Invalid byte "+o.toString(16));(n=(7&o)<<18|(63&t.getUint8(++r))<<12|(63&t.getUint8(++r))<<6|(63&t.getUint8(++r))<<0)>=65536?(n-=65536,i+=String.fromCharCode(55296+(n>>>10),56320+(1023&n))):i+=String.fromCharCode(n)}else i+=String.fromCharCode((15&o)<<12|(63&t.getUint8(++r))<<6|(63&t.getUint8(++r))<<0);else i+=String.fromCharCode((31&o)<<6|63&t.getUint8(++r));else i+=String.fromCharCode(o)}return i}(this._view,this._offset,t);return this._offset+=t,e},e.prototype._bin=function(t){var e=this._buffer.slice(this._offset,this._offset+t);return this._offset+=t,e},e.prototype._parse=function(){var t,e=this._view.getUint8(this._offset++),s=0,i=0,n=0,r=0;if(e<192)return e<128?e:e<144?this._map(15&e):e<160?this._array(15&e):this._str(31&e);if(e>223)return-1*(255-e+1);switch(e){case 192:return null;case 194:return!1;case 195:return!0;case 196:return s=this._view.getUint8(this._offset),this._offset+=1,this._bin(s);case 197:return s=this._view.getUint16(this._offset),this._offset+=2,this._bin(s);case 198:return s=this._view.getUint32(this._offset),this._offset+=4,this._bin(s);case 199:return s=this._view.getUint8(this._offset),i=this._view.getInt8(this._offset+1),this._offset+=2,[i,this._bin(s)];case 200:return s=this._view.getUint16(this._offset),i=this._view.getInt8(this._offset+2),this._offset+=3,[i,this._bin(s)];case 201:return s=this._view.getUint32(this._offset),i=this._view.getInt8(this._offset+4),this._offset+=5,[i,this._bin(s)];case 202:return t=this._view.getFloat32(this._offset),this._offset+=4,t;case 203:return t=this._view.getFloat64(this._offset),this._offset+=8,t;case 204:return t=this._view.getUint8(this._offset),this._offset+=1,t;case 205:return t=this._view.getUint16(this._offset),this._offset+=2,t;case 206:return t=this._view.getUint32(this._offset),this._offset+=4,t;case 207:return n=this._view.getUint32(this._offset)*Math.pow(2,32),r=this._view.getUint32(this._offset+4),this._offset+=8,n+r;case 208:return t=this._view.getInt8(this._offset),this._offset+=1,t;case 209:return t=this._view.getInt16(this._offset),this._offset+=2,t;case 210:return t=this._view.getInt32(this._offset),this._offset+=4,t;case 211:return n=this._view.getInt32(this._offset)*Math.pow(2,32),r=this._view.getUint32(this._offset+4),this._offset+=8,n+r;case 212:return i=this._view.getInt8(this._offset),this._offset+=1,0===i?void(this._offset+=1):[i,this._bin(1)];case 213:return i=this._view.getInt8(this._offset),this._offset+=1,[i,this._bin(2)];case 214:return i=this._view.getInt8(this._offset),this._offset+=1,[i,this._bin(4)];case 215:return i=this._view.getInt8(this._offset),this._offset+=1,0===i?(n=this._view.getInt32(this._offset)*Math.pow(2,32),r=this._view.getUint32(this._offset+4),this._offset+=8,new Date(n+r)):[i,this._bin(8)];case 216:return i=this._view.getInt8(this._offset),this._offset+=1,[i,this._bin(16)];case 217:return s=this._view.getUint8(this._offset),this._offset+=1,this._str(s);case 218:return s=this._view.getUint16(this._offset),this._offset+=2,this._str(s);case 219:return s=this._view.getUint32(this._offset),this._offset+=4,this._str(s);case 220:return s=this._view.getUint16(this._offset),this._offset+=2,this._array(s);case 221:return s=this._view.getUint32(this._offset),this._offset+=4,this._array(s);case 222:return s=this._view.getUint16(this._offset),this._offset+=2,this._map(s);case 223:return s=this._view.getUint32(this._offset),this._offset+=4,this._map(s)}throw new Error("Could not parse")},t.exports=function(t){var s=new e(t),i=s._parse();if(s._offset!==t.byteLength)throw new Error(t.byteLength-s._offset+" trailing bytes");return i}},370:t=>{"use strict";function e(t,e,s){for(var i=0,n=0,r=s.length;n<r;n++)(i=s.charCodeAt(n))<128?t.setUint8(e++,i):i<2048?(t.setUint8(e++,192|i>>6),t.setUint8(e++,128|63&i)):i<55296||i>=57344?(t.setUint8(e++,224|i>>12),t.setUint8(e++,128|i>>6&63),t.setUint8(e++,128|63&i)):(n++,i=65536+((1023&i)<<10|1023&s.charCodeAt(n)),t.setUint8(e++,240|i>>18),t.setUint8(e++,128|i>>12&63),t.setUint8(e++,128|i>>6&63),t.setUint8(e++,128|63&i))}function s(t,e,i){var n=typeof i,r=0,a=0,o=0,h=0,c=0,u=0;if("string"===n){if(c=function(t){for(var e=0,s=0,i=0,n=t.length;i<n;i++)(e=t.charCodeAt(i))<128?s+=1:e<2048?s+=2:e<55296||e>=57344?s+=3:(i++,s+=4);return s}(i),c<32)t.push(160|c),u=1;else if(c<256)t.push(217,c),u=2;else if(c<65536)t.push(218,c>>8,c),u=3;else{if(!(c<4294967296))throw new Error("String too long");t.push(219,c>>24,c>>16,c>>8,c),u=5}return e.push({_str:i,_length:c,_offset:t.length}),u+c}if("number"===n)return Math.floor(i)===i&&isFinite(i)?i>=0?i<128?(t.push(i),1):i<256?(t.push(204,i),2):i<65536?(t.push(205,i>>8,i),3):i<4294967296?(t.push(206,i>>24,i>>16,i>>8,i),5):(o=i/Math.pow(2,32)>>0,h=i>>>0,t.push(207,o>>24,o>>16,o>>8,o,h>>24,h>>16,h>>8,h),9):i>=-32?(t.push(i),1):i>=-128?(t.push(208,i),2):i>=-32768?(t.push(209,i>>8,i),3):i>=-2147483648?(t.push(210,i>>24,i>>16,i>>8,i),5):(o=Math.floor(i/Math.pow(2,32)),h=i>>>0,t.push(211,o>>24,o>>16,o>>8,o,h>>24,h>>16,h>>8,h),9):(t.push(203),e.push({_float:i,_length:8,_offset:t.length}),9);if("object"===n){if(null===i)return t.push(192),1;if(Array.isArray(i)){if((c=i.length)<16)t.push(144|c),u=1;else if(c<65536)t.push(220,c>>8,c),u=3;else{if(!(c<4294967296))throw new Error("Array too large");t.push(221,c>>24,c>>16,c>>8,c),u=5}for(r=0;r<c;r++)u+=s(t,e,i[r]);return u}if(i instanceof Date){var d=i.getTime();return o=Math.floor(d/Math.pow(2,32)),h=d>>>0,t.push(215,0,o>>24,o>>16,o>>8,o,h>>24,h>>16,h>>8,h),10}if(i instanceof ArrayBuffer){if((c=i.byteLength)<256)t.push(196,c),u=2;else if(c<65536)t.push(197,c>>8,c),u=3;else{if(!(c<4294967296))throw new Error("Buffer too large");t.push(198,c>>24,c>>16,c>>8,c),u=5}return e.push({_bin:i,_length:c,_offset:t.length}),u+c}if("function"==typeof i.toJSON)return s(t,e,i.toJSON());var f=[],l="",v=Object.keys(i);for(r=0,a=v.length;r<a;r++)"function"!=typeof i[l=v[r]]&&f.push(l);if((c=f.length)<16)t.push(128|c),u=1;else if(c<65536)t.push(222,c>>8,c),u=3;else{if(!(c<4294967296))throw new Error("Object too large");t.push(223,c>>24,c>>16,c>>8,c),u=5}for(r=0;r<c;r++)u+=s(t,e,l=f[r]),u+=s(t,e,i[l]);return u}if("boolean"===n)return t.push(i?195:194),1;if("undefined"===n)return t.push(212,0,0),3;throw new Error("Could not encode")}t.exports=function(t){var i=[],n=[],r=s(i,n,t),a=new ArrayBuffer(r),o=new DataView(a),h=0,c=0,u=-1;n.length>0&&(u=n[0]._offset);for(var d,f=0,l=0,v=0,g=i.length;v<g;v++)if(o.setUint8(c+v,i[v]),v+1===u){if(f=(d=n[h])._length,l=c+u,d._bin)for(var p=new Uint8Array(d._bin),_=0;_<f;_++)o.setUint8(l+_,p[_]);else d._str?e(o,l,d._str):void 0!==d._float&&o.setFloat64(l,d._float);c+=f,n[++h]&&(u=n[h]._offset)}return a}},86:(t,e,s)=>{e.encode=s(370),e.decode=s(852)},781:(t,e,s)=>{const i=s(256);class n extends BroadcastChannel{event=new i;constructor(){super("tab"),this.onmessage=this.recieve,this.alone=!0,this.send({type:"loaded"})}send(t){this.postMessage(JSON.stringify(t))}recieve(t){"loaded"===JSON.parse(t.data).type&&(this.alone=!1,event.dispatchEvent("newTab"),console.log("New tab (not cool)"))}}t.exports=n},650:(t,e,s)=>{const i=s(256);class n{static event=new i;static setup(){document.querySelector("#chat").addEventListener("submit",(t=>{t.preventDefault();const e=document.querySelector("#chat > input");this.event.dispatchEvent("chat",e.value),e.value=""})),document.querySelector("#nick").addEventListener("submit",(t=>{t.preventDefault();const e=document.querySelector("#nick > input");this.event.dispatchEvent("nick",e.value),e.value=""})),document.querySelector("#color").addEventListener("input",(t=>{const e=document.querySelector("#color");this.event.dispatchEvent("color",e.value)})),document.querySelector("#minigames").addEventListener("click",(t=>{alert("We didn't make minigames yet, sorry ;)")})),document.querySelector("#disconnect-warning").classList.add("hidden"),document.querySelector("#disconnect-warning > .container > button").addEventListener("click",(()=>{document.location.reload()}))}static setColor(t){document.querySelector("#color").value=t}static setStats(t){const{fps:e,ping:s,players:i}=t;e&&(document.querySelector("#fps-counter").textContent=e),s&&(document.querySelector("#ping-counter").textContent=s),i&&(document.querySelector("#players-online").innerText=i)}static showDisconnectionWarning(){document.querySelector("#disconnect-warning").classList.remove("hidden")}}t.exports=n},670:(t,e,s)=>{const i=s(856),n=s(932),r=s(812),a=s(507),o=s(256),h=s(650),{randint:c}=s(555);class u{static event=new o;static config={mouseFloatPrecision:2e3,socketUrl:"wss://"+location.hostname};static data={cursors:{},chats:{}};static settings={color:"#"+c(1118481,16777215).toString(16),nick:"No nickname"};static ws=null;static me=new a;static fetchSettings(){Object.assign(this.settings,localStorage),this.settings.Length=void 0,this.me.c=this.settings.color,this.me.nick=this.settings.nick,h.setColor(this.settings.color)}static saveSettings(){Object.assign(localStorage,this.settings),this.me.c=this.settings.color,this.me.nick=this.settings.nick}static syncSettings(){i.updateState(this.me)}static start(){r.listen(n.canvas),h.setup(),h.event.addEventListener("chat",(t=>{i.sendMessage(t)})),h.event.addEventListener("nick",(t=>{this.settings.nick=t,this.saveSettings(),this.syncSettings()})),h.event.addEventListener("color",(t=>{this.settings.color=t,this.saveSettings(),this.syncSettings()})),this.fetchSettings(),this.syncSettings(),i.event.addEventListener("close",(t=>{h.showDisconnectionWarning()}))}static setupSocketListeners(){this.me.id=i.userId,i.event.addEventListener("message_USER_JOIN",(t=>{t.id!=this.me.id&&this.userJoin(t)})),i.event.addEventListener("message_USER_LEAVE",(t=>{t.id!=this.me.id&&this.userLeave(t)})),i.event.addEventListener("message_USER_MOVE",(t=>{t.id!=this.me.id&&this.userMove(t)})),i.event.addEventListener("message_DATA_CHANGE",(t=>{t.id!=this.me.id&&this.userDataChange(t)})),i.event.addEventListener("message_CHAT",(t=>{this.chatMessage(t)})),i.event.addEventListener("message_IDENTIFY",(t=>{this.me.id=t.id}))}static userJoin(t){const e=new a(t);this.data.cursors[t.id]=e,this.event.dispatchEvent("user_join",e)}static userLeave(t){const e=this.data.cursors[t.id];e&&(e.selfDestruct(),delete this.data.cursors[t.id],this.event.dispatchEvent("user_leave",t))}static userMove(t){const e=this.data.cursors[t.id];e&&(e.merge(t),this.event.dispatchEvent("user_move",t))}static userDataChange(t){t.id==this.me.id?this.me.merge(t):this.data.cursors[t.id].merge(t),this.event.dispatchEvent("user_change",t)}static chatMessage(t){let{msg:e,id:s}=t;this.data.chats[s]??=[],this.data.chats[s].push(e),setTimeout((()=>{this.data.chats[s].splice(0,1)}),150*e.length+5e3),this.event.dispatchEvent("chat_message",t)}static tick(){let[t,e]=this.screenToWorldSpace(r.mouseX,r.mouseY);const s={x:t,y:e,p:r.leftMousePressed};this.me.merge(s),r.changed&&i.updatePosition(s),r.changed=!1}static tickHighFreq(){for(let t of Object.keys(this.data.cursors))this.data.cursors[t].tickInterpolation();this.me.tickInterpolation()}static async tickLowFreq(){await i.ping(),h.setStats({fps:this.fps,ping:Math.round(i.gamePing),players:Object.keys(this.data.cursors).length+1})}static t0=performance.now();static t1=performance.now();static fps=0;static draw(){n.clear();for(let t of Object.keys(this.data.cursors)){let e=this.data.cursors[t],s=this.data.chats[t];n.renderPlayer(e,s)}n.renderPlayer(this.me,this.data.chats[this.me.id])}static screenToWorldSpace(t,e){return[t/n.canvas.width,e/n.canvas.height]}static async establishConnection(){return new Promise(((t,e)=>{const s=i.start(this.config.socketUrl);this.ws=s,this.setupSocketListeners(),s.onopen=()=>{s.onerror=s.onclose=null,t(s)},s.onerror=()=>{this.ws=null,e(0)},s.onclose=()=>{this.ws=null,e(1)}}))}}t.exports=u},812:(t,e,s)=>{const i=s(256);class n{static event=new i;static leftMousePressed=!1;static rightMousePressed=!1;static middleMousePressed=!1;static mouseX=0;static mouseY=0;static keysPressed=[];static listen(t){document.addEventListener("mousedown",(t=>{0==t.button&&(this.leftMousePressed=!0),1==t.button&&(this.rightMousePressed=!0),2==t.button&&(this.middleMousePressed=!0),this.changed=!0,this.event.dispatchEvent("mousedown",t.button),this.event.dispatchEvent("inputchanged")})),document.addEventListener("mouseup",(t=>{0==t.button&&(this.leftMousePressed=!1),1==t.button&&(this.rightMousePressed=!1),2==t.button&&(this.middleMousePressed=!1),this.changed=!0,this.event.dispatchEvent("mouseup",t.button),this.event.dispatchEvent("inputchanged")})),t.addEventListener("mousemove",(t=>{this.mouseX=t.offsetX,this.mouseY=t.offsetY,this.changed=!0,this.event.dispatchEvent("mousemove",this.mouseX,this.mouseY),this.event.dispatchEvent("inputchanged")})),t.addEventListener("touchmove",(t=>{let e=ctx.canvas.getBoundingClientRect();this.mouseX=t.touches[0].clientX-e.x,this.mouseY=t.touches[0].clientY-e.y,this.changed=!0,this.event.dispatchEvent("touchmove",this.mouseX,this.mouseY),this.event.dispatchEvent("mousemove",this.mouseX,this.mouseY),this.event.dispatchEvent("inputchanged")})),document.addEventListener("keydown",(t=>{let e=t.key.toLowerCase();this.keysPressed.includes(e)||this.keysPressed.push(e),this.changed=!0,this.event.dispatchEvent("keydown".key),this.event.dispatchEvent("inputchanged")})),document.addEventListener("keyup",(t=>{let e=t.key.toLowerCase();this.keysPressed.includes(e)&&this.keysPressed.splice(this.keysPressed.indexOf(e),1),this.changed=!0,this.event.dispatchEvent("keyup",e),this.event.dispatchEvent("inputchanged")}))}}t.exports=n},175:t=>{t.exports=class{static assets={unloaded:[],audio:{}};static async loadSound(t,e){return new Promise(((s,i)=>{const n=new Audio(e);n.oncanplaythrough=()=>{this.assets.audio[t]=n,s(n)},n.onerror=t=>{i("Failed to load with code "+t.code)}}))}static async loadAssets(){let t=[];for(const e of this.assets.unloaded){e.src="assets/"+e.type+"/"+e.src;let s=null;"audio"===e.type?s=this.loadSound(e.id,e.src):console.warn('Tried to load unknown asset "'+e.type+'"'),s.catch((t=>{console.warn("Unable to load asset "+e.id+"\n",t)})),t.push(s)}this.assets.unloaded=[];for await(let e of t)await e;return this.assets}}},507:(t,e,s)=>{const{randint:i}=s(555);class n{static interpolationFactor=6;constructor(t){this.x=.5,this.y=.5,this.appearX=.5,this.appearY=.5,this.p=!1,this.c="#"+i(256,4096).toString(16),this.nick="Loading Name...",this.id=null,Object.assign(this,t)}merge(t){Object.assign(this,t)}tickInterpolation(){let t=this.x-this.appearX,e=this.y-this.appearY;this.appearX+=t/n.interpolationFactor,this.appearY+=e/n.interpolationFactor}selfDestruct(){}}t.exports=n},932:t=>{t.exports=class{static canvas=null;static ctx=null;static lineSpacing=5;static setup(){this.canvas=document.querySelector("canvas"),this.ctx=this.canvas.getContext("2d"),window.addEventListener("resize",(t=>{this.resizeCanvas()})),this.resizeCanvas()}static resizeCanvas(){let t=this.canvas.getBoundingClientRect();this.canvas.width=t.width,this.canvas.height=t.height,this.ctx.font="18px calibri"}static clear(){this.ctx?.clearRect(0,0,this.canvas.width,this.canvas.height)}static renderPlayer(t,e=[]){if(!this.ctx)return;let{p:s,c:i}=t,n=t.appearX||t.x,r=t.appearY||t.y;n*=this.canvas.width,r*=this.canvas.height,this.ctx.fillStyle=i,this.ctx.beginPath(),this.ctx.arc(n,r,5,0,2*Math.PI),this.ctx.fill(),this.drawText(t.nick,n+5,r+this.lineSpacing,{verticalAlign:"top"}),this.ctx.fillStyle="#FFF",this.drawText(e,n+5,r),s&&(this.ctx.strokeStyle=i,this.ctx.beginPath(),this.ctx.arc(n,r,7,0,2*Math.PI),this.ctx.stroke())}static drawText(t,e,s,i={}){const{verticalAlign:n}=i;if(this.ctx)if(t instanceof Array){let i=0;for(let n of t){const t=this.ctx.measureText(n);let r=t.actualBoundingBoxAscent+t.actualBoundingBoxDescent+this.lineSpacing;this.ctx.fillText(n,e,s+i+r),i+=r}}else{const i=this.ctx.measureText(t);let r="top"==n?-i.actualBoundingBoxAscent-i.actualBoundingBoxDescent+this.lineSpacing:i.actualBoundingBoxAscent+i.actualBoundingBoxDescent+this.lineSpacing;this.ctx.fillText(t,e,s+r)}}}},856:(t,e,s)=>{const i=s(86),n=s(449),r=s(256);class a{static socket=null;static event=new r;static gamePing=0;static userId=null;static async ping(){const t=performance.now();this.sendJSON(n.PING,Math.floor(t)),await this.event.waitForEvent("message_PING");const e=performance.now();return this.gamePing=e-t,this.gamePing}static start(){const t=new WebSocket(...arguments);return this.socket=t,this.open=!0,t.onmessage=t=>{this.handleMessage(t)},t.onerror=t=>{this.event.dispatchEvent("error",t)},t.onclose=t=>{this.event.dispatchEvent("close")},t}static async handleMessage(t){let[e,s]=i.decode(await t.data.arrayBuffer());console.debug("%cIn: ","color:red",e,s),e==n.IDENTIFY&&(this.userId=s.id),this.event.dispatchEvent("message_"+n.typeof(e),s),this.event.dispatchEvent("message_generic",s)}static sendJSON(t,e){if(this.socket.readyState>=2)return this.event.dispatchEvent("close");console.debug("%cOut: ","color:lime",t,e),this.socket.send(i.encode([t,e]))}static updateState(t){if(this.socket.readyState>=2)return this.event.dispatchEvent("close");this.sendJSON(n.DATA_CHANGE,t)}static updatePosition(t){if(this.socket.readyState>=2)return this.event.dispatchEvent("close");this.sendJSON(n.USER_MOVE,t)}static sendMessage(t){if(this.socket.readyState>=2)return this.event.dispatchEvent("close");this.sendJSON(n.CHAT,{msg:t})}}t.exports=a},256:t=>{t.exports=class{static attach(t){const e=new this;return["addEventListener","removeEventListener","dispatchEvent","waitForEvent"].forEach((s=>{const i=e[s];t[s]=(...t)=>{i.call(e,...t)}})),e}constructor(){this.listeners={}}addEventListener(t,e){return this.listeners[t]??=[],this.listeners[t].push(e),e}removeEventListener(t,e){if(!this.listeners[t])return!1;let s=!1;for(;;){let i=this.listeners[t].indexOf(e);if(-1===i)break;this.listeners[t].splice(i,1),s=!0}return s}dispatchEvent(t,...e){this.listeners[t]?.forEach((t=>{t(...e)})),this.listeners["*"]?.forEach((s=>{s(t,...e)}))}waitForEvent(t){return new Promise(((e,s)=>{const i=this.addEventListener(t,((...s)=>{removeEventListener(t,i),e(...s)}))}))}}},449:t=>{t.exports={typeof:function(t){return Object.entries(this).find((e=>e[1]===t))?.[0]},USER_MOVE:1,DATA_CHANGE:2,USER_JOIN:3,USER_LEAVE:4,CHAT:5,IDENTIFY:6,PING:7}},555:t=>{t.exports={randint:(t,e)=>Math.floor(Math.random()*(e-t))+t}}},e={};function s(i){var n=e[i];if(void 0!==n)return n.exports;var r=e[i]={exports:{}};return t[i](r,r.exports,s),r.exports}(()=>{"use strict";s(555);const t=s(781),e=s(670),i=s(932),n=s(175);n.assets={unloaded:[{id:"player_join",src:"player_join.wav",type:"audio"},{id:"player_leave",src:"player_leave.wav",type:"audio"},{id:"new_message",src:"message.wav",type:"audio"}],audio:{}};let r=null;window.onload=async function s(){new t,r=await n.loadAssets(),i.setup();try{await e.establishConnection()}catch(t){return console.log("%cUnable to connect to the game.","color:red;font-weight:bold;"),await s()}console.log("%cSuccessfully connected to the game!","color:lime;font-weight:bold;"),e.syncSettings(),e.start(),setInterval((()=>e.tick()),50),setInterval((()=>e.tickHighFreq()),5),setInterval((()=>e.tickLowFreq()),500),e.event.addEventListener("user_join",(t=>{r.audio.player_join.play()})),e.event.addEventListener("user_leave",(t=>{r.audio.player_leave.play()})),e.event.addEventListener("chat_message",(t=>{r.audio.new_message.play()}))};var a=0;requestAnimationFrame((function t(s){e.fps=Math.round(1e3/(s-a)),a=s,e.draw(),requestAnimationFrame(t)}))})()})();