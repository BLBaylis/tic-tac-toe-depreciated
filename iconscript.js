document.addEventListener("DOMContentLoaded", function() {
	document.getElementsByClassName("confirm-btn")[0].addEventListener("click", function(event){
		console.log(event);
		document.getElementsByClassName("open-player-icon-select-btn")[0].style.backgroundImage
		= "url('icons/" + userIcon.icon + "/" + userIcon.icon + " " + userIcon.colour + ".png')";
		flip();
		userIcon.updateIcon("user-square");
	});
	document.getElementsByClassName("confirm-btn")[1].addEventListener("click", function() {
		var confirmBtn = document.getElementsByClassName("confirm-btn");
		document.getElementsByClassName("open-comp-icon-select-btn")[0].style.backgroundImage
		 = "url('icons/" + computerIcon.icon + "/" + computerIcon.icon + " " + computerIcon.colour + ".png')";
		document.getElementsByClassName("flip-container")[0].classList.add("remove-icon-select");
		computerIcon.updateIcon("computer-square");
	});
	document.getElementsByClassName("open-player-icon-select-btn")[0].addEventListener("click", function() {
		if (flipped){
			flip();
		}
		document.getElementsByClassName("flip-container")[0].classList.remove("remove-icon-select");
	});
	document.getElementsByClassName("open-comp-icon-select-btn")[0].addEventListener("click", function() {
		if (!flipped){
			flip();
		}
		document.getElementsByClassName("flip-container")[0].classList.remove("remove-icon-select");
	});
	document.getElementsByClassName("back-btn")[0].addEventListener("click", flip);
	for (var i = 0; i < document.getElementsByClassName("icon").length; i++){
		document.getElementsByClassName("icon")[i].addEventListener("click", function(event){
			console.log("fired");
			var confirmBtn = document.getElementsByClassName("confirm-btn");
			iconSelect(event);
			if (event.target.classList.contains("user")) {
				confirmBtn[0].disabled = false;
				confirmBtn[0].style.cursor = "pointer";
			} else if (event.target.classList.contains("computer")) {
				confirmBtn[1].disabled = false;
				confirmBtn[1].style.cursor = "pointer";
			}
		});
	}
	for (var i = 0; i < document.getElementsByClassName("colour").length; i++){
		document.getElementsByClassName("colour")[i].addEventListener("click", colourSelect);
	}
	for (var i = 0; i < innerSquare.length; i++){
		innerSquare[i].addEventListener("click", userMove);
	}
	document.getElementsByClassName("rematch-btn")[0].addEventListener("click", restartGame);
});

var userIcon = {colour : "dark-green", icon : "circle", iconClass : "nought", updateIcon : function(element){
	console.log("userIcon refreshed");
	for (var i = 0; i < document.getElementsByClassName(element).length; i++){
		document.getElementsByClassName(element)[i].style.backgroundImage = "url('icons/" + userIcon.icon + "/" + userIcon.icon 
		+ " " + userIcon.colour + ".png')";
	}
}},
computerIcon = {colour : "light-red", icon : "cross", iconClass : "not-nought", updateIcon : function(element){
	console.log("computerIcon refreshed");
	for (var i = 0; i < document.getElementsByClassName(element).length; i++){
		document.getElementsByClassName(element)[i].style.backgroundImage = "url('icons/" + computerIcon.icon + "/" + computerIcon.icon 
		+ " " + computerIcon.colour + ".png')";
	}
}},
flipped = false,
innerSquare = document.getElementsByClassName("inner-square"),
gameObj = {center : "noone", moves : 0, grid : [0, 1, 2, 3, 4, 5 , 6, 7, 8]};

function flip() {
  if (!flipped){
    document.getElementsByClassName("flipper")[0].classList.add("go-flip");
  } else if (flipped) {
    document.getElementsByClassName("flipper")[0].classList.remove("go-flip");
  }
  flipped = !flipped;
}

function iconSelect(event){
	var whichPlayer = event.target.classList[0],
	noughts = document.getElementsByClassName("nought"),
	notNoughts = document.getElementsByClassName("not-nought");
	if (whichPlayer === "user"){
		userIcon.icon = event.target.classList[2];
		userIcon.updateIcon("user-canvas-inner");
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
		if (event.target.classList.contains("nought")) {
			computerIcon.iconClass = "nought";
		} else if (event.target.classList.contains("not-nought")) {
			computerIcon.iconClass = "not-nought";
		}
	}
	if (userIcon.iconClass === computerIcon.iconClass) {
		if (userIcon.iconClass === "nought"){
			computerIcon.icon = "cross";
			computerIcon.iconClass = "non-nought";
			computerIcon.updateIcon("computer-canvas-inner");
		} else {
			computerIcon.icon = "circle";
			computerIcon.iconClass = "nought";
			computerIcon.updateIcon("computer-canvas-inner");
		}
	}
}

function colourSelect(event){
	var whichPlayer = event.target.classList[0];
	if (whichPlayer === "user"){
		userIcon.colour = event.target.classList[2];
		document.getElementsByClassName("user-canvas-inner")[0].style.backgroundImage = "url('icons/"
		+ userIcon.icon + "/" + userIcon.icon + " " + userIcon.colour + ".png')";
	} else if (whichPlayer === "computer"){
		computerIcon.colour = event.target.classList[2];
		document.getElementsByClassName("computer-canvas-inner")[0].style.backgroundImage = "url('icons/"
		+ computerIcon.icon + "/" + computerIcon.icon + " " + computerIcon.colour + ".png')";
	}
}

