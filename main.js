
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

var kROWS = 34;
var kCOLS = 100;
var rectArray = new Array2D(kCOLS, kROWS);
var drawContext;
var fontSize = 14;

window.onload = init;

function init() {
	populateRectInWindow();

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

	for (var j = 0; j < kROWS; j++) {
		for (var i = 0; i < kCOLS; i++) {
			var rect = new Rect(Math.round(hPx * i / kCOLS), Math.round(vPx * j / kROWS), Math.round(hPx * (i + 1) / kCOLS) - Math.round(hPx * i / kCOLS), Math.round(vPx * (j + 1) / kROWS - vPx * j / kROWS));
			//var color = new Color(Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255));
			var color = new Color(0, 0, 0);
			rect.color = color;
			rectArray.set(i, j, rect);
		}
	};
};

function cellDisplayBuffer() {
	this.character = ' ';
	this.foreColorComponents = [0, 0, 0];
	this.backColorComponents = [0, 0, 0];
	this.opacity = 0;
	this.needsUpdate = false; 
};

var MENU_FLAME_ROW_PADDING = 2;
var MENU_FLAME_COLOR_SOURCE_COUNT = 1136;

var MENU_TITLE_WIDTH = 74;
var MENU_TITLE_HEIGHT = 19;

var MENU_FLAME_PRECISION_FACTOR = 10;
var MENU_FLAME_RISE_SPEED = 50;
var MENU_FLAME_SPREAD_SPEED	= 20;
var MENU_FLAME_COLOR_DRIFT_SPEED = 500;
var MENU_FLAME_FADE_SPEED = 20;
var MENU_FLAME_UPDATE_DELAY = 50;
var MENU_FLAME_ROW_PADDING	= 2;
var MENU_TITLE_OFFSET_X	= (-4);
var MENU_TITLE_OFFSET_Y	= (-1);
var MENU_FLAME_DENOMINATOR = (100 + MENU_FLAME_RISE_SPEED + MENU_FLAME_SPREAD_SPEED);

var displayBuffer = new Array2D(kCOLS, kROWS);

var flameTitleColor = new Color(0, 0, 0);
flameTitleColor.redRand = 9;
flameTitleColor.greenRand = 9;
flameTitleColor.blueRand = 15;
flameTitleColor.rand = 0;
flameTitleColor.colorDances = true;

