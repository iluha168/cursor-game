module.exports = {
    typeof: function(type) {
		return Object.entries(this).find(([key])=>type===key)[1]
    },
	USER_MOVE: 1,
	DATA_CHANGE: 2,
	USER_JOIN: 3,
	USER_LEAVE: 4,
	CHAT: 5,
	IDENTIFY: 6,
	PING: 7,
};
