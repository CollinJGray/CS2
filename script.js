var canvas = document.getElementById("window");
var ctx = canvas.getContext("2d");

document.addEventListener("keydown", handler);
document.addEventListener("keyup", uphandler);

ctx.fillStyle = "black"
ctx.fillRect(0, 0, 400, 400);

var posx = 0
var posy = 380
var velx = 0
var vely = 0
var width = 20
var height = 20
var red = 255
var green = 0
var blue = 0
var stage = 0

var rslider = document.getElementById("red")
var gslider = document.getElementById("green")
var bslider = document.getElementById("blue")
var rdisplay = document.getElementById("rvalue")
var gdisplay = document.getElementById("gvalue")
var bdisplay = document.getElementById("bvalue")
rdisplay = rslider.value
gdisplay = gslider.value
bdisplay = bslider.value

rslider.oninput = function() {
	rdisplay.innerHTML = this.value
	red = this.value
}

gslider.oninput = function() {
	gdisplay.innerHTML = this.value
	green = this.value
}

bslider.oninput = function() {
	bdisplay.innerHTML = this.value
	blue = this.value
}

function warp() {
	posy = 0;
}

function handler(event) {
	key = event.key
	switch(key) {
		case "a": //Move left
			velx = -5
			break;
		case "d": //Move right
		case "e":
			velx = 5
			break;
		/*case " ": //Jump
			if(posy == 400-height) {
				vely = -10;
			}
			break;*/
		default:
			break;
	}
}

function uphandler(event) {
	key = event.key
	switch(key) {
		case "a":
		case "d":
		case "e":
			velx = 0
			break;
	}
}

function ApplyXClips(x) {
	switch(stage) {
		case 0:
			if(x>=350-width) {
				stage=1
			} else if(posy<=150-height) {
				return x
			} else {
				return Math.min(x, 300-width)
			}
			break;
		case 1:
			break;
		case 2:
			break;
		case 3:
			break;
		case 4:
			break;
	}		
}

function ApplyYClips(y) {
	switch(stage) {
		case 0:
			if(y<=180-height&&posx>=200-width) {
				if(y>=150-height) {
					vely=0
				}
				return Math.min(y, 150-height)
			} if(y>=340-height) {
				if(y>=350-height) {
					vely=0
				}
				return Math.min(y, 350-height)
			} else {
				return y
			}
			break;
		case 1:
			break;
		case 2:
			break;
		case 3:
			break;
		case 4:
			break;
	}		
}

function UpdatePosition() {
	posx=ApplyXClips(Math.min(Math.max(posx+velx, 0), 400-width))
	posy=ApplyYClips(Math.min(Math.max(posy+vely, 0), 400-height))
	
	if(posy == 400-height) {
		vely=0
	} else {
		vely+=1
	}
}

function RenderLevel() {
	switch(stage) {
		case 0:
			Render0();
			break;
		case 1:
			Render1();
			break;
		case 2:
			Render2();
			break;
		case 3:
			Render3();
			break;
		case 4:
			Render4();
			break;
	}
}


function Render0() {
	ctx.fillStyle = "white"
	ctx.fillRect(0, 350, 400, 50)
	ctx.fillRect(200, 150, 200, 50)
	ctx.fillRect(300, 150, 200, 200)
	ctx.fillStyle = "purple"
	ctx.beginPath();
	ctx.arc(350, 130, 15, 0, 2*Math.PI);
	ctx.fill();
}

function Render1() {

}

function Render2() {

}

function Render3() {

}

function Render4() {

}

setInterval(function() {
	UpdatePosition()

	ctx.fillStyle = "black" //Redraw the background
	ctx.fillRect(0, 0, 400, 400)
	
	RenderLevel();
	
	ctx.fillStyle = "rgb("+red+","+green+","+blue+")" //Draw the block
	ctx.fillRect(posx, posy, width, height)
}, 20);