function titleMenu() {
	//signed short flames[COLS][(ROWS + MENU_FLAME_ROW_PADDING)][3]; // red, green and blue
	// TODO: create a flat 3d array thing so this runs faster
	var flames = new Array(kCOLS);

	for (var i = 0; i < kCOLS; i++) {
    	flames[i] = new Array(kROWS + MENU_FLAME_ROW_PADDING);
    	for (var j = 0; j < kROWS + MENU_FLAME_ROW_PADDING; j++) {
        	flames[i][j] = new Array(3);

    	}
	}

//	var flames = new Array2D(kCOLS, kROWS);
	var colorSources = new Array2D(MENU_FLAME_COLOR_SOURCE_COUNT, 4);
	var colors = new Array2D(kCOLS, kROWS + MENU_FLAME_ROW_PADDING);
	var mask = new Array2D(kCOLS, kROWS);
	//signed short colorSources[MENU_FLAME_COLOR_SOURCE_COUNT][4]; // red, green, blue, and rand, one for each color source (no more than MENU_FLAME_COLOR_SOURCE_COUNT).
	//color *colors[COLS][(ROWS + MENU_FLAME_ROW_PADDING)];
	//unsigned char mask[COLS][ROWS];
	//boolean controlKeyWasDown = false;
	
	/*
	short i, b, x, y, button;
	buttonState state;
	brogueButton buttons[6];
	char whiteColorEscape[10] = "";
	char goldColorEscape[10] = "";
	char newGameText[100] = "", customNewGameText[100] = "";
	rogueEvent theEvent;
	enum NGCommands buttonCommands[6] = {NG_NEW_GAME, NG_OPEN_GAME, NG_VIEW_RECORDING, NG_HIGH_SCORES, NG_QUIT};
	
	cellDisplayBuffer shadowBuf[COLS][ROWS];*/
	/*var shadowBuf = new Array2D(kCOLS, kROWS);
	for (var i = 0; i < kCOLS; i++) {
		for(var j = 0; j < kROWS; j++) {
			shadowBuf.set(i, j, new cellDisplayBuffer);
		}
	};*/
	
	// Initialize the RNG so the flames aren't always the same.
	
	seedRandomGenerator(0);
	
	// Empty nextGamePath and nextGameSeed so that the buttons don't try to load an old game path or seed.
	//rogue.nextGamePath[0] = '\0';
	//rogue.nextGameSeed = 0;
	
	// Initialize the title menu buttons.
	/*encodeMessageColor(whiteColorEscape, 0, &white);
    encodeMessageColor(goldColorEscape, 0, KEYBOARD_LABELS ? &itemMessageColor : &white);
	sprintf(newGameText, "      %sN%sew Game      ", goldColorEscape, whiteColorEscape);
	sprintf(customNewGameText, " %sN%sew Game (custom) ", goldColorEscape, whiteColorEscape);
	b = 0;
	button = -1;
	
	initializeButton(&(buttons[b]));
	strcpy(buttons[b].text, newGameText);
	buttons[b].hotkey[0] = 'n';
	buttons[b].hotkey[1] = 'N';
	b++;
	
	initializeButton(&(buttons[b]));
	sprintf(buttons[b].text, "     %sO%spen Game      ", goldColorEscape, whiteColorEscape);
	buttons[b].hotkey[0] = 'o';
	buttons[b].hotkey[1] = 'O';
	b++;
	
	initializeButton(&(buttons[b]));
	sprintf(buttons[b].text, "   %sV%siew Recording   ", goldColorEscape, whiteColorEscape);
	buttons[b].hotkey[0] = 'v';
	buttons[b].hotkey[1] = 'V';
	b++;
	
	initializeButton(&(buttons[b]));
	sprintf(buttons[b].text, "    %sH%sigh Scores     ", goldColorEscape, whiteColorEscape);
	buttons[b].hotkey[0] = 'h';
	buttons[b].hotkey[1] = 'H';
	b++;*/
	
    // Seth:
/*	initializeButton(&(buttons[b]));
	sprintf(buttons[b].text, "        %sQ%suit        ", goldColorEscape, whiteColorEscape);
	buttons[b].hotkey[0] = 'q';
	buttons[b].hotkey[1] = 'Q';
	b++;*/
	
	/*
	x = COLS - 1 - 20 - 2;
	y = ROWS - 1;
	for (i = b-1; i >= 0; i--) {
		y -= 2;
		buttons[i].x = x;
		buttons[i].y = y;
		buttons[i].buttonColor = titleButtonColor;
		buttons[i].flags |= B_WIDE_CLICK_AREA;
	}*/
	
//	blackOutScreen();
	/*
	clearDisplayBuffer(shadowBuf);
	initializeButtonState(&state, buttons, b, x, y, 20, b*2-1);
	rectangularShading(x, y, 20, b*2-1, &black, INTERFACE_OPACITY, shadowBuf);
	drawButtonsInState(&state);*/
    
	initializeMenuFlames(true, colors, colorSources, flames, mask);
  //  rogue.creaturesWillFlashThisTurn = false; // total unconscionable hack
	
	//do {
		/*if (!controlKeyWasDown && controlKeyIsDown()) {
			strcpy(state.buttons[0].text, customNewGameText);
			drawButtonsInState(&state);
			buttonCommands[0] = NG_NEW_GAME_WITH_SEED;
			controlKeyWasDown = true;
		} else if (controlKeyWasDown && !controlKeyIsDown()) {
			strcpy(state.buttons[0].text, newGameText);
			drawButtonsInState(&state);
			buttonCommands[0] = NG_NEW_GAME;
			controlKeyWasDown = false;
		}*/
		
		// Update the display.
		
	var profiler = new Profile();

	
		setInterval(function updateMainMenuDisplay() {
			profiler.start("inner draw loop");
			updateMenuFlames(colors, colorSources, flames);
			drawMenuFlames(flames, mask);

			//overlayDisplayBuffer(shadowBuf, null);
			//overlayDisplayBuffer(state.dbuf, NULL);

			commitDraws();

			profiler.stop();
			profiler.print();
			//overlayDisplayBuffer(state.rbuf, NULL);
		}, MENU_FLAME_UPDATE_DELAY);
		
		
		// Pause briefly.
		/*if (pauseBrogue(MENU_FLAME_UPDATE_DELAY)) {
			// There was input during the pause! Get the input.
			nextBrogueEvent(&theEvent, true, false, true);
			
			// Process the input.
			button = processButtonInput(&state, NULL, &theEvent);
		}*/
		
		// Revert the display.
	//	overlayDisplayBuffer(state.rbuf, NULL);
		
	//} while (button == -1 && rogue.nextGame == NG_NOTHING);

	/*drawMenuFlames(flames, mask);
	if (button != -1) {
		rogue.nextGame = buttonCommands[button];
	}*/
}

