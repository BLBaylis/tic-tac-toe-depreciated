document.addEventListener("DOMContentLoaded", function() {
	swapBtn[0].style.backgroundColor = "#fff";
	confirmBtn[0].addEventListener("click", function(event){
		flipper[0].style.transition = "0.6s";
		flip();
		userIcon.updateIcon("user-square");
		var index = gameObj.firstMove === "user" ? 0 : 1;
		openIconSelectBtnBackgroundUpdater(index, userIcon);
	});
	confirmBtn[1].addEventListener("click", function() {
		document.getElementsByClassName("game-wrapper")[0].classList.remove("hidden");
		flipContainer[0].classList.add("remove-icon-select");
		computerIcon.updateIcon("computer-square");
		var index = gameObj.firstMove === "computer" ? 0 : 1;
  		openIconSelectBtnBackgroundUpdater(index, computerIcon);
	});
	for (var j = 0; j < openIconSelectBtn.length; j++){
		openIconSelectBtn[j].addEventListener("click", function() {
			flipAnimationTransitionChanger();
			flipContainer[0].classList.remove("remove-icon-select");
		});
	}
	for (var k = 0; k < firstMoveBtn.length; k++){
		firstMoveBtn[k].addEventListener("click", function() {
			if (k === 2){
				swap();
			}
			firstMoveDivRemovalAnimations();
		});
	}
	document.getElementsByClassName("back-btn")[0].addEventListener("click", flip);
	for (var i = 0; i < iconElement.length; i++){
		iconElement[i].addEventListener("click", function(event){
			if (event.target.classList.contains("user")) {
				confirmBtnDisableToggle(0, false);
			} else if (event.target.classList.contains("computer")) {
				confirmBtnDisableToggle(1, false);
			}
			iconSelect(event);
		});
	}
	for (var i = 0; i < colour.length; i++){
		colour[i].addEventListener("click", colourSelect);
	}
	for (var i = 0; i < innerSquare.length; i++){
		innerSquare[i].addEventListener("click", userMove);
	}
	rematchBtn[0].addEventListener("click", restartGame);
	swapBtn[0].addEventListener("click", swap);
});

var userIcon = {colour : "dark-green", icon : "circle", iconClass : "nought", updateIcon : function(element){
	var element = document.getElementsByClassName(element);
	for (var i = 0; i < element.length; i++){
		element[i].style.backgroundImage = "url('icons/" + userIcon.icon + "/" + userIcon.icon 
		+ " " + userIcon.colour + ".png')";
	}
}, compatibilityCheck : function(){
	var text;
	if (userIcon.colour === "white") {
		if (userIcon.icon === "circle" || userIcon.icon === "cross" || userIcon.icon === "wheel" || userIcon.icon === "candy-cane"){
			confirmBtnDisableToggle(0, true);
			return false;
		} else if (userIcon.colour === "black" && userIcon.icon === "pencils"){
			confirmBtnDisableToggle(0, true);
			return false;
		}
	}
	return true;
}},
computerIcon = {colour : "light-red", icon : "cross", iconClass : "not-nought", updateIcon : function(element){
	var element = document.getElementsByClassName(element);
	for (var i = 0; i < element.length; i++){
		element[i].style.backgroundImage = "url('icons/" + computerIcon.icon + "/" + computerIcon.icon 
		+ " " + computerIcon.colour + ".png')";
	}
}, compatibilityCheck : function(){
	if (computerIcon.colour === "white") {
		if (computerIcon.icon === "circle" || computerIcon.icon === "cross" || computerIcon.icon === "wheel"
		 || computerIcon.icon === "candy-cane"){
			confirmBtnDisableToggle(1, true);
			return false;
		}
	} else if (computerIcon.colour === "black" && computerIcon.icon === "pencils"){
			confirmBtnDisableToggle(1, true);
			return false;
	}
	return true;
}},
flipped = false,
innerSquare = document.getElementsByClassName("inner-square"),
gameObj = {center : "", moves : 0, grid : [0, 1, 2, 3, 4, 5 , 6, 7, 8], outcome : "", firstMove : "user"},
swapBtn = document.getElementsByClassName("swap-btn"),
confirmBtn = document.getElementsByClassName("confirm-btn"),
openIconSelectBtn = document.getElementsByClassName("open-icon-select-btn"),
flipContainer = document.getElementsByClassName("flip-container"),
flipper = document.getElementsByClassName("flipper"),
firstMoveBtn = document.getElementsByClassName("first-move-btn"),
firstMoveDiv = document.getElementsByClassName("first-move-div"),
rematchBtn = document.getElementsByClassName("rematch-btn"),
iconElement = document.getElementsByClassName("icon"),
colour = document.getElementsByClassName("colour"),
userCanvasInner = document.getElementsByClassName("user-canvas-inner"),
computerCanvasInner = document.getElementsByClassName("computer-canvas-inner"),
endGame = document.getElementsByClassName("end-game");

