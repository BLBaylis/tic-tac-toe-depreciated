document.addEventListener("DOMContentLoaded", function() {
	for (var i = 0; i < document.getElementsByClassName("icon").length; i++){
		document.getElementsByClassName("icon")[i].addEventListener("click", function(event){
			playerIcon.icon = event.target.classList[1];
			document.getElementsByClassName("canvas-inner")[0].style.backgroundImage = "url('icons/"
			 + playerIcon.icon + "/" + playerIcon.icon + " " + playerIcon.colour + ".png')";
		})
	}
	for (var i = 0; i < document.getElementsByClassName("colour").length; i++){
		document.getElementsByClassName("colour")[i].addEventListener("click", function(event){
			playerIcon.colour = event.target.classList[1];
			document.getElementsByClassName("canvas-inner")[0].style.backgroundImage = "url('icons/"
			 + playerIcon.icon + "/" + playerIcon.icon + " " + playerIcon.colour + ".png')";
		})
	}
});

var playerIcon = {colour : "black", icon : "circle"},
computerIcon = {colour : "black", icon : "cross"};