var flameSourceColor = new Color(20, 7, 7);//[20, 7, 7, 60, 40, 40, 0, true];
flameSourceColor.redRand = 60;
flameSourceColor.greenRand = 40;
flameSourceColor.blueRand = 40;
flameSourceColor.colorDances = true;

var MENU_TITLE_WIDTH = 74;
var MENU_TITLE_HEIGH = 19;

function initializeMenuFlames(includeTitle, colors, colorSources, flames, mask) {
	var i;
	var j;
	var k;
	var colorSourceCount;

	//short i, j, k, colorSourceCount;
	var title = [
		"########   ########       ######         #######   ####     ###  #########",
		" ##   ###   ##   ###    ##     ###     ##      ##   ##       #    ##     #",
		" ##    ##   ##    ##   ##       ###   ##        #   ##       #    ##     #",
		" ##    ##   ##    ##   #    #    ##   #         #   ##       #    ##      ",
		" ##    ##   ##    ##  ##   ##     ## ##             ##       #    ##    # ",
		" ##   ##    ##   ##   ##   ###    ## ##             ##       #    ##    # ",
		" ######     ## ###    ##   ####   ## ##             ##       #    ####### ",
		" ##    ##   ##  ##    ##   ####   ## ##             ##       #    ##    # ",
		" ##     ##  ##   ##   ##    ###   ## ##      #####  ##       #    ##    # ",
		" ##     ##  ##   ##   ###    ##   ## ###       ##   ##       #    ##      ",
		" ##     ##  ##    ##   ##    #    #   ##       ##   ##       #    ##      ",
		" ##     ##  ##    ##   ###       ##   ###      ##   ###      #    ##     #",
		" ##    ##   ##     ##   ###     ##     ###    ###    ###    #     ##     #",
		"########   ####    ###    ######         #####        ######     #########",
		"                            ##                                            ",
		"                        ##########                                        ",
		"                            ##                                            ",
		"                            ##                                            ",
		"                           ####                                           ",
	];
	
	for (i=0; i<kCOLS; i++) {
		for (j=0; j<kROWS; j++) {
			//mask[i][j] = 0;
			mask.set(i, j, 0);
		}
	}
	
	for (i=0; i<kCOLS; i++) {
		for (j=0; j<(kROWS + MENU_FLAME_ROW_PADDING); j++) {
			//colors[i][j] = NULL;
			for (k=0; k<3; k++) {
				flames[i][j][k] = 0;
				//flames.set(i, j, 0);
			}
		}
	}
	
	// Seed source color random components.
	for (i=0; i<MENU_FLAME_COLOR_SOURCE_COUNT; i++) {
		for (k=0; k<4; k++) {
			// /colorSources[i][k] = rand_range(0, 1000);
			colorSources.set(i, k, rand_range(0, 1000));
		}
	}
	
	// Put some flame source along the bottom row.
	colorSourceCount = 0;
	for (i=0; i<kCOLS; i++) {
		colors.set(i, (kROWS + MENU_FLAME_ROW_PADDING)-1, flameSourceColor);
		//colors[i][(kROWS + MENU_FLAME_ROW_PADDING)-1] = &flameSourceColor;
		colorSourceCount++;
	}
	
	if (true) {
		// Wreathe the title in flames, and mask it in black.
		for (i=0; i<MENU_TITLE_WIDTH; i++) {
			for (j=0; j<MENU_TITLE_HEIGHT; j++) {
				var character = title[j].charAt(i);
				//console.log(character);
				if (character != ' ') {
					colors.set(Math.round((kCOLS - MENU_TITLE_WIDTH)/2 + i + MENU_TITLE_OFFSET_X), Math.round((kROWS - MENU_TITLE_HEIGHT)/2 + j + MENU_TITLE_OFFSET_Y), flameTitleColor);
					//colors[(kCOLS - MENU_TITLE_WIDTH)/2 + i + MENU_TITLE_OFFSET_X][(kROWS - MENU_TITLE_HEIGHT)/2 + j + MENU_TITLE_OFFSET_Y] = &flameTitleColor;
					colorSourceCount++;
					mask.set(Math.round((kCOLS - MENU_TITLE_WIDTH)/2 + i + MENU_TITLE_OFFSET_X), Math.round((kROWS - MENU_TITLE_HEIGHT)/2 + j + MENU_TITLE_OFFSET_Y), 100);
					//mask[(kCOLS - MENU_TITLE_WIDTH)/2 + i + MENU_TITLE_OFFSET_X][(kROWS - MENU_TITLE_HEIGHT)/2 + j + MENU_TITLE_OFFSET_Y] = 100;
				}
			}
		}
		
		// Anti-alias the mask.
		antiAlias(mask);
	}
	
	// Simulate the background flames for a while
	for (i=0; i < 100; i++) {
		updateMenuFlames(colors, colorSources, flames);
	}
	
}

