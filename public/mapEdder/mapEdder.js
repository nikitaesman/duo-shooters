const canv = document.querySelector("#canvas");
canv.width = 2000;
canv.height = 1000;
const ctx = canv.getContext("2d");
var rect = canv.getBoundingClientRect();

var vitia = new Image();
vitia.src = "../img/vitia.png";

var gun = new Image();
var m4a4 = new Image();
var awp = new Image();
gun.src = "../img/gun.png";
m4a4.src = "../img/m4a4.png";
awp.src = "../img/awp.png";

var canvX = 0;
var canvY = 0;
var canvScale = 1;
var canvScaleCorrectX = 0;
var canvScaleCorrectY = 0;
var directionX = 0;
var directionY = 0;
var grid = 1;
var mapName = "";

var plats = [];
var guns = [];
var spawns = [];


var mouseX, mouseY;
var dragOffsetX, dragOffsetY;
var selectedPlatID = -1;
var toSize = 0;
var toTrajectory = 0;


window.onkeydown = function(e) {
	if (e.key === "A" || e.keyCode === 65)  {
    	directionX = 2;
    }
    if (e.key === "D" || e.keyCode === 68)  {
        directionX = 1;
    }
    if (e.key === "W" || e.keyCode === 87)  {
        directionY = 2;
    }
    if (e.key === "S" || e.keyCode === 83)  {
        directionY = 1;
    }
    if (selectedPlatID != -1) {
    	switch (selectedMode) {
    		case "plats":
    			if (e.key === "ArrowLeft" || e.keyCode === 37)  {
			        if (toSize == 1) {
			        	if (plats[selectedPlatID].width>10) {
			        		plats[selectedPlatID].width -= 5;
			        	}
			        }else {
			        	plats[selectedPlatID].x -= 5;
			        }
			    }
			    if (e.key === "ArrowRight" || e.keyCode === 39)  {
			        if (toSize == 1) {
			        	plats[selectedPlatID].width += 5;
			        }else {
			        	plats[selectedPlatID].x += 5;
			        }
			    }
			    if (e.key === "ArrowUp" || e.keyCode === 38)  {
			        if (toSize == 1) {
			        	if (plats[selectedPlatID].height>10) {
			        		plats[selectedPlatID].height -= 5;
			        	}
			        }else {
			        	plats[selectedPlatID].y -= 5;
			        }
			    }
			    if (e.key === "ArrowDown" || e.keyCode === 40)  {
			        if (toSize == 1) {
			        	plats[selectedPlatID].height += 5;
			        }else {
			        	plats[selectedPlatID].y += 5;
			        }
			    }
			    if (e.key === "Delete" || e.keyCode === 46)  {
			        plats.splice(selectedPlatID,1)
			        selectedPlatID = -1;
			        celectPlatSetting();
			    }
    			break;
    		case "guns":
    			if (e.key === "ArrowLeft" || e.keyCode === 37)  {
			        guns[selectedPlatID].x -= 5;
			    }
			    if (e.key === "ArrowRight" || e.keyCode === 39)  {
			        guns[selectedPlatID].x += 5;
			    }
			    if (e.key === "ArrowUp" || e.keyCode === 38)  {
			        guns[selectedPlatID].y -= 5;
			    }
			    if (e.key === "ArrowDown" || e.keyCode === 40)  {
			        guns[selectedPlatID].y += 5;
			    }
			    if (e.key === "Delete" || e.keyCode === 46)  {
			        guns.splice(selectedPlatID,1)
			        selectedPlatID = -1;
			        celectPlatSetting();
			    }
    			break;
    		case "spawns":
    			if (e.key === "ArrowLeft" || e.keyCode === 37)  {
			        spawns[selectedPlatID].x -= 5;
			    }
			    if (e.key === "ArrowRight" || e.keyCode === 39)  {
			        spawns[selectedPlatID].x += 5;
			    }
			    if (e.key === "ArrowUp" || e.keyCode === 38)  {
			        spawns[selectedPlatID].y -= 5;
			    }
			    if (e.key === "ArrowDown" || e.keyCode === 40)  {
			        spawns[selectedPlatID].y += 5;
			    }
			    if (e.key === "Delete" || e.keyCode === 46)  {
			        spawns.splice(selectedPlatID,1)
			        selectedPlatID = -1;
			        celectPlatSetting();
			    }
    			break;
    	}
    	if (e.key === "Control" || e.keyCode === 17)  {
	        toSize = 1;
	    }
	}
    if ((e.key === "`" || e.keyCode === 192))  {
        if (grid == 0) {
        	grid = 1;
        }else {
        	grid = 0;
        }
    }
    // if (e.key === "Alt" || e.keyCode === 18)  {
        
    // }
    // if ((e.key === "Tab" || e.keyCode === 9))  {
    	
    // }
    // if ((e.key === "E" || e.keyCode === 69))  {
       	
    // }
}

