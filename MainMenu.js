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
	//var colorSources = new Array2D(MENU_FLAME_COLOR_SOURCE_COUNT, 4);

	// TODO: change back
	var colorSources = new Array(MENU_FLAME_COLOR_SOURCE_COUNT);
	for(var i = 0; i < MENU_FLAME_COLOR_SOURCE_COUNT; i++) {
		colorSources[i] = new Array(4);
	}

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
		//	profiler.start("inner draw loop");
			updateMenuFlames(colors, colorSources, flames);
			drawMenuFlames(flames, mask);

			//overlayDisplayBuffer(shadowBuf, null);
			//overlayDisplayBuffer(state.dbuf, NULL);

			commitDraws();

		//	profiler.stop();
		//	profiler.print();
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
};

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
			colors.set(i, j, null);
			for (k=0; k<3; k++) {
				flames[i][j][k] = 0;
				//flames.set(i, j, 0);
			}
		}
	}
	
	// Seed source color random components.
	for (i=0; i<MENU_FLAME_COLOR_SOURCE_COUNT; i++) {
		for (k=0; k<4; k++) {
			 colorSources[i][k] = rand_range(0, 1000);
			//colorSources.set(i, k, rand_range(0, 1000));
		}
	}
	
	// Put some flame source along the bottom row.
	colorSourceCount = 0;
	for (i=0; i<kCOLS; i++) {
		var aColor = new Color(flameSourceColor.red, flameSourceColor.green, flameSourceColor.blue);
		aColor.redRand = flameSourceColor.redRand;
		aColor.greenRand = flameSourceColor.greenRand;
		aColor.blueRand = flameSourceColor.blueRand;
		aColor.colorDances = true;

		colors.set(i, (kROWS + MENU_FLAME_ROW_PADDING)-1, aColor);
		//colors[i][(kROWS + MENU_FLAME_ROW_PADDING)-1] = &flameSourceColor;
		colorSourceCount++;
	}
	
	if (includeTitle) {
		// Wreathe the title in flames, and mask it in black.
		for (i=0; i<MENU_TITLE_WIDTH; i++) {
			for (j=0; j<MENU_TITLE_HEIGHT; j++) {
				var character = title[j].charAt(i);
				//console.log(character);
				if (character != ' ') {
					var aColor = new Color(flameTitleColor.red, flameTitleColor.green, flameTitleColor.blue);
					aColor.redRand = flameTitleColor.redRand;
					aColor.greenRand = flameTitleColor.greenRand;
					aColor.blueRand = flameTitleColor.blueRand;
					aColor.colorDances = true;

					colors.set(Math.floor((kCOLS - MENU_TITLE_WIDTH)/2) + i + MENU_TITLE_OFFSET_X, Math.floor((kROWS - MENU_TITLE_HEIGHT)/2) + j + MENU_TITLE_OFFSET_Y, aColor);
					//colors[(kCOLS - MENU_TITLE_WIDTH)/2 + i + MENU_TITLE_OFFSET_X][(kROWS - MENU_TITLE_HEIGHT)/2 + j + MENU_TITLE_OFFSET_Y] = &flameTitleColor;
					colorSourceCount++;
					mask.set(Math.floor((kCOLS - MENU_TITLE_WIDTH)/2) + i + MENU_TITLE_OFFSET_X, Math.floor((kROWS - MENU_TITLE_HEIGHT)/2) + j + MENU_TITLE_OFFSET_Y, 100);
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
	
};

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
					if (coordinatesAreInWindow(x, y) && mask.get(x, y) == 100) {
						nbCount++;
					}
				}
			//	mask[i][j] = intensity[nbCount];
				mask.set(i, j, intensity[nbCount]);
			}
		}
	}
}

const darkGray = new Color(30, 30, 30);
const black = new Color(0, 0, 0);

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
	const maskColor = black;
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
			
			if (colors.get(i, j) != null) {
				// If it's a color source tile:
				
				// First, cause the color to drift a little.
				for (k=0; k<4; k++) {
				//	colorSources.set(colorSourceNumber, k, colorSources.get(colorSourceNumber, k) + rand_range(-MENU_FLAME_COLOR_DRIFT_SPEED, MENU_FLAME_COLOR_DRIFT_SPEED));
					colorSources[colorSourceNumber][k] += rand_range(-MENU_FLAME_COLOR_DRIFT_SPEED, MENU_FLAME_COLOR_DRIFT_SPEED);
					colorSources[colorSourceNumber][k] = clamp(colorSources[colorSourceNumber][k], 0, 1000);
					//colorSources.set(colorSourceNumber, k, clamp(colorSources.get(colorSourceNumber, k), 0, 1000));
				}
				
				// Then, add the color to this tile's flames.
				rand = colors.get(i, j).rand * colorSources[colorSourceNumber][0] / 1000;
				flames[i][j][0] += (colors.get(i, j).red + (colors.get(i, j).redRand * colorSources[colorSourceNumber][1] / 1000) + rand) * MENU_FLAME_PRECISION_FACTOR;
				flames[i][j][1] += (colors.get(i, j).green	+ (colors.get(i, j).greenRand	* colorSources[colorSourceNumber][2] / 1000) + rand) * MENU_FLAME_PRECISION_FACTOR;
				flames[i][j][2] += (colors.get(i, j).blue	+ (colors.get(i, j).blueRand	* colorSources[colorSourceNumber][3] / 1000) + rand) * MENU_FLAME_PRECISION_FACTOR;
				
			
			//	rand = colors[i][j]->rand * colorSources[colorSourceNumber][0] / 1000;
			//	flames[i][j][0] += (colors[i][j]->red	+ (colors[i][j]->redRand	* colorSources[colorSourceNumber][1] / 1000) + rand) * MENU_FLAME_PRECISION_FACTOR;
			//	flames[i][j][1] += (colors[i][j]->green	+ (colors[i][j]->greenRand	* colorSources[colorSourceNumber][2] / 1000) + rand) * MENU_FLAME_PRECISION_FACTOR;
			//	flames[i][j][2] += (colors[i][j]->blue	+ (colors[i][j]->blueRand	* colorSources[colorSourceNumber][3] / 1000) + rand) * MENU_FLAME_PRECISION_FACTOR;
				
				colorSourceNumber++;
			}
		}
	}
}

