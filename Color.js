function Color(red, green, blue) {
	this.red = red;
	this.green = green;
	this.blue = blue;

	// extra components for random color distribution (namely for Brogue demo)
	// random rGB components to add to base components
	this.redRand = 0;
	this.greenRand = 0;
	this.blueRand = 0;
	// random scalar
	this.rand = 0;

	// does this color dance with every refresh?
	var colorDances = false;


	this.rgbaStyle = function () {
		return "rgba(" + this.red + ", " + this.green + ", " + this.blue + ", 1)";
	};

	this.rgbHexValue = function () {
		return rgbToHex(this.red, this.green, this.blue);
	};

	function rgbToHex(r, g, b) {
    	return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
	};

	this.description = function () {
		return ("<Color> r: " + this.red + " g: " + this.green + " b: " + this.blue);
	};
}