window.onkeyup = function(e) {
	if (e.key === "A" || e.keyCode === 65)  {
		if (directionX == 2) {
			directionX = 0;
		}
    }
    if (e.key === "D" || e.keyCode === 68)  {
        if (directionX == 1) {
			directionX = 0;
		}  
    }
    if (e.key === "W" || e.keyCode === 87)  {
        if (directionY == 2) {
			directionY = 0;
		}
    }
    if (e.key === "S" || e.keyCode === 83)  {
        if (directionY == 1) {
			directionY = 0;
		}
    }
    if (e.key === "Control" || e.keyCode === 17)  {
        toSize = 0;
    }
}


function draw() {
	ctx.clearRect(0, 0, canv.width, canv.height);
	switch (directionX) {
		case 1:
			if (canvX>-(canv.width-1600-canvScaleCorrectX)) {
				canvX -= 10;
			}
			break;
		case 2:
			if (canvX<0-canvScaleCorrectX) {
				canvX += 10;
			}
			break;
	}
	switch (directionY) {
		case 1:
			if (canvY>-(canv.height-800-canvScaleCorrectY)) {
				canvY -= 10;
			}
			break;
		case 2:
			if (canvY<0-canvScaleCorrectY) {
				canvY += 10;
			}
			break;
	}
	canv.style.left = canvX + "px";
	canv.style.top = canvY + "px";
	document.querySelector(".infoBox__canvCord").innerHTML = "CanvCord x: "+(-(canvX+canvScaleCorrectX))+" y: "+(-(canvY+canvScaleCorrectY));

	if (document.querySelector("#checkboxPlayerModel").checked == 1) {
		ctx.drawImage(vitia,mouseX-25,mouseY-50);
	}

	//отрисовка текстур платформ
	for (var i in plats) {
		if(plats[i].toDie == 1) {
			ctx.fillStyle = "#00FF00";
		}
		else if(plats[i].toPort == 1) {
			ctx.fillStyle = "#1AA160";
		}
		else if(plats[i].toBoost == 1) {
			ctx.fillStyle = "#BA55D3";
		}else if(plats[i].model == "greenZone") {
			ctx.fillStyle = "rgba(5,241,68,.2)";
		}else if(plats[i].model == "ramp") {
			ctx.beginPath();
			ctx.moveTo(plats[i].x,plats[i].y+plats[i].height-10);
			ctx.fillStyle = "#1452FB";
			if(plats[i].rampDir == 1){
				ctx.lineTo(plats[i].x+plats[i].width,plats[i].y);
				ctx.lineTo(plats[i].x+plats[i].width,plats[i].y+plats[i].height-10);
				ctx.fill();	
			}else {
				ctx.lineTo(plats[i].x,plats[i].y);
				ctx.lineTo(plats[i].x+plats[i].width,plats[i].y+plats[i].height-10);
				ctx.fill();
			}
			ctx.fillStyle = "rgba(255,82,157,.2)";
			ctx.fillRect(plats[i].x,plats[i].y,plats[i].width,plats[i].height);
		}else {
			ctx.fillStyle = "#416D71";	
		}
		//дефолтный стиль отрисовка платформ
		ctx.fillRect(plats[i].x,plats[i].y,plats[i].width,plats[i].height);
		//отрисовка номера платформы
		ctx.fillStyle = "#FF0400";
		ctx.font = "10px Verdana";
		ctx.fillText("p"+i, plats[i].x+(plats[i].width/2), plats[i].y - 5);
		if (plats[i].unStatic == 1) {
			ctx.fillText("move", plats[i].x+20+(plats[i].width/2), plats[i].y - 5);
		}

		if (selectedPlatID == i && selectedMode == "plats") {
			ctx.beginPath();
			ctx.moveTo(plats[i].x,plats[i].y);
			ctx.lineTo(plats[i].x+plats[i].width,plats[i].y);
			ctx.lineTo(plats[i].x+plats[i].width,plats[i].y+plats[i].height);
			ctx.lineTo(plats[i].x,plats[i].y+plats[i].height);
			ctx.lineTo(plats[i].x,plats[i].y);
			ctx.lineWidth = 2;
			ctx.fillStyle = "#000";
			ctx.stroke();
			ctx.font = "10px Verdana";
			ctx.fillText(plats[i].height, plats[i].x-30, plats[i].y+3+(plats[i].height/2));
			ctx.fillText(plats[i].width, plats[i].x+(plats[i].width/2)-10, plats[i].y+plats[i].height+10);
			if(plats[i].unStatic == 1) {
				if (plats[i].moveObj.moveX != 0) {
					ctx.strokeStyle = "#2F00FF";
					ctx.font = "10px Verdana";
					ctx.fillText(plats[i].moveObj.goFromX, plats[i].moveObj.goFromX,plats[i].y-10);
					ctx.fillText(plats[i].moveObj.goToX, plats[i].moveObj.goToX,plats[i].y-10);
					ctx.lineWidth = 2;
					ctx.beginPath();
					ctx.moveTo(plats[i].moveObj.goFromX,plats[i].y);
					ctx.lineTo(plats[i].moveObj.goToX,plats[i].y);
					ctx.stroke();
				}
				if (plats[i].moveObj.moveY != 0) {
					ctx.strokeStyle = "#2F00FF";
					ctx.font = "10px Verdana";
					ctx.fillText(plats[i].moveObj.goFromY, plats[i].x, plats[i].moveObj.goFromY-10);
					ctx.fillText(plats[i].moveObj.goToY, plats[i].x, plats[i].moveObj.goToY-10);
					ctx.lineWidth = 2;
					ctx.beginPath();
					ctx.moveTo(plats[i].x, plats[i].moveObj.goFromY);
					ctx.lineTo(plats[i].x, plats[i].moveObj.goToY);
					ctx.stroke();
				}
			}
			if(plats[i].toPort == 1) {
				ctx.strokeStyle = "#2F00FF";
				ctx.font = "10px Verdana";
				ctx.fillText(plats[i].portObj.portToX+", "+plats[i].portObj.portToY, plats[i].portObj.portToX, plats[i].portObj.portToY-10);
				ctx.lineWidth = 2;
				ctx.beginPath();
				ctx.setLineDash([6]);
				ctx.moveTo(plats[i].x, plats[i].y);
				ctx.lineTo(plats[i].portObj.portToX, plats[i].portObj.portToY);
				ctx.lineTo(plats[i].portObj.portToX, plats[i].portObj.portToY+100);
				ctx.stroke();
				ctx.setLineDash([0]);
			}
			if(plats[selectedPlatID].toBoost == 1) {
				ctx.strokeStyle = "#B855D0";
				ctx.lineWidth = 2;
				ctx.beginPath();
				ctx.setLineDash([6]);
				ctx.moveTo(plats[i].x+(plats[i].width/2), plats[i].y);
				ctx.lineTo(plats[i].x+(plats[i].width/2), plats[i].y-plats[i].jump);
				ctx.stroke();
				ctx.beginPath();
				ctx.moveTo(plats[i].x-200, plats[i].y-plats[i].jump);
				ctx.lineTo(plats[i].x+200, plats[i].y-plats[i].jump);
				ctx.stroke();
				ctx.setLineDash([0]);
			}
		}
	}

	for (var g in guns) {
		switch (guns[g].name) {
			case "gun":
				ctx.drawImage(gun,guns[g].x,guns[g].y);
				break;
			case "m4a4":
				ctx.drawImage(m4a4,guns[g].x,guns[g].y);
				break;
			case "awp":
				ctx.drawImage(awp,guns[g].x,guns[g].y);
				break;
		}
		//отрисовка номера оружия
		ctx.fillStyle = "#FF0400";
		ctx.font = "10px Verdana";
		ctx.fillText("g"+g, guns[g].x+(guns[g].width/2), guns[g].y - 6);
		if (selectedPlatID == g && selectedMode == "guns") {
			ctx.beginPath();
			ctx.moveTo(guns[g].x,guns[g].y);
			ctx.lineTo(guns[g].x+guns[g].width,guns[g].y);
			ctx.lineTo(guns[g].x+guns[g].width,guns[g].y+guns[g].height);
			ctx.lineTo(guns[g].x,guns[g].y+guns[g].height);
			ctx.lineTo(guns[g].x,guns[g].y);
			ctx.lineWidth = 2;
			ctx.fillStyle = "#000";
			ctx.stroke();
			ctx.font = "10px Verdana";
			ctx.fillText(guns[g].height, guns[g].x-30, guns[g].y+3+(guns[g].height/2));
			ctx.fillText(guns[g].width, guns[g].x+(guns[g].width/2)-10, guns[g].y+guns[g].height+10);
		}
	}

	for (var s in spawns) {
		ctx.beginPath();
		ctx.moveTo(spawns[s].x,spawns[s].y);
		ctx.lineTo(spawns[s].x+50,spawns[s].y+100);
		ctx.lineWidth = 2;
		ctx.fillStyle = "#000";
		ctx.strokeStyle = "#000";
		ctx.stroke();
		ctx.beginPath();
		ctx.moveTo(spawns[s].x+50,spawns[s].y);
		ctx.lineTo(spawns[s].x,spawns[s].y+100);
		ctx.stroke();
		ctx.fillStyle = "rgba(251,228,20,.2)";
		ctx.fillRect(spawns[s].x,spawns[s].y,50,100);
		//отрисовка номера спавна
		ctx.fillStyle = "#FF0400";
		ctx.font = "10px Verdana";
		ctx.fillText("s"+s, spawns[s].x+20, spawns[s].y - 5);
		if (selectedPlatID == s && selectedMode == "spawns") {
			ctx.beginPath();
			ctx.moveTo(spawns[s].x,spawns[s].y);
			ctx.lineTo(spawns[s].x+50,spawns[s].y);
			ctx.lineTo(spawns[s].x+50,spawns[s].y+100);
			ctx.lineTo(spawns[s].x,spawns[s].y+100);
			ctx.lineTo(spawns[s].x,spawns[s].y);
			ctx.lineWidth = 2;
			ctx.fillStyle = "#000";
			ctx.stroke();
		}
	}
	
	if (selectedPlatID != -1) {
		document.querySelector(".infopanel__zone-selected").innerHTML = "";
		switch (selectedMode) {
			case "plats":
				document.querySelector(".infopanel__zone-selected").innerHTML = "<p class='infopanel__zone-selected'>Выбрана платформа №"+selectedPlatID+"</p>";
				for (var property in plats[selectedPlatID]) {
					if(property == "moveObj" || property == "portObj") {
						document.querySelector(".infopanel__zone-selected").innerHTML += "<p class='infopanel__zone-selected'>"+property+":{</p>";
						for (var propertyObj in plats[selectedPlatID][property]) {
							document.querySelector(".infopanel__zone-selected").innerHTML += "<p class='infopanel__zone-selectedObj'>"+propertyObj+":"+plats[selectedPlatID][property][propertyObj]+"</p>";
						}
						document.querySelector(".infopanel__zone-selected").innerHTML += "<p class='infopanel__zone-selected'>}</p>";
					}else {
						document.querySelector(".infopanel__zone-selected").innerHTML += "<p class='infopanel__zone-selected'>"+property+":"+plats[selectedPlatID][property]+"</p>";
					}
				}
				break;
			case "guns":
				document.querySelector(".infopanel__zone-selected").innerHTML = "<p class='infopanel__zone-selected'>Выбрано оружие №"+selectedPlatID+"</p>";
				for (var property in guns[selectedPlatID]) {
					document.querySelector(".infopanel__zone-selected").innerHTML += "<p class='infopanel__zone-selected'>"+property+":"+guns[selectedPlatID][property]+"</p>";
				}
				break;
			case "spawns":
				document.querySelector(".infopanel__zone-selected").innerHTML = "<p class='infopanel__zone-selected'>Выбран спавн №"+selectedPlatID+"</p>";
				for (var property in spawns[selectedPlatID]) {
					document.querySelector(".infopanel__zone-selected").innerHTML += "<p class='infopanel__zone-selected'>"+property+":"+spawns[selectedPlatID][property]+"</p>";
				}
				break;
			
		}
		
	}else {
		document.querySelector(".infopanel__zone-selected").innerHTML = "<p class='infopanel__zone-selected'>Выбран canvas</p>";
	}





	//отрисовка сетки
	if(grid == 1) {
		var degreeX = canv.width/100;
		var degreeY = canv.height/100;
		for (var i = degreeX; i >= 0; i--) {
			ctx.beginPath();
			ctx.moveTo(i*100,0);
			ctx.lineTo(i*100,canv.height)
			ctx.lineWidth = 1;
			ctx.fillStyle = "rgba(39,39,39,1)";
			ctx.strokeStyle = "rgba(39,39,39,1)";
			ctx.font = "10px Verdana";
			ctx.stroke();
			ctx.fillText("x:"+i*100, i*100-40, 10);
		}
		for (var i = degreeY; i >= 0; i--) {
			ctx.beginPath();
			ctx.moveTo(0,i*100);
			ctx.lineTo(canv.width,i*100)
			ctx.lineWidth = 1;
			ctx.fillStyle = "rgba(39,39,39,1)";
			ctx.strokeStyle = "rgba(39,39,39,1)";
			ctx.font = "10px Verdana";
			ctx.stroke();
			ctx.fillText("y:"+i*100, 10, i*100-10);
		}
	}




	requestAnimationFrame(draw);
}
draw();
celectPlatSetting();


