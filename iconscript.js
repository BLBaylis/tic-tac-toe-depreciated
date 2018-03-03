document.addEventListener("DOMContentLoaded", function() {
	document.getElementsByClassName("confirm-btn")[0].addEventListener("click", flip);
	document.getElementsByClassName("back-btn")[0].addEventListener("click", flip);
	for (var i = 0; i < document.getElementsByClassName("icon").length; i++){
		document.getElementsByClassName("icon")[i].addEventListener("click", iconSelect);
	}
	for (var i = 0; i < document.getElementsByClassName("colour").length; i++){
		document.getElementsByClassName("colour")[i].addEventListener("click", colourSelect);
	}
});

var userIcon = {colour : "black", icon : "circle"},
computerIcon = {colour : "black", icon : "cross"},
flipped = false;

function flip() {
  if (!flipped){
    document.getElementsByClassName("flipper")[0].classList.add("go-flip");
  } else if (flipped) {
    document.getElementsByClassName("flipper")[0].classList.remove("go-flip");
  }
  flipped = !flipped;
}

function iconSelect(event){
	var whichPlayer = event.target.classList[0];
	if (whichPlayer === "user"){
		userIcon.icon = event.target.classList[2];
		document.getElementsByClassName("user-canvas-inner")[0].style.backgroundImage = "url('icons/" + userIcon.icon + "/" + userIcon.icon 
		+ " " + userIcon.colour + ".png')";
	} else if (whichPlayer === "computer"){
		computerIcon.icon = event.target.classList[2];
		document.getElementsByClassName("computer-canvas-inner")[0].style.backgroundImage = "url('icons/"
		+ computerIcon.icon + "/" + computerIcon.icon + " " + computerIcon.colour + ".png')";
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