var nbDirs = [[0,-1], [0,1], [-1,0], [1,0], [-1,-1], [-1,1], [1,-1], [1,1]];

// Takes a grid of values, each of which is 0 or 100, and fills in some middle values in the interstices.
function antiAlias(mask) {
	var i, j, x, y, dir, nbCount;
	var intensity = [0, 0, 35, 50, 60];
	
	for (i=0; i<kCOLS; i++) {
		for (j=0; j<kROWS; j++) {
			if (mask.get(i, j) < 100) {
				nbCount = 0;
				for (dir=0; dir<4; dir++) {
					x = i + nbDirs[dir][0];
					y = j + nbDirs[dir][1];
					if (/*coordinatesAreInWindow(x, y) &&*/ mask.get(x, y) == 100) {
						nbCount++;
					}
				}
			//	mask[i][j] = intensity[nbCount];
				mask.set(i, j, intensity[nbCount]);
			}
		}
	}
}

var darkGray = new Color(30, 30, 30);

function applyColorAverage(baseColor, newColor, averageWeight) {
	var weightComplement = 100 - averageWeight;
	baseColor.red = (baseColor.red * weightComplement + newColor.red * averageWeight) / 100;
	baseColor.redRand = (baseColor.redRand * weightComplement + newColor.redRand * averageWeight) / 100;
	baseColor.green = (baseColor.green * weightComplement + newColor.green * averageWeight) / 100;
	baseColor.greenRand = (baseColor.greenRand * weightComplement + newColor.greenRand * averageWeight) / 100;
	baseColor.blue = (baseColor.blue * weightComplement + newColor.blue * averageWeight) / 100;
	baseColor.blueRand = (baseColor.blueRand * weightComplement + newColor.blueRand * averageWeight) / 100;
	baseColor.rand = (baseColor.rand * weightComplement + newColor.rand * averageWeight) / 100;
	baseColor.colorDances = (baseColor.colorDances || newColor.colorDances);
}