function celectPlatSetting() {
	if (selectedPlatID != -1) {
		document.querySelector(".infoBox__canvas").style.display = 'none';
		if (selectedMode == "plats") {
			if(plats[selectedPlatID].unStatic == 1) {
				document.querySelector(".infoBox__trajectory").style.display = 'flex';
				//задаём дефолтные значения инпутам настройки траектории по X
				document.querySelector("#trajectoryMoveX").value = plats[selectedPlatID].moveObj.moveX;
				document.querySelector("#trajectorySpeedX").value = plats[selectedPlatID].moveObj.speedX
				document.querySelector("#trajectoryGoFromX").value = plats[selectedPlatID].moveObj.goFromX
				document.querySelector("#trajectoryGoToX").value = plats[selectedPlatID].moveObj.goToX
				//задаём дефолтные значения инпутам настройки траектории по Y
				document.querySelector("#trajectoryMoveY").value = plats[selectedPlatID].moveObj.moveY
				document.querySelector("#trajectorySpeedY").value = plats[selectedPlatID].moveObj.speedY
				document.querySelector("#trajectoryGoFromY").value = plats[selectedPlatID].moveObj.goFromY
				document.querySelector("#trajectoryGoToY").value = plats[selectedPlatID].moveObj.goToY
				//применяем новые настройки траектории движения платформы
				document.querySelector("#trajectory_apply").onclick = function(){
					plats[selectedPlatID].moveObj.moveX = Number(document.querySelector("#trajectoryMoveX").value);
					plats[selectedPlatID].moveObj.speedX = Number(document.querySelector("#trajectorySpeedX").value);
					plats[selectedPlatID].moveObj.goFromX = Number(document.querySelector("#trajectoryGoFromX").value);
					plats[selectedPlatID].moveObj.goToX = Number(document.querySelector("#trajectoryGoToX").value);

					plats[selectedPlatID].moveObj.moveY = Number(document.querySelector("#trajectoryMoveY").value);
					plats[selectedPlatID].moveObj.speedY = Number(document.querySelector("#trajectorySpeedY").value);
					plats[selectedPlatID].moveObj.goFromY = Number(document.querySelector("#trajectoryGoFromY").value);
					plats[selectedPlatID].moveObj.goToY = Number(document.querySelector("#trajectoryGoToY").value);
				}
			}else {
				document.querySelector(".infoBox__trajectory").style.display = 'none';
			}
			if(plats[selectedPlatID].toBoost == 1) {
				document.querySelector(".infoBox__boost").style.display = 'flex';
				document.querySelector("#boostJump").value = plats[selectedPlatID].jump;

				document.querySelector("#boostJump").onchange = function(){
					plats[selectedPlatID].jump = Number(document.querySelector("#boostJump").value);
				}
			}else {
				document.querySelector(".infoBox__boost").style.display = 'none';
			}
			if(plats[selectedPlatID].toPort == 1) {
				document.querySelector(".infoBox__portal").style.display = 'flex';
				//задаём дефолтные значения инпутам настройки телепортации
				document.querySelector("#portalPortToX").value = plats[selectedPlatID].portObj.portToX;
				document.querySelector("#portalPortToY").value = plats[selectedPlatID].portObj.portToY;
				//применяем новые настройки телепортации
				document.querySelector("#portal_apply").onclick = function(){
					plats[selectedPlatID].portObj.portToX = Number(document.querySelector("#portalPortToX").value);
					plats[selectedPlatID].portObj.portToY = Number(document.querySelector("#portalPortToY").value);
				}
			}else {
				document.querySelector(".infoBox__portal").style.display = 'none';
			}
			if(plats[selectedPlatID].model == "ramp") {
				document.querySelector(".infoBox__ramp").style.display = 'flex';
				//задаём дефолтные значения инпутам настройки направления рампы
				if (plats[selectedPlatID].rampDir == 1) {
					//document.querySelector("#rampDir-1").removeAttribute("checked");
					document.querySelector("#rampDir1").checked = true;
				}else {
					//document.querySelector("#rampDir1").removeAttribute("checked");
					document.querySelector("#rampDir-1").checked = true;
				}
				document.querySelector("#rampDir1").onchange = function(){
					plats[selectedPlatID].rampDir = 1;
				}
				document.querySelector("#rampDir-1").onchange = function(){
					plats[selectedPlatID].rampDir = -1;
				}
			}else {
				document.querySelector(".infoBox__ramp").style.display = 'none';
			}
		}
		if (selectedMode == "guns") {
			document.querySelector(".infoBox__gun").style.display = 'flex';

			document.querySelector("#gunTakes").value = guns[selectedPlatID].takes;
			document.querySelector("#gunTakes").onchange = function(){
				guns[selectedPlatID].takes = document.querySelector("#gunTakes").value;
			}

		}else {
			document.querySelector(".infoBox__gun").style.display = 'none';
		}
		if (selectedMode == "spawns") {
			
		}
	}else {
		document.querySelector(".infoBox__trajectory").style.display = 'none';
		document.querySelector(".infoBox__boost").style.display = 'none';
		document.querySelector(".infoBox__portal").style.display = 'none';
		document.querySelector(".infoBox__ramp").style.display = 'none';
		document.querySelector(".infoBox__gun").style.display = 'none';

		document.querySelector(".infoBox__canvas").style.display = 'flex';
		document.querySelector("#canvasWidth").oninput = function(){
			document.querySelector("#canvasWidthLable").innerHTML = "Canvas Width: "+this.value;
			canv.width = this.value;
		}
		document.querySelector("#canvasHeight").oninput = function(){
			document.querySelector("#canvasHeightLable").innerHTML = "Canvas Height: "+this.value;
			var canvHeightPrev = canv.height;
			canv.height = this.value;
			var canvHeightDiff = canvHeightPrev - canv.height;
			if (plats.length != 0) {
				for (var i in plats) {
					plats[i].y = plats[i].y - canvHeightDiff;
				}
			}
			if (guns.length != 0) {
				for (var g in guns) {
					guns[g].y = guns[g].y - canvHeightDiff;
				}
			}
			if (spawns.length != 0) {
				for (var s in spawns) {
					spawns[s].y = spawns[s].y - canvHeightDiff;
				}
			}
		}
	}
	getMapNames()
	if (mapName != "") {
		document.querySelector(".infoBox__mapName").innerHTML = "Map: " + mapName;
	}
}