function restartGame() {
	for (var i = 0; i < document.getElementsByClassName("inner-square").length; i++){
		document.getElementsByClassName("inner-square")[i].classList.remove("selected");
		document.getElementsByClassName("inner-square")[i].classList.remove("user-square");
		document.getElementsByClassName("inner-square")[i].classList.remove("computer-square");
		document.getElementsByClassName("inner-square")[i].style.backgroundImage = "";
	}
	gameObj = {center : "noone", moves : 0, grid : [0, 1, 2, 3, 4, 5 , 6, 7, 8]};
}

function computerMove(gridNumber) {
	var gridSquare = document.getElementsByClassName(gridNumber);
	gridSquare[0].classList.add("computer-square");
	gridSquare[0].style.backgroundImage = "url('icons/"
		+ computerIcon.icon + "/" + computerIcon.icon + " " + computerIcon.colour + ".png')";
	gameObj.grid.splice(gridNumber, 1 , "computer");
	gameObj.moves++;
}

function getCornerSquare() {
	var gridNumber, counter = 0, grid = gameObj.grid, corners = [grid[0], grid[2], grid[6], grid[8]];
	for (var i = 0; i < corners.length; i++){
		if (corners[i] === "user" || corners[i] === "computer"){
			counter++;
		}
	}
	if (counter === 4){
		return false;
	} else {
		if (grid[1] === "user" && grid[3] === "user"){
			corners.splice(3, 1);
		}
		if (grid[1] === "user" && grid[5] === "user"){
			corners.splice(2, 1);
		}
		if (grid[5] === "user" && grid[7] === "user"){
			corners.splice(0, 1);
		}
		if (grid[3] === "user" && grid[7] === "user"){
			corners.splice(1, 1);
		}
		gridNumber = corners[Math.floor(Math.random() * Math.floor(4))];
		while (isNaN(grid[gridNumber])){
			gridNumber = corners[Math.floor(Math.random() * Math.floor(4))];
		}
		console.log(gridNumber);
		computerMove(gridNumber);
		return true;
	}
}

function getCenterSquare() {
	if (gameObj.grid[4] !== "computer" && gameObj.grid[4] !== "user"){
		computerMove(gameObj.grid[4]);
		return true;
	}
}

function winChecker(whichPlayer, otherPlayer) {
	var grid = gameObj.grid, lineArray = [[grid[0], grid[1], grid[2]], 
	[grid[3], grid[4], grid[5]], 
	[grid[6], grid[7], grid[8]], 
	[grid[0], grid[3], grid[6]], 
	[grid[1], grid[4], grid[7]], 
	[grid[2], grid[5], grid[8]], 
	[grid[0], grid[4], grid[8]], 
	[grid[6], grid[4], grid[2]]];
	for (var i = 0; i < lineArray.length; i++) {
		var lastSquare, lineLength = 3;
		for (var j = 0; j < lineArray[i].length; j++){
			if (lineArray[i][j] !== whichPlayer){
				lineLength--;
				lastSquare = j;
			}
		}
		if (lineLength === 2 && lineArray[i][lastSquare] !== otherPlayer) {
			computerMove(lineArray[i][lastSquare]);
			return true;
		} 
	}
	return false;
}

function randomCompMove(){
	var gridSquare, remainingSquares = [], gridNumber;
	for (var i = 0; i < gameObj.grid.length; i++){
		if (gameObj.grid[i] !== "computer" && gameObj.grid[i] !== "user"){
			remainingSquares.push(i);
		}
	}
	gridNumber = remainingSquares[Math.floor(Math.random() * Math.floor(remainingSquares.length))];
	computerMove(gridNumber);
}

function getMiddleEdgeSquare() {
	var gridSquare, gridNumber, counter = 0, grid = gameObj.grid, middleEdge = [grid[1], grid[3], grid[5], grid[7]];
	for (var i = 0; i < middleEdge.length; i++){
		if (middleEdge[i] === "user" || middleEdge[i] === "computer"){
			counter++;
		}
	}
	if (counter === 4){
		return false;
	} else {
		gridNumber = middleEdge[Math.floor(Math.random() * Math.floor(4))];
		while (isNaN(grid[gridNumber])){
			gridNumber = middleEdge[Math.floor(Math.random() * Math.floor(4))];
		}
		computerMove(gridNumber);
		return true;
	}
}


function userMove(event) {
	var eventTarget = event.target;
	var gridNumber = Number(eventTarget.classList[1]);
	if (gridNumber === 4){
		gameObj.center = "user";
	}
	eventTarget.classList.add("user-square");
	eventTarget.style.backgroundImage = "url('icons/"+ userIcon.icon + "/" + userIcon.icon + " " + userIcon.colour + ".png')";
	console.log(eventTarget.style.backgroundImage);
	gameObj.grid.splice(gridNumber, 1, "user");
	gameObj.moves++;
	 if (gameObj.moves === 1 && gameObj.grid[4] === "user"){
	 	getCornerSquare();	
	} else if (gameObj.moves === 1 && gameObj.grid[4] !== "user"){
		getCenterSquare();
	} else if (gameObj.moves === 9){
		for (var k = 0; k < innerSquare.length; k++){
				innerSquare[k].classList.add("selected");
			}
	} else if (!winChecker("computer", "user")) {
		if (!winChecker("user", "computer")){
			if (gameObj.center === "user"){
				if (!getCornerSquare()){
					randomCompMove();
				}
		} else if (gameObj.center !== "user") {
				if (!getCornerSquare()){
					console.log("no middle squares");
					randomCompMove();
				}
			}
		}
	} else {
		for (var k = 0; k < innerSquare.length; k++){
			innerSquare[k].classList.add("selected");
		}
	}
}