function drawMenuFlames(flames, mask) {
	var i, j, versionStringLength;
	var tempColor = 0;
	//const color *maskColor = &black;
	var maskColor = new Color(0, 0, 0);
    var dchar = ' ';
    
    //versionStringLength = strLenWithoutEscapes(BROGUE_VERSION_STRING);
	
	for (j=0; j<kROWS; j++) {
		for (i=0; i<kCOLS; i++) {
           /* if (j == kROWS - 1 && i >= kCOLS - versionStringLength) {
                dchar = BROGUE_VERSION_STRING[i - (COLS - versionStringLength)];
            } else {*/
            //    dchar = ' ';
           // }
            
			if (mask.get(i, j) == 100) {
				plotCharWithColor(dchar, i, j, darkGray, maskColor);
			} else {
				tempColor = new Color(0, 0, 0);
				tempColor.red	= flames[i][j][0] / MENU_FLAME_PRECISION_FACTOR;
				tempColor.green	= flames[i][j][1] / MENU_FLAME_PRECISION_FACTOR;
				tempColor.blue	= flames[i][j][2] / MENU_FLAME_PRECISION_FACTOR;
				if (mask.get(i, j) > 0) {
					applyColorAverage(tempColor, maskColor, mask.get(i, j));
				}
				plotCharWithColor(dchar, i, j, darkGray, tempColor);
			}
		}
	}

//	draw();
}

/*function plotCharWithColor(dchar, x, y, cellForeColor, cellBackColor) {
	var color = rectArray.get(x, y).color;
	color.red = Math.round(cellBackColor.red);
	color.green = Math.round(cellBackColor.green);
	color.blue = Math.round(cellBackColor.blue);
}*/

