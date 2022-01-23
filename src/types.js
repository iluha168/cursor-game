module.exports = {
	typeof: function (number) {
		return Object.entries(this).find(kv=>kv[1]===number)?.[0]
	},
	
	USER_MOVE: 1,
	DATA_CHANGE: 2,
	USER_JOIN: 3,
	USER_LEAVE: 4,
	CHAT: 5,
	IDENTIFY: 6,
	PING: 7,
};