function getMapNames() {
	var request = new XMLHttpRequest();
	var postAddress = location.origin+"/getNames"

	request.open('POST',postAddress);
	request.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
	request.send();

	request.onreadystatechange = function() {
		if(request.status == 200 && request.readyState == 4) {
	         mapsNames = (JSON.parse(request.responseText)).mapsNames;
	         document.querySelector("#selectMaps").innerHTML = "";
	         document.querySelector("#selectMaps").innerHTML += "<option value=''>Файл не выбран</option>";
	         for(var m in mapsNames) {
	         	document.querySelector("#selectMaps").innerHTML += "<option value="+mapsNames[m].substring(0,mapsNames[m].length-4)+">"+(mapsNames[m]).substring(0,mapsNames[m].length-4)+"</option>";
	         }
	    }
	}
}

document.querySelector("#setSave").onclick = function() {
	function setMap() {
		var mapNameText = prompt("Название карты","");
		if (mapNameText != "" && mapNameText != null) {
			var request = new XMLHttpRequest();
			var postAddress = location.origin+"/saveMap"

			request.open('POST',postAddress);
			request.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
			var reqInfo = {
				mapName: mapNameText,
				plats: plats,
				guns: guns,
				spawns: spawns,
				canvas: {
					width: canv.width,
					height: canv.height
				}
			}
			request.send(JSON.stringify(reqInfo));

			request.onreadystatechange = function() {
				if(request.status == 200 && request.readyState == 4) {
			         alert(request.responseText);
			         mapName = mapNameText;
			         celectPlatSetting();
			    }
			}
		}
	}
	if(mapName == "") {
		setMap();
	}else {
		var rewrite = confirm("Пререзаписать сохранённую карту "+mapName+" ?");
		if(rewrite == true) {
			var mapNameText = mapName;
			if (mapNameText != "" && mapNameText != null) {
				var request = new XMLHttpRequest();
				var postAddress = location.origin+"/saveMap"

				request.open('POST',postAddress);
				request.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
				var reqInfo = {
					mapName: mapNameText,
					plats: plats,
					guns: guns,
					spawns: spawns,
					canvas: {
						width: canv.width,
						height: canv.height
					}
				}
				request.send(JSON.stringify(reqInfo));

				request.onreadystatechange = function() {
					if(request.status == 200 && request.readyState == 4) {
				         alert(request.responseText);
				         celectPlatSetting();
				    }
				}
			}
		}else {
			setMap()
		}
	}
 	
}