function updateMenuFlames(colors, colorSources, flames) {
	
	var i, j, k, l, x, y;
	var tempFlames = new Array2D(kCOLS, 3);
	var colorSourceNumber, rand;
	
	colorSourceNumber = 0;
	for (j=0; j<(kROWS + MENU_FLAME_ROW_PADDING); j++) {
		// Make a temp copy of the current row.
		for (i=0; i<kCOLS; i++) {
			for (k=0; k<3; k++) {
				//tempFlames[i][k] = flames[i][j][k];
				tempFlames.set(i, k, flames[i][j][k]);
			}
		}
		
		for (i=0; i<kCOLS; i++) {
			// Each cell is the weighted average of the three color values below and itself.
			// Weight of itself: 100
			// Weight of left and right neighbors: MENU_FLAME_SPREAD_SPEED / 2 each
			// Weight of below cell: MENU_FLAME_RISE_SPEED
			// Divisor: 100 + MENU_FLAME_SPREAD_SPEED + MENU_FLAME_RISE_SPEED
			
			// Itself:
			for (k=0; k<3; k++) {
				flames[i][j][k] = 100 * flames[i][j][k] / MENU_FLAME_DENOMINATOR;
			}
			
			// Left and right neighbors:
			for (l = -1; l <= 1; l += 2) {
				x = i + l;
				if (x == -1) {
					x = kCOLS - 1;
				} else if (x == kCOLS) {
					x = 0;
				}
				for (k=0; k<3; k++) {
					flames[i][j][k] += MENU_FLAME_SPREAD_SPEED * tempFlames.get(x, k) / 2 / MENU_FLAME_DENOMINATOR;
				}
			}
			
			// Below:
			y = j + 1;
			if (y < (kROWS + MENU_FLAME_ROW_PADDING)) {
				for (k=0; k<3; k++) {
					flames[i][j][k] += MENU_FLAME_RISE_SPEED * flames[i][y][k] / MENU_FLAME_DENOMINATOR;
				}
			}
			
			// Fade a little:
			for (k=0; k<3; k++) {
				flames[i][j][k] = (1000 - MENU_FLAME_FADE_SPEED) * flames[i][j][k] / 1000;
			}
			
			if (colors.get(i, j)) {
				// If it's a color source tile:
				
				// First, cause the color to drift a little.
				for (k=0; k<4; k++) {
					colorSources.set(colorSourceNumber, k, colorSources.get(colorSourceNumber, k) + rand_range(-MENU_FLAME_COLOR_DRIFT_SPEED, MENU_FLAME_COLOR_DRIFT_SPEED));
					//colorSources[colorSourceNumber][k] += rand_range(-MENU_FLAME_COLOR_DRIFT_SPEED, MENU_FLAME_COLOR_DRIFT_SPEED);
					//colorSources[colorSourceNumber][k] = clamp(colorSources[colorSourceNumber][k], 0, 1000);
					colorSources.set(colorSourceNumber, k, clamp(colorSources.get(colorSourceNumber, k), 0, 1000));
				}
				
				// Then, add the color to this tile's flames.
				rand = colors.get(i, j).rand * colorSources.get(colorSourceNumber, 0) / 1000;
				flames[i][j][0] += (colors.get(i, j).red + (colors.get(i, j).redRand * colorSources.get(colorSourceNumber, 1) / 1000) + rand) * MENU_FLAME_PRECISION_FACTOR;
				flames[i][j][1] += (colors.get(i, j).green	+ (colors.get(i, j).greenRand	* colorSources.get(colorSourceNumber, 2) / 1000) + rand) * MENU_FLAME_PRECISION_FACTOR;
				flames[i][j][2] += (colors.get(i, j).blue	+ (colors.get(i, j).blueRand	* colorSources.get(colorSourceNumber, 3) / 1000) + rand) * MENU_FLAME_PRECISION_FACTOR;
				
			
			//	rand = colors[i][j]->rand * colorSources[colorSourceNumber][0] / 1000;
			//	flames[i][j][0] += (colors[i][j]->red	+ (colors[i][j]->redRand	* colorSources[colorSourceNumber][1] / 1000) + rand) * MENU_FLAME_PRECISION_FACTOR;
			//	flames[i][j][1] += (colors[i][j]->green	+ (colors[i][j]->greenRand	* colorSources[colorSourceNumber][2] / 1000) + rand) * MENU_FLAME_PRECISION_FACTOR;
			//	flames[i][j][2] += (colors[i][j]->blue	+ (colors[i][j]->blueRand	* colorSources[colorSourceNumber][3] / 1000) + rand) * MENU_FLAME_PRECISION_FACTOR;
				
				colorSourceNumber++;
			}
		}
	}
}

// Math stuff

function clamp(val, min, max){
    return Math.max(min, Math.min(max, val));
}

// Random

function rot(x, k) {
	return(((x)<<(k))|((x)>>(32-(k))));
};

function ranctx(a, b, c, d) {
	this.a = a;
	this.b = b;
	this.c = c;
	this.d = d;
};

function ranval(x) {
    var e = x.a - rot(x.b, 27);
    x.a = x.b ^ rot(x.c, 17);
    x.b = x.c + x.d;
    x.c = x.d + e;
    x.d = e + x.a;
    return x.d;
}

function range(n, RNG) {
	var div;
	var r;
	
	div = 4294967295/n;
	
	do {
		//r = ranval(&(RNGState[RNG])) / div;
		r = ranval((RNGState[RNG])) / div;
	} while (r >= n);
	
	return r;
}
 