function flip() {
  if (!flipped){
    flipper[0].classList.add("go-flip");
  } else if (flipped) {
    flipper[0].classList.remove("go-flip");
  }
  flipped = !flipped;
}

function flipAnimationTransitionChanger(){
	if (flipped && gameObj.firstMove === "user"){
		flipper[0].style.transition = "0s";
		flip();
	} else if (!flipped && gameObj.firstMove === "computer"){
		flipper[0].style.transition = "0s";
		flip();
	}
}

function openIconSelectBtnBackgroundUpdater(index, whichPlayerObj) {
	openIconSelectBtn[index].style.backgroundImage = 
    	"url('icons/" + whichPlayerObj.icon + "/" + whichPlayerObj.icon + " " + whichPlayerObj.colour + ".png')";
}

function confirmBtnDisableToggle(index, ifDisableThenTrue) {
	confirmBtn[index].disabled = ifDisableThenTrue;
	if (ifDisableThenTrue){
		confirmBtn[index].style.cursor = "not-allowed";
	} else {
		confirmBtn[index].style.cursor = "pointer";
	}
}

function swap(){
	if (gameObj.firstMove === "user"){
		openIconSelectBtnBackgroundUpdater(0, computerIcon);
		openIconSelectBtnBackgroundUpdater(1, userIcon);
		gameObj.firstMove = "computer";
	} else {
		gameObj.firstMove = "user";
		openIconSelectBtnBackgroundUpdater(0, userIcon);
		openIconSelectBtnBackgroundUpdater(1, computerIcon);
	}
	restartGame();
}

function firstMoveDivRemovalAnimations() {
	firstMoveDiv[0].classList.add("remove-first-move-div");
	swapBtn[0].classList.add("btn-flash");
	firstMoveDiv[0].innerHTML = "";
	swapBtn[0].style.backgroundColor = "";
	for (var i = 0; i < innerSquare.length; i++){
		innerSquare[i].classList.remove("selected");
	}
	rematchBtn[0].classList.remove("selected");
	swapBtn[0].classList.remove("selected");
}