document.querySelector("#openMap").onclick = function() {
	if(document.querySelector("#selectMaps").value != "") {
		var getName = document.querySelector("#selectMaps").value;
		var request = new XMLHttpRequest();
		var postAddress = location.origin+"/openMap"

		request.open('POST',postAddress);
		request.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
		request.send(getName);

		request.onreadystatechange = function() {
			if(request.status == 200 && request.readyState == 4) {
				var reqInfoOpen = JSON.parse(request.responseText);
		    	plats = reqInfoOpen.plats;
		    	guns = reqInfoOpen.guns;
		    	spawns = reqInfoOpen.spawns;
		    	mapName = reqInfoOpen.mapName;
		    	canv.width = reqInfoOpen.canvas.width;
		    	canv.height = reqInfoOpen.canvas.height;
		    	document.querySelector("#canvasWidthLable").innerHTML = "Canvas Width: "+canv.width;
		    	document.querySelector("#canvasHeightLable").innerHTML = "Canvas Height: "+canv.height;
		    	selectedPlatID = -1;
		    	celectPlatSetting();
		    }
		}
	}else {
		alert("Файл не выбран")
	}
}






document.querySelector("#canvasScale").oninput = function(){
	canvScale = this.value;
	canvScaleCorrectX = (canv.width-(canv.width*canvScale))/2;
	canvScaleCorrectY = (canv.height-(canv.height*canvScale))/2;
	//canvX = 0 - canvScaleCorrectX;
	//canvY = 0 - canvScaleCorrectY;
	document.querySelector("#canvasScaleLable").innerHTML = "Canvas Scale: "+this.value;
	canv.style.transform = "scale("+canvScale+")";
}