function rand_range(lowerBound, upperBound) {
	if (upperBound <= lowerBound) {
		return lowerBound;
	}
/*	if (rogue.RNG == RNG_SUBSTANTIVE) {
		randomNumbersGenerated++;
	}*/
	//return lowerBound + range(upperBound-lowerBound+1, rogue.RNG);
	return lowerBound + range(upperBound-lowerBound+1, 0);
}

var RNG_SUBSTANTIVE = 0;
var RNG_COSMETIC = 1;
var RNGState = new Array(2);
RNGState[0] = new ranctx(0, 0, 0, 0);
RNGState[1] = new ranctx(0, 0, 0, 0);

// seeds with the time if called with a parameter of 0; returns the seed regardless.
// All RNGs are seeded simultaneously and identically.
function seedRandomGenerator(seed) {
	if (seed == 0) {
		var time = new Date().getTime();
		seed = time - 1352700000;
	}
	raninit((RNGState[RNG_SUBSTANTIVE]), seed);
	raninit((RNGState[RNG_COSMETIC]), seed);
	return seed;
}

function raninit(x, seed) {
    var i;
    x.a = 0xf1ea5eed;
 //	x.a = 255;
    x.b = x.c = x.d = seed;
    for (i=0; i<20; ++i) {
        ranval(x);
    }
}

///////

function plotCharWithColor(inputChar, xLoc, yLoc, cellForeColor, cellBackColor) {
    var oldRNG;
	
	var foreRed = cellForeColor.red,
	foreGreen = cellForeColor.green,
	foreBlue = cellForeColor.blue,
	
	backRed = cellBackColor.red,
	backGreen = cellBackColor.green,
	backBlue = cellBackColor.blue,
	
	foreRand, backRand;
	
	/*if (rogue.gameHasEnded || rogue.playbackFastForward) {
		return;
	}*/
	
    //assureCosmeticRNG;
	//oldRNG = rogue.RNG;
    //rogue.RNG = RNG_COSMETIC;
	
	foreRand = rand_range(0, cellForeColor.rand);
	backRand = rand_range(0, cellBackColor.rand);
	foreRed += rand_range(0, cellForeColor.redRand) + foreRand;
	foreGreen += rand_range(0, cellForeColor.greenRand) + foreRand;
	foreBlue += rand_range(0, cellForeColor.blueRand) + foreRand;
	backRed += rand_range(0, cellBackColor.redRand) + backRand;
	backGreen += rand_range(0, cellBackColor.greenRand) + backRand;
	backBlue += rand_range(0, cellBackColor.blueRand) + backRand;
	
	foreRed =		Math.min(100, Math.max(0, foreRed));
	foreGreen =		Math.min(100, Math.max(0, foreGreen));
	foreBlue =		Math.min(100, Math.max(0, foreBlue));
	backRed =		Math.min(100, Math.max(0, backRed));
	backGreen =		Math.min(100, Math.max(0, backGreen));
	backBlue =		Math.min(100, Math.max(0, backBlue));
	
	if (inputChar != ' '
		&& foreRed		== backRed
		&& foreGreen	== backGreen
		&& foreBlue		== backBlue) {
		
		inputChar = ' ';
	}
	
	if (inputChar		!= displayBuffer.get(xLoc, yLoc).character
		|| foreRed		!= displayBuffer.get(xLoc, yLoc).foreColorComponents[0]
		|| foreGreen	!= displayBuffer.get(xLoc, yLoc).foreColorComponents[1]
		|| foreBlue		!= displayBuffer.get(xLoc, yLoc).foreColorComponents[2]
		|| backRed		!= displayBuffer.get(xLoc, yLoc).backColorComponents[0]
		|| backGreen	!= displayBuffer.get(xLoc, yLoc).backColorComponents[1]
		|| backBlue		!= displayBuffer.get(xLoc, yLoc).backColorComponents[2]) {
		
		displayBuffer.get(xLoc, yLoc).needsUpdate = true;
		
		displayBuffer.get(xLoc, yLoc).character = inputChar;
		displayBuffer.get(xLoc, yLoc).foreColorComponents[0] = foreRed;
		displayBuffer.get(xLoc, yLoc).foreColorComponents[1] = foreGreen;
		displayBuffer.get(xLoc, yLoc).foreColorComponents[2] = foreBlue;
		displayBuffer.get(xLoc, yLoc).backColorComponents[0] = backRed;
		displayBuffer.get(xLoc, yLoc).backColorComponents[1] = backGreen;
		displayBuffer.get(xLoc, yLoc).backColorComponents[2] = backBlue;
	}
	
	//restoreRNG;
}