function iconSelect(event){
	var whichPlayer = event.target.classList[0],
	noughts = document.getElementsByClassName("nought"),
	notNoughts = document.getElementsByClassName("not-nought");
	if (whichPlayer === "user"){
		userIcon.icon = event.target.classList[2];
		userIcon.updateIcon("user-canvas-inner");
		if (!userIcon.compatibilityCheck()){
			userCanvasInner[0].classList.add("incompatible-icon");
			return;
		}
		userCanvasInner[0].classList.remove("incompatible-icon");
		if (event.target.classList.contains("nought")) {
			userIcon.iconClass = "nought";
			for (var i = 4; i < notNoughts.length; i++) {
				noughts[i].classList.add("null-icon");
				notNoughts[i].classList.remove("null-icon");
			}
		} else if (event.target.classList.contains("not-nought")) {
			userIcon.iconClass = "not-nought";
			for (i = 4; i < noughts.length; i++) {
				notNoughts[i].classList.add("null-icon");
				noughts[i].classList.remove("null-icon");
			}
		}
	} else if (whichPlayer === "computer"){
		computerIcon.icon = event.target.classList[2];
		computerIcon.updateIcon("computer-canvas-inner");
		if (!computerIcon.compatibilityCheck()){
			computerCanvasInner[0].classList.add("incompatible-icon");
			return;
		}
		computerCanvasInner[0].classList.remove("incompatible-icon");
		if (event.target.classList.contains("nought")) {
			computerIcon.iconClass = "nought";
		} else if (event.target.classList.contains("not-nought")) {
			computerIcon.iconClass = "not-nought";
		}
	}
	if (userIcon.iconClass === computerIcon.iconClass) {
		if (userIcon.iconClass === "nought"){
			computerIcon.icon = "cross";
			computerIcon.colour = "light-red";
			computerIcon.iconClass = "non-nought";
			computerIcon.updateIcon("computer-canvas-inner");
		} else {
			computerIcon.icon = "circle";
			computerIcon.colour = "light-red";
			computerIcon.iconClass = "nought";
			computerIcon.updateIcon("computer-canvas-inner");
		}
	}
}

function colourSelect(event){
	var whichPlayer = event.target.classList[0];
	if (whichPlayer === "user"){
		userIcon.colour = event.target.classList[2];
		userIcon.updateIcon("user-canvas-inner");
		if (!userIcon.compatibilityCheck()){
			userCanvasInner[0].classList.add("incompatible-icon");
			return;
		}
		userCanvasInner[0].classList.remove("incompatible-icon");
	} else if (whichPlayer === "computer"){
		computerIcon.colour = event.target.classList[2];
		computerIcon.updateIcon("computer-canvas-inner");
		if (!computerIcon.compatibilityCheck()){
			console.log("not compatible");
			computerCanvasInner[0].classList.add("incompatible-icon");
			return;
		}
		computerCanvasInner[0].classList.remove("incompatible-icon");
	}
}

function restartGame() {
	for (var i = 0; i < innerSquare.length; i++){
		innerSquare[i].classList.remove("selected");
		innerSquare[i].classList.remove("user-square");
		innerSquare[i].classList.remove("computer-square");
		innerSquare[i].style.backgroundImage = "";
	}
	if (gameObj.outcome !== ""){
		endGame[0].classList.remove(gameObj.outcome);
	}
	gameObj = {center : "", moves : 0, grid : [0, 1, 2, 3, 4, 5 , 6, 7, 8], outcome : "", firstMove : gameObj.firstMove};
	if (gameObj.firstMove === "computer" && gameObj.moves === 0){
		chooseRandomMoveFromGivenArray("computer", gameObj.grid, false);
		gameObj.moves++;
	}
}

function makeMove(whichPlayer, gridNumber){

	function repatedMakeMoveCode() {
		innerSquare[gridNumber].classList.add(whichPlayer + "-square");
		grid[gridNumber] = whichPlayer;
		lastMove = gridNumber;
	}

	var grid = gameObj.grid;
	if (whichPlayer === "computer"){
		innerSquare[gridNumber].style.backgroundImage = "url('icons/"
		 + computerIcon.icon + "/" + computerIcon.icon 
		+ " " + computerIcon.colour + ".png')";
		repatedMakeMoveCode();
		return true;
	} else if (whichPlayer === "user"){
		innerSquare[gridNumber].style.backgroundImage = "url('icons/"
		 + userIcon.icon + "/" + userIcon.icon 
		+ " " + userIcon.colour + ".png')";
		repatedMakeMoveCode();
		return true;
	} else {
		return false;
	}	
}