canv.addEventListener("mousedown", (e)=>{
	rect = canv.getBoundingClientRect()
	mouseX = Math.ceil((e.clientX - rect.left)/canvScale);
	mouseY = Math.ceil((e.clientY - rect.top)/canvScale);
	document.querySelector(".infoBox__mouse").innerHTML = "Mouse x: "+mouseX+", y: "+mouseY;
	selectedPlatID = -1;
	selectedMode = "canvas";
	for (var i in plats) {
		if (((plats[i].x<mouseX)&&(mouseX<plats[i].x+plats[i].width))
			&& ((plats[i].y<mouseY)&&(mouseY<plats[i].y+plats[i].height))) 
		{
			selectedPlatID = i;
			selectedMode = "plats";
			break;
		}
	}
	for (var g in guns) {
		if (((guns[g].x<mouseX)&&(mouseX<guns[g].x+guns[g].width))
			&& ((guns[g].y<mouseY)&&(mouseY<guns[g].y+guns[g].height))) 
		{
			selectedPlatID = g;
			selectedMode = "guns";
			break;
		}
	}
	for (var s in spawns) {
		if (((spawns[s].x<mouseX)&&(mouseX<spawns[s].x+50))
			&& ((spawns[s].y<mouseY)&&(mouseY<spawns[s].y+100))) 
		{
			selectedPlatID = s;
			selectedMode = "spawns";
			break;
		}
	}
	celectPlatSetting();
})





