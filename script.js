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

widthinput.oninput = function() {
	width = this.value
}

heightinput.oninput = function() {
	height = this.value
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
				posy=350-height
				stage=1
				return 0
			} else if(posy<=150-height) {
				return x
			} else {
				return Math.min(x, 300-width)
			}
			break;
		case 1:
			if(x>=350-width) {
				stage=2
				return 0
			}
			return x;
			break;
		case 2:
			if(x>=350-width) {
				stage=0
				return 0
			} else if(blue>=200&&red+green<=50) {
				if(x>=125) {
					return Math.max(x, 150)
				} else {
					return Math.min(x, 100-width)
				}
			} else if(red>=200&&blue+green<=50) {
				if(x>=250) {
					return Math.max(x, 275)
				} else {
					return Math.min(225-width, x)
				}
			} else {
				if(x>=250) {
					return Math.max(x, 275)
				} else if(x>=125) {
					return Math.min(Math.max(x, 150), 225-width)
				} else {
					return Math.min(x, 100-width)
				}
			}

			return x
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
			if(posx<=125||posx>=275-width) {
				if(y>=350-height) {
					vely = 0
				}
				return Math.min(y, 350-height)
			} else if(y>=400-height) {
				posx=0
				return 350-height
			} else {
				return y
			}
			break;
		case 2:
			if(y>=350-height) {
				vely=0
			}
			return Math.min(350-height, y)
			break;
		case 3:
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
	}
}


function Render0() {
	ctx.fillStyle = "white"
	ctx.fillRect(0, 350, 400, 50)
	ctx.fillRect(200, 150, 200, 50)
	ctx.fillRect(300, 150, 200, 200)
	ctx.fillStyle = "green"
	ctx.beginPath();
	ctx.arc(350, 130, 15, 0, 2*Math.PI);
	ctx.fill();
}

function Render1() {
	ctx.fillStyle = "white"
	ctx.fillRect(0, 350, 125, 50)
	ctx.fillRect(275, 350, 125, 50)
	ctx.fillStyle = "green"
	ctx.beginPath();
	ctx.arc(350, 325, 15, 0, 2*Math.PI);
	ctx.fill();
}

function Render2() {
	ctx.fillStyle = "red"
	ctx.fillRect(100, 0, 50, 400)
	ctx.fillStyle = "blue"
	ctx.fillRect(225, 0, 50, 400)
	ctx.fillStyle = "white"
	ctx.fillRect(0, 350, 400, 50)
	ctx.fillStyle = "green"
	ctx.beginPath();
	ctx.arc(350, 325, 15, 0, 2*Math.PI);
	ctx.fill();
}

function Render3() {

}

setInterval(function() {
	UpdatePosition()

	console.log(posx + ", " + posy)

	ctx.fillStyle = "black" //Redraw the background
	ctx.fillRect(0, 0, 400, 400)
	
	RenderLevel();
	
	ctx.fillStyle = "rgb("+red+","+green+","+blue+")" //Draw the block
	ctx.fillRect(posx, posy, width, height)
}, 20);