function checkForGameEndingConditions(whichPlayer){
		if (winChecker(whichPlayer)){
		for (i = 0; i < innerSquare.length; i++){
			innerSquare[i].classList.add("selected");
		}
		endGame[0].classList.add(gameObj.outcome);
		return;
	}
	if (gameObj.moves === 9){
		gameObj.outcome = "draw";
		for (i = 0; i < innerSquare.length; i++){
			innerSquare[i].classList.add("selected");
		}
		endGame[0].classList.add(gameObj.outcome);
		return;
	}
}

function userMove(event){
	var eventTarget = event.target, 
	gridNumber = Number(eventTarget.classList[1]);
	makeMove("user", gridNumber);
	gameObj.moves++;
	if (checkForGameEndingConditions("user")){
		return;
	}
	computerMove();
	gameObj.moves++;
	if (checkForGameEndingConditions("computer")){
		return;
	}
}

function computerMove(){
	var grid = gameObj.grid, corners = [grid[0], grid[2], grid[6], grid[8]];
	if (grid[4] !== "user" && grid[4] !== "computer"){
		makeMove("computer", 4);
		gameObj.center = "computer";
		return false;
	}
	if (grid[4] === "computer"){
		if (lineLength2Checker("computer", "user")){
			return false;
		} else if (lineLength2Checker("user", "computer")){
			return false;
		} else if (checkAllAdjacentPairsForLength1()){
			return false;
		} else {
			chooseRandomMoveFromGivenArray("computer", gameObj.grid, false);
			return false;
		}
		return false;

	} else if (grid[4] === "user"){
		gameObj.center = "user";
		if (gameObj.moves === 1){
			chooseRandomMoveFromGivenArray("computer", corners, false);
			return false;
		} else if (lineLength2Checker("computer", "user")){
			return false;
		} else if (lineLength2Checker("user", "computer")){
			return false;
		} else {
			chooseRandomMoveFromGivenArray("computer", gameObj.grid, false);
			return false;
		}
		return false;
	}
}

function winChecker(whichPlayer) {
	var grid = gameObj.grid, lineArray = [[grid[0], grid[1], grid[2]], 
	[grid[3], grid[4], grid[5]], 
	[grid[6], grid[7], grid[8]], 
	[grid[0], grid[3], grid[6]], 
	[grid[1], grid[4], grid[7]], 
	[grid[2], grid[5], grid[8]], 
	[grid[0], grid[4], grid[8]], 
	[grid[6], grid[4], grid[2]]],
	lineLength = 0, validLinesArr = [];
	for (var i = 0; i < lineArray.length; i++){
		for (var j = 0; j < lineArray[i].length; j++){
			if (lineArray[i][j] === whichPlayer){
				lineLength++;
			}
		}
		if (lineLength === 3){
			gameObj.outcome = whichPlayer + "-win";
			return true;
		}
		lineLength = 0;
	}
	return false;
}

function length2Checker(whichPlayer, otherPlayer, arr, lineType){
	var grid = gameObj.grid, 
	lineLength = 3, 
	notWhichPlayer;
	for (var i = 0; i < arr.length; i++) {
		for (var j = 0; j < arr[i].length; j++) {
			if (arr[i][j] !== whichPlayer) {
				lineLength--;
				notWhichPlayer = arr[i][j];
			}
		}
		if (lineLength === 2){
			if (notWhichPlayer !== otherPlayer){
				return makeMove("computer", notWhichPlayer);
			} else if (whichPlayer === "user" && lineType === "diags") {
				if (gameObj.center === "user"){
					var corners = [grid[0], grid[2], grid[6], grid[8]];
					return chooseRandomMoveFromGivenArray("computer", corners, false);
				} else if (gameObj.center === "computer"){
					var edgeMiddle = [grid[1], grid[3], grid[5], grid[7]];
					return chooseRandomMoveFromGivenArray("computer", edgeMiddle, false);
				}
			}
		}
		lineLength = 3;
	}
	return false;
}

