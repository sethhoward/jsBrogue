
var Array2D = Class({
	width: 0,
	height: 0,
	storageArray: 0,

	init: function(width, height) {
		this.width = width;
		this.height = height;

		this.storageArray = new Array(width * height);
	},

	set: function(row, col, value) {
		this.storageArray[this.width * row + col] = value;
	},

	get: function(row, col) {
		return this.storageArray[this.width * row + col];
	},
});