canv.addEventListener("mousemove", (e)=>{
	rect = canv.getBoundingClientRect()
	mouseX = Math.ceil((e.clientX - rect.left)/canvScale);
	mouseY = Math.ceil((e.clientY - rect.top)/canvScale);
	document.querySelector(".infoBox__mouse").innerHTML = "Mouse x: "+mouseX+", y: "+mouseY;
})






//drag plat
document.querySelector("#plat").addEventListener("dragstart",(event)=>{
	dragOffsetX = event.offsetX;
	dragOffsetY = event.offsetY;
})
document.querySelector("#plat").addEventListener("dragend",(event)=>{
	setTimeout(()=>{
		plats.push({
			x: Math.round((mouseX-dragOffsetX) / 10) * 10,
			y: Math.round((mouseY-dragOffsetY) / 10) * 10,
			width: 100,
			height: 20,
			model: "plats"
		})
		selectedPlatID = plats.length-1;
		selectedMode = "plats";
		celectPlatSetting();
	},50)
})
//drag platMove
document.querySelector("#platMove").addEventListener("dragstart",(event)=>{
	dragOffsetX = event.offsetX;
	dragOffsetY = event.offsetY;
})
document.querySelector("#platMove").addEventListener("dragend",(event)=>{
	setTimeout(()=>{
		plats.push({
			x: Math.round((mouseX-dragOffsetX) / 10) * 10,
			y: Math.round((mouseY-dragOffsetY) / 10) * 10,
			width: 100,
			height: 20,
			model: "plats",
			updated: 1,
			unStatic: 1,
			moveObj: {
				moveX: 1,
				speedX: 1,
				goFromX: (Math.round((mouseX-dragOffsetX) / 10) * 10)-100,
				goToX: (Math.round((mouseX-dragOffsetX) / 10) * 10)+200,
				moveY: 1,
				speedY: 1,
				goFromY: (Math.round((mouseY-dragOffsetY) / 10) * 10)-100,
				goToY: (Math.round((mouseY-dragOffsetY) / 10) * 10)+120
			}
		})
		selectedPlatID = plats.length-1;
		selectedMode = "plats";
		celectPlatSetting();
	},50)
})
//drag boost
document.querySelector("#boost").addEventListener("dragstart",(event)=>{
	dragOffsetX = event.offsetX;
	dragOffsetY = event.offsetY;
})
document.querySelector("#boost").addEventListener("dragend",(event)=>{
	setTimeout(()=>{
		plats.push({
			x: Math.round((mouseX-dragOffsetX) / 10) * 10,
			y: Math.round((mouseY-dragOffsetY) / 10) * 10,
			width: 100,
			height: 20,
			model: "boost",
			updated: 1,
			frame: 1,
			toBoost: 1,
			jump: 400
		})
		selectedPlatID = plats.length-1;
		selectedMode = "plats";
		celectPlatSetting();
	},50)
})
//drag plat
document.querySelector("#acid").addEventListener("dragstart",(event)=>{
	dragOffsetX = event.offsetX;
	dragOffsetY = event.offsetY;
})
document.querySelector("#acid").addEventListener("dragend",(event)=>{
	setTimeout(()=>{
		plats.push({
			x: Math.round((mouseX-dragOffsetX) / 10) * 10,
			y: Math.round((mouseY-dragOffsetY) / 10) * 10,
			width: 100,
			height: 20,
			model: "acid",
			toDie: 1
		})
		selectedPlatID = plats.length-1;
		selectedMode = "plats";
		celectPlatSetting();
	},50)
})
//drag portal
document.querySelector("#portal").addEventListener("dragstart",(event)=>{
	dragOffsetX = event.offsetX;
	dragOffsetY = event.offsetY;
})
document.querySelector("#portal").addEventListener("dragend",(event)=>{
	setTimeout(()=>{
		plats.push({
			x: Math.round((mouseX-dragOffsetX) / 10) * 10,
			y: Math.round((mouseY-dragOffsetY) / 10) * 10,
			width: 10,
			height: 100,
			toPort: 1,
			portObj: {
				portToX: (Math.round((mouseX-dragOffsetX) / 10) * 10)+200,
				portToY: (Math.round((mouseY-dragOffsetY) / 10) * 10)-100
			},
			model: "portal",
			frameTime: 1
		})
		selectedPlatID = plats.length-1;
		selectedMode = "plats";
		celectPlatSetting();
	},50)
})
//drag ramp
document.querySelector("#ramp").addEventListener("dragstart",(event)=>{
	dragOffsetX = event.offsetX;
	dragOffsetY = event.offsetY;
})
document.querySelector("#ramp").addEventListener("dragend",(event)=>{
	setTimeout(()=>{
		plats.push({
			x: Math.round((mouseX-dragOffsetX) / 10) * 10,
			y: Math.round((mouseY-dragOffsetY) / 10) * 10,
			width: 200,
			height: 50,
			model: "ramp",
			rampDir: 1
		})
		selectedPlatID = plats.length-1;
		selectedMode = "plats";
		celectPlatSetting();
	},50)
})
//drag greenZone
document.querySelector("#greenZone").addEventListener("dragstart",(event)=>{
	dragOffsetX = event.offsetX;
	dragOffsetY = event.offsetY;
})
document.querySelector("#greenZone").addEventListener("dragend",(event)=>{
	setTimeout(()=>{
		plats.push({
			x: Math.round((mouseX-dragOffsetX) / 10) * 10,
			y: Math.round((mouseY-dragOffsetY) / 10) * 10,
			width: 100,
			height: 100,
			model: "greenZone"
		})
		selectedPlatID = plats.length-1;
		selectedMode = "plats";
		celectPlatSetting();
	},50)
})