function commitDraws() {
	var i, j;
	
	for (i=0; i<kCOLS; i++) {
		for (j=0; j<kROWS; j++) {
			if (displayBuffer.get(i,j).needsUpdate) {
				plotChar(displayBuffer.get(i,j).character, i, j,
						 displayBuffer.get(i,j).foreColorComponents[0],
						 displayBuffer.get(i,j).foreColorComponents[1],
						 displayBuffer.get(i,j).foreColorComponents[2],
						 displayBuffer.get(i,j).backColorComponents[0],
						 displayBuffer.get(i,j).backColorComponents[1],
						 displayBuffer.get(i,j).backColorComponents[2]);
				displayBuffer.get(i,j).needsUpdate = false;
			}
		}
	}

	draw();
}

function plotChar(inputChar, xLoc, yLoc, foreRed, foreGreen, foreBlue, backRed, backGreen, backBlue) {
	var color = rectArray.get(xLoc, yLoc).color;
	color.red = Math.round(backRed / 100 * 255);
	color.green = Math.round(backGreen / 100 * 255);
	color.blue = Math.round(backBlue / 100 * 255);
}

// draws overBuf over the current display with per-cell pseudotransparency as specified in overBuf.
// If previousBuf is not null, it gets filled with the preexisting display for reversion purposes.
function overlayDisplayBuffer(overBuf, previousBuf) {
	var i, j;
	var foreColor, backColor, tempColor;
	var character;
	
	if (previousBuf) {
		copyDisplayBuffer(previousBuf, displayBuffer);
	}
	
	for (i=0; i<kCOLS; i++) {
		for (j=0; j<kROWS; j++) {
			
			if (overBuf.get(i, j).opacity != 0) {
				backColor = colorFromComponents(overBuf.get(i, j).backColorComponents);
				
				// character and fore color:
				if (overBuf.get(i, j).character == ' ') { // Blank cells in the overbuf take the character from the screen.
					character = displayBuffer.get(i, j).character;
					foreColor = colorFromComponents(displayBuffer.get(i, j).foreColorComponents);
					applyColorAverage(foreColor, backColor, overBuf.get(i, j).opacity);
				} else {
					character = overBuf.get(i, j).character;
					foreColor = colorFromComponents(overBuf.get(i, j).foreColorComponents);
				}
				
				// back color:
				tempColor = colorFromComponents(displayBuffer.get(i, j).backColorComponents);
				applyColorAverage(backColor, tempColor, 100 - overBuf.get(i, j).opacity);
				
				plotCharWithColor(character, i, j, foreColor, backColor);
			}
		}
	}
}

function colorFromComponents(rgb) {
	var theColor = new Color(0, 0, 0);
	theColor.red	= rgb[0];
	theColor.green	= rgb[1];
	theColor.blue	= rgb[2];
	return theColor;
}

function copyDisplayBuffer(toBuf, fromBuf) {
	var i, j;
	
	for (i=0; i<kCOLS; i++) {
		for (j=0; j<kROWS; j++) {
		//	toBuf[i][j] = fromBuf[i][j];
			toBuf.set(i, j, fromBuf.get(i, j));
		}
	}
}