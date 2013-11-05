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
	
	foreRed =		min(100, max(0, foreRed));
	foreGreen =		min(100, max(0, foreGreen));
	foreBlue =		min(100, max(0, foreBlue));
	backRed =		min(100, max(0, backRed));
	backGreen =		min(100, max(0, backGreen));
	backBlue =		min(100, max(0, backBlue));
	
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
	var theColor = new Color(rgb[0], rgb[1], rgb[2]);
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
};

function coordinatesAreInWindow(x, y) {
	return ((x) >= 0 && (x) < kCOLS	&& (y) >= 0 && (y) < kROWS);
} 