//drag gun
document.querySelector("#gunGun").addEventListener("dragstart",(event)=>{
	dragOffsetX = event.offsetX;
	dragOffsetY = event.offsetY;
})
document.querySelector("#gunGun").addEventListener("dragend",(event)=>{
	setTimeout(()=>{
		guns.push({
			 	x: Math.round((mouseX-dragOffsetX) / 10) * 10,
			 	y: Math.round((mouseY-dragOffsetY) / 10) * 10,
			 	width: 70,
			 	height: 17,
				name: "gun",
				takes: 1
		})
		selectedPlatID = guns.length-1;
		selectedMode = "guns";
		celectPlatSetting();
	},50)
})
//drag m4a4
document.querySelector("#gunM4a4").addEventListener("dragstart",(event)=>{
	dragOffsetX = event.offsetX;
	dragOffsetY = event.offsetY;
})
document.querySelector("#gunM4a4").addEventListener("dragend",(event)=>{
	setTimeout(()=>{
		guns.push({
			 	x: Math.round((mouseX-dragOffsetX) / 10) * 10,
			 	y: Math.round((mouseY-dragOffsetY) / 10) * 10,
			 	width: 70,
				height: 27,
				name: "m4a4",
				takes: 1
		})
		selectedPlatID = guns.length-1;
		selectedMode = "guns";
		celectPlatSetting();
	},50)
})
//drag Awp
document.querySelector("#gunAwp").addEventListener("dragstart",(event)=>{
	dragOffsetX = event.offsetX;
	dragOffsetY = event.offsetY;
})
document.querySelector("#gunAwp").addEventListener("dragend",(event)=>{
	setTimeout(()=>{
		guns.push({
			 	x: Math.round((mouseX-dragOffsetX) / 10) * 10,
			 	y: Math.round((mouseY-dragOffsetY) / 10) * 10,
			 	width: 115,
				height: 27,
				name: "awp",
				takes: 1
		})
		selectedPlatID = guns.length-1;
		selectedMode = "guns";
		celectPlatSetting();
	},50)
})





//drag spawn
document.querySelector("#spawn").addEventListener("dragstart",(event)=>{
	dragOffsetX = event.offsetX;
	dragOffsetY = event.offsetY;
})
document.querySelector("#spawn").addEventListener("dragend",(event)=>{
	setTimeout(()=>{
		spawns.push({
			x: Math.round((mouseX-dragOffsetX) / 10) * 10,
			y: Math.round((mouseY-dragOffsetY) / 10) * 10
		})
		selectedPlatID = spawns.length-1;
		selectedMode = "spawns";
		celectPlatSetting();
	},50)
})