function lineLength2Checker(whichPlayer, otherPlayer) {
	var grid = gameObj.grid,

	rows = [[grid[0], grid[1], grid[2]], [grid[3], grid[4], grid[5]], [grid[6], grid[7], grid[8]]],
	cols = [[grid[0], grid[3], grid[6]], [grid[1], grid[4], grid[7]], [grid[2], grid[5], grid[8]]],
	diags = [[grid[0], grid[4], grid[8]], [grid[2], grid[4], grid[6]]];
	if (length2Checker(whichPlayer, otherPlayer, rows, "rows")){
		return true;
	} else if (length2Checker(whichPlayer, otherPlayer, cols, "cols")){
		return true;
	} else if (length2Checker(whichPlayer, otherPlayer, diags, "diags")){
		return true;
	} else {
		return false;
	}
}

function chooseRandomMoveFromGivenArray(whichPlayer, arr, isThisFunctionRecurring){
	arr = arr.filter(function(curr){
		return !isNaN(curr);
	});
	if (isThisFunctionRecurring){
		return false;
	}
	if (arr.length < 1){
		return chooseRandomMoveFromGivenArray(whichPlayer, gameObj.grid, true);
	}
	var random = Math.floor(Math.random() * arr.length);
	return makeMove(whichPlayer, arr[random]);
}

function workOutGridNumberFromEdgeIndex(arr, index){
	if (index === 0){
		square = arr[1] - (arr[2] - arr[1]);
	} else if (index === 1) {
		square = arr[2] - ((arr[2] - arr[0]) / 2);
	} else if (index === 2) {
		square = arr[1] + (arr[1] - arr[0]);
	}
	return square;
}

function lineLength1Checker(arr) {
	var square, lineLength = 0, grid = gameObj.grid;
	for (var i = 0; i < arr.length; i++){
		if (arr[i] === "user"){
			lineLength++;
			square = workOutGridNumberFromEdgeIndex(arr, i);
		} else if (arr[i] === "computer") {
			return true;
		}
	}
	if (lineLength === 1){
		return square;
	} 
	return true;
}

function adjacentLinesPairChecker(arr){
	var grid = gameObj.grid, square1, square2; 
	square1 = lineLength1Checker(arr[0]);
	if (square1 !== true){
		square2 = lineLength1Checker(arr[1]);
		if (square2 !== true && square1 !== square2){
			return true;
		}
	}
	return false;
}

function checkAllAdjacentPairsForLength1(){
	var grid = gameObj.grid, 
	adjacentEdges = [[[grid[0], grid[1], grid[2]], [grid[0], grid[3], grid[6]]], 
	[[grid[0], grid[1], grid[2]], [grid[2], grid[5], grid[8]]],
	[[grid[6], grid[7], grid[8]], [grid[0], grid[3], grid[6]]],
	[[grid[6], grid[7], grid[8]], [grid[2], grid[5], grid[8]]]],
	length1AdjacentEdges = [];
	for (var i = 0; i < adjacentEdges.length; i++){
		if (adjacentLinesPairChecker(adjacentEdges[i])){
			for (var j = 0; j < adjacentEdges[i].length; j++){
				for (var k = 0; k < adjacentEdges[i][j].length; k++){
					if (adjacentEdges[i][j][k] !== "user") {
						length1AdjacentEdges.push(adjacentEdges[i][j][k]);
					}
				}
			}
			length1AdjacentEdges = removeRepeatsInArray(length1AdjacentEdges);
			chooseRandomMoveFromGivenArray("computer", length1AdjacentEdges, false);
			return true
		}
	}
	return false;
}

function removeRepeatsInArray(arr){
	var counter;
	arr = arr.filter(function(curr, index){
		counter = 0;
		for (var i = index + 1; i < arr.length; i++){
			if (curr !== arr[i]){
				counter++;
			}
		}
		if (counter === arr.length - index - 1){
			return curr;
		}
	});
	return arr;
}