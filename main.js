
var Player = Class({
	playerElement: 0,

	init: function(elementID){
		this.playerElement = document.getElementById(elementID);
		this.playerElement.style.color = "white";
		this.playerElement.style.position = "absolute";
		this.playerElement.style.left = "100px";
		this.playerElement.style.top = "100px";
		this.playerElement.style.zIndex = "100";

		// private vars
		test = 666;
	},

	setPosition: function(point) {
		this.playerElement.style.left = point.x;
		this.playerElement.style.top = point.y;
	}
});

var rectArray = new Array2D(kCOLS, kROWS);
var drawContext;
var fontSize = 14;

window.onload = init;
window.onresize = resizeBroswerWindowHandler;

var resizeTimeout;
function resizeBroswerWindowHandler() {
	if (resizeTimeout != undefined) {
		clearTimeout(resizeTimeout);
	};

	resizeTimeout = setTimeout("populateRectInWindow()", 100);
}

function init() {
	populateRectInWindow();
	blackout();

	for(var i = 0; i < kCOLS; i++) {
		for(var j = 0; j < kROWS; j++) {
			displayBuffer.set(i, j, new cellDisplayBuffer());
		}
	}

	document.getElementById("bodyContainer").style.fontSize = fontSize + "px";

	//drawContext = new jsGraphics("playArea");
	var element = document.getElementById("playArea");
	drawContext = element.getContext('2d');

	var profiler = new Profile();

	profiler.start("draw loop");
	draw();

	profiler.stop();
	profiler.print();

	titleMenu();

	
	/*var player = new Player("player");

	var rect = rectArray.get(4, 3);
	var point = rect.centerPointToScreen();

	player.setPosition(point);*/
};

function blackout() {
	for (var j = 0; j < kROWS; j++) {
		for (var i = 0; i < kCOLS; i++) {
		//	var rect = new Rect(Math.round(hPx * i / kCOLS), Math.round(vPx * j / kROWS), Math.round(hPx * (i + 1) / kCOLS) - Math.round(hPx * i / kCOLS), Math.round(vPx * (j + 1) / kROWS) - Math.round(vPx * j / kROWS));
			//var color = new Color(Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255));
			var rect = rectArray.get(i, j);
			var color = new Color(0, 0, 0);
			rect.color = color;
			//rectArray.set(i, j, rect);
		}
	};
}

function draw() {
	var cols = rectArray.width;
	var rows = rectArray.height;

	for(var i = 0; i < cols; i++) {
		for(var j = 0; j < rows; j++) {
			var rect = rectArray.get(i, j);
			drawContext.fillStyle = rect.color.rgbaStyle();
			drawContext.fillRect(rect.x, rect.y, rect.width, rect.height);
		}
	};

	//console.log(rectArray.get(0, 0).color.description());
	//console.log(rectArray.get(0, 1).color.description());
	//console.log(rectArray.get(1, 0).color.description());
	//console.log(rectArray.get(5, 30).color.description());
};

function populateRectInWindow() {
	var hPx = 1024.0;
	var vPx = 768.0;

	var size = {
  		width: window.innerWidth || document.body.clientWidth,
  		height: window.innerHeight || document.body.clientHeight
	}

	hPx = size.width;
	vPx = size.height;

	var canvas = document.getElementsByTagName('canvas')[0];
	canvas.width  = hPx;
	canvas.height = vPx;

	for (var j = 0; j < kROWS; j++) {
		for (var i = 0; i < kCOLS; i++) {
			var rect = new Rect(Math.round(hPx * i / kCOLS), Math.round(vPx * j / kROWS), Math.round(hPx * (i + 1) / kCOLS) - Math.round(hPx * i / kCOLS), Math.round(vPx * (j + 1) / kROWS) - Math.round(vPx * j / kROWS));
			//var color = new Color(Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255));
			var color = new Color(0, 0, 0);
			rect.color = color;
			rectArray.set(i, j, rect);
		}
	};
};


function plotChar(inputChar, xLoc, yLoc, foreRed, foreGreen, foreBlue, backRed, backGreen, backBlue) {
	var color = rectArray.get(xLoc, yLoc).color;
	color.red = Math.floor(backRed/100 * 255);
	color.green = Math.floor(backGreen/100 *255);
	color.blue = Math.floor(backBlue/100*255);
}
