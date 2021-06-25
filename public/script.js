//game duo shooters production Flecs1th
console.log('Game duo shooters production Flecs1th')

var canv = document.querySelector("#canvas");
canv.width = 2100;
canv.height = 1100;
var ctx = canv.getContext("2d");

ctx.mozImageSmoothingEnabled = false;
ctx.webkitImageSmoothingEnabled = false;
ctx.msImageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;

var tab = document.querySelector("#tab");
tab.width = 900;
tab.height = 500;
var ctx2 = tab.getContext("2d");



//hud----------------
var hudPing = document.querySelector("#ping");
var hudNotfLine = document.querySelector("#notificationsLine");
var hudTime = document.querySelector("#time");











//дефолтные текстуры
var pep = new Image();
var pep2 = new Image();
var vitia = new Image();
var vitia2 = new Image();
var gun = new Image();
var m4a4 = new Image();
var reloadImg = new Image();
var prompt = new Image();
var bullet = new Image();


pep.src = "img/main_model.png";
pep2.src = "img/main_model.png";
vitia.src = "img/vitia.png";
vitia2.src = "img/vitia2.png";
gun.src = "img/gun.png";
m4a4.src = "img/m4a4.png";
reloadImg.src = "img/reload.png";
prompt.src = "img/prompt.png";
bullet.src = "img/bullet.png";
//текстуры предметов
var model_plat = new Image();
var model_wall = new Image();
var model_box1 = new Image();
var model_box2 = new Image();
var model_box3 = new Image();
var model_box4 = new Image();
var model_magma = new Image();
var model_acid = new Image();

model_plat.src = "img/models/plat.png";
model_wall.src = "img/models/wall.png";
model_box1.src = "img/models/box1.jpg";
model_box2.src = "img/models/box2.jpg";
model_box3.src = "img/models/box3.jpg";
model_box4.src = "img/models/box4.jpg";
model_magma.src = "img/models/magma.png";
model_acid.src = "img/models/acid.png";

//текстуры анимации портала
var anim_portal1 = new Image();
var anim_portal2 = new Image();
var anim_portal3 = new Image();
anim_portal1.src = "img/models/portal/1.png";
anim_portal2.src = "img/models/portal/2.png";
anim_portal3.src = "img/models/portal/3.png";

//текстуры анимации батута
var anim_boost1 = new Image();
var anim_boost2 = new Image();
var anim_boost3 = new Image();
var anim_boost4 = new Image();
var anim_boost5 = new Image();
anim_boost1.src = "img/models/boost/1.png";
anim_boost2.src = "img/models/boost/2.png";
anim_boost3.src = "img/models/boost/3.png";
anim_boost4.src = "img/models/boost/4.png";
anim_boost5.src = "img/models/boost/5.png";


var sounds;
var gameEngineOperation;
var ping = null;
var devMode = 0;


//Позиция игрока
var xPos = 800;
var yPos = 800;
var persDir = 0;
var MINyPos = yPos;
var dead;
var spawnX;
var spawnY;
var nick = "";


//позиция камеры
var xCam;
var yCam;
var xSlide;
var ySlide;


//физические константы
var moveSpeed = 5;
var grav = 9.8;
var shotSpeed = 8;


//переменные времени
var roundTime;
var connTime;
var connTimeRange;
var stepTime = 0;
var gravTime = 0;
var deadTime = 0;


//переменные оружия и предметов
var takeWeapon = 0;
var mayTake = 0;
var takeWeaponDir = 0;
var reload = 0;
var take = 0;

//переменные расположения игрока
var direction = 0;
var directionKeyDown;
var jump = 0;
var barrierLeft = 0;
var barrierRight = 0;
var barrierLeftAll = 0;
var barrierRightAll = 0;
var onStay = 0;
var key = 0;
var onPlatformNum = null;
var onPlatformAll = 0;
var onPlatformCorrect = 0;
var underPlatform = 0;
var underPlatformAll = 0;


var viewTab = 0;
var stats = [];

var plats = [];
var tempPlats = [];
var guns = [];
var shots = [];
var enemys = [];
var notifications = [];



function pingChecker() {  
    var request = new XMLHttpRequest();
	var requestPing = new Date;
	var postAddress = location.origin+"/pingChecker"

	request.open('POST',postAddress);
	request.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
	request.send();

	request.onreadystatechange = function() {
		if(request.status == 200 && request.readyState == 4) {
	         requestPing = new Date - requestPing;
	         ping = requestPing;
	    }
	}
}

window.onkeydown = function(e) {
	if (dead != 1) {
		if (e.key === "A" || e.keyCode === 65)  {
	    	directionKeyDown = 3;
	        direction = 3;//left 
	        key = "A";
	        
	    }
	    if (e.key === "D" || e.keyCode === 68)  {
	        direction = 4;//right
	        directionKeyDown = 4;
	        key = "D";
	    }
	    if ((e.key === "Space" || e.keyCode === 32) && onStay == 1)  {
	        jump = 22;//jump
	        onStay = 0;
	        key = "Space";
	    }
	    if ((e.key === "Enter" || e.keyCode === 13) && reload == 0 && takeWeapon != 0)  {
	    	switch (takeWeapon) {
	    		case "gun":
	    			sendShotAdd();
	    			reload = 1;
			        setTimeout(function(){
			        	reload = 0;
			        },1000);
	    			break;
	    		case "m4a4":
	    			//режим стрельбы
	    			sendShotAdd("burst");
	    			reload = 1;
	    			//время перезарядки
			        setTimeout(function(){
			        	reload = 0;
			        },1500);
	    			break;
	    	} 
	        key = "Enter";
	    }
	    if ((e.key === "E" || e.keyCode === 69))  {
	       	take = 1;
	        key = "E";
	    }
	}
	if ((e.key === "Tab" || e.keyCode === 9))  {
        event.preventDefault();
        viewTab = 1;
    }
    if ((e.key === "`" || e.keyCode === 192))  {
        event.preventDefault();
        if (devMode == 0) {
        	devMode = 1;
        	canv.style.background = '#fff';
        }else {
        	devMode = 0;
        	canv.style.background = ''
        }
    }
}

window.onkeyup = function(e) {
	if (e.key === "A" || e.keyCode === 65)  {
		if (directionKeyDown != 4) {
			direction = 0;//left
		}
    }
    if (e.key === "D" || e.keyCode === 68)  {
        if (directionKeyDown != 3) {
			direction = 0;//right
		}
        
    }
    if ((e.key === "E" || e.keyCode === 69))  {
       	take = 0;
        key = "E";
    }
    if ((e.key === "Tab" || e.keyCode === 9))  {
    	event.preventDefault();
        viewTab = 0;
    }
}

function gravOn() {
	//Math.floor(moveSpeed*(jump/10))
	grav+=0.3;
	yPos += Math.floor(moveSpeed*(grav/10));//down
}

function camMove() {
	canv.style.transform = 'scale(1)';
	xCam = -(xPos-400);
	yCam = -(yPos-200);
	canv.style.left = xCam + "px";
	canv.style.top = yCam + "px";
}

function camCenter() {
	canv.style.transform = 'scale(0.42)';
	canv.style.left = -600 + "px";
	canv.style.top = -300 + "px";
}

// plats[999] = {
// 	x: enemy.x-3,
// 	y: enemy.y+3,
// 	width: 50,
// 	height: 100,
// 	human: 1
// }




function gameСycle() {
	if (onStay == 1) {
		grav = 9.8;
	}
	if(dead != 1) {
		camMove();
		//движение человека лево или право
		if (direction == 3 && xPos>0 && barrierLeft == 0) {
			persDir = 0;
			xPos -= moveSpeed;//left
			takeWeaponDir = 0;
		}
		if (direction == 4 && xPos + pep.width < canv.width && barrierRight == 0) {
			persDir = 1;
			xPos += moveSpeed;//right
			takeWeaponDir = 1;
		}
		//проверка на удор об потолок
		if(yPos<0) {
			underPlatform = 1;
		}

		//движение человека вверх или низ
		if (jump != 0 && underPlatform == 0) {
			yPos -= Math.floor(moveSpeed*(jump/10));//up
			jump --;
			grav = 9.8;
			if (MINyPos > yPos) {
				MINyPos = yPos+100;
			}
		}else if (onStay == 0){
			gravOn();
			jump = 0;
		}
		if (yPos == canv.height - pep.height) {
			if(onStay == 0) {
				onPlatformCorrect = 0;
			}
			if (onStay != 1) {
				sendSound("fall");
			}
			onStay = 1;
		}else if(yPos > canv.height - pep.height){
			yPos = canv.height - pep.height;
			if (onStay != 1) {
				sendSound("fall");
			}
			onStay = 1;
		}
		else {
			//платформа под ногой
			if (onPlatformAll == 1) {
				onStay = 1;	
			}else {
				onStay = 0;
				onPlatformNum = null;
				onPlatformCorrect = 0;
			}	
		}
		onPlatformAll = 0;
		underPlatformAll = 0;
		barrierLeftAll = 0;
		barrierRightAll = 0;
	} else {
		camCenter();
	}
	

	for (var i in plats) {		
		if (plats[i] === null) {
			continue;
		}

		if (plats[i].unStatic == 1) {
			//движение вместе с платформой, если мы на ней
			if (onPlatformNum == i && plats[i].moveObj.move != 0) {
				if (plats[i].moveObj.move == 1 && barrierRightAll == 0) {
					xPos += plats[i].moveObj.speed;
				}
				if (plats[i].moveObj.move == -1 && barrierLeftAll == 0) {
					xPos -= plats[i].moveObj.speed;
				}
			}
		}

		var g = 5;
		var j = 1;
		while(g != pep.width-5) {
			g++;
			//проверка на нахождение на платформе
			if (
				(
					(plats[i].x < xPos+pep.width)&&(plats[i].x+plats[i].width > xPos+pep.width)
					||
					(plats[i].x < xPos)&&(plats[i].x+plats[i].width > xPos)
					||
					(plats[i].x < xPos+g)&&(plats[i].x+plats[i].width > xPos+g)
				)
				&& 	
				(
					((yPos + pep.height+moveSpeed) > plats[i].y) && ((yPos+pep.height+moveSpeed) < (plats[i].y+plats[i].height))
				)
			) {
				
				{
					onPlatformAll = 1;
					onPlatformNum = i;
					if (onPlatformCorrect == 0) {
						onPlatformCorrect = 1;
						yPos = plats[i].y-pep.height-moveSpeed-1;
						//sendSound("fall");
					}
					//проверка на буст
					if(plats[i].toBoost == 1) {
						jump = 41;//jump
				        onStay = 0;
				        sendAnimation("boost",i)
				        break;
					}
				}
			}
			//проверка нахождения под платформой
			if(
				(
					(plats[i].x < xPos+pep.width)&&(plats[i].x+plats[i].width > xPos+pep.width)
					||
					(plats[i].x < xPos)&&(plats[i].x+plats[i].width > xPos)
					||
					(plats[i].x < xPos+g)&&(plats[i].x+plats[i].width > xPos+g)
				)
				&& 	
				(
					(yPos > plats[i].y) && (yPos < (plats[i].y+plats[i].height))
				)
			) {
				underPlatformAll = 1;
			}
		}
		while(j != plats[i].height) {
			j++;
				//проверка на движение вне платформы в лево
				if  (
						(
							(plats[i].x < xPos-moveSpeed)&&(plats[i].x+plats[i].width > xPos-moveSpeed)
						)
						&& 	
						(
							(plats[i].y+j > yPos) && (plats[i].y+j < yPos+pep.height-moveSpeed-2)
						) 			
					) {
					
					if (plats[i].toPort == 1) {
						xPos = plats[i].portObj.portToX;
						yPos = plats[i].portObj.portToY;
						var soundPortal = new Audio("sounds/portal.mp3");
						soundPortal.autoplay = true;
					}else {
						barrierLeftAll = 1;
						if (plats[i].unStatic == 1 && plats[i].moveObj.move != 0 && barrierRightAll == 0) {
							xPos += plats[i].moveObj.speed;
						}
					}
				}
				//проверка на движение вне платформы в право
				if  (		
						(
							(plats[i].x < xPos+pep.width+5)&&(plats[i].x+plats[i].width > xPos+pep.width+5)
						)
						&& 	
						(
							(plats[i].y+j > yPos) && (plats[i].y+j < yPos+pep.height-moveSpeed-2)
						)
						
					) {
					
					if (plats[i].toPort == 1) {
						xPos = plats[i].portObj.portToX;
						yPos = plats[i].portObj.portToY;
						var soundPortal = new Audio("sounds/portal.mp3");
						soundPortal.autoplay = true;
					} else {
						barrierRightAll = 1;
						if (plats[i].unStatic == 1 && plats[i].moveObj.move != 0 && barrierLeftAll == 0) {
							xPos -= plats[i].moveObj.speed;
						}
					}
				}
		}


		//под платформой
		if (underPlatformAll == 1) {
			underPlatform = 1;
		}else {
			underPlatform = 0;
		}
		//платформа с лева
		if (barrierLeftAll == 1) {
			barrierLeft = 1;
		}else {
			barrierLeft = 0;
		}
		//платформа с права
		if (barrierRightAll == 1) {
			barrierRight = 1;
		}else {
			barrierRight = 0;
		}	
	}//главный перебор платформ----------------------------

	//перебор массива уведомлений
	for(var n in notifications) {
		if (notifications[n] === null) {
			continue;
		}
		if (notifications[n].timeToDel < roundTime) {
			notifications.splice(n,1);
		}
	}

	if (gameEngineOperation == 1) {
		sendInfo();
		setTimeout(gameСycle,10)
	}
}//  закрытие gameСycle










function draw() {
	ctx.clearRect(0, 0, canv.width, canv.height);
	ctx2.clearRect(0, 0, tab.width, tab.height);
	

	//отрисовка платформ
	for (var i in plats) {
		if (plats[i] === null) {
			continue;
		}

		if (devMode == 1) {
			//отрисовка номеров платформ
			ctx.fillStyle = "#FF0400";
			ctx.font = "10px Verdana";
			ctx.fillText(i, plats[i].x+(plats[i].width/2), plats[i].y - 5);

			
			if(plats[i].toDie == 1) {
				ctx.fillStyle = "#E76224";
			}
			else if(plats[i].toPort == 1) {
				ctx.fillStyle = "#1AA160";
			}
			else if(plats[i].toBoost == 1) {
				ctx.fillStyle = "#BA55D3";
			}else {
				ctx.fillStyle = "#416D71";	
			}
			//дефолтный стиль отрисовка платформ
			ctx.fillRect(plats[i].x,plats[i].y,plats[i].width,plats[i].height);
		}else {
			//отрисовка текстур платформ
			switch (plats[i].model) {
				case "plats":
					if(plats[i].width > plats[i].height) {
						//отрисовка текстуры платформы
						if (plats[i].width > 100) {
							var t = 0; 
							var pltDrawX = plats[i].x;
							var pltDrawW = plats[i].width;
							while (t < Math.ceil(plats[i].width/100)) {
								t++;
								
								if(pltDrawW < 100) {
									ctx.drawImage(model_plat,pltDrawX,plats[i].y,pltDrawW,plats[i].height)
									break;
								}else {
									ctx.drawImage(model_plat,pltDrawX,plats[i].y,100,plats[i].height)
								}
								pltDrawX+=100;
								pltDrawW = (plats[i].width-(t*100));
							}
						}else {
							ctx.drawImage(model_plat,plats[i].x,plats[i].y,plats[i].width,plats[i].height)
						}
					}else {
						//отрисовка текстуры стены
						
						ctx.drawImage(model_wall,plats[i].x,plats[i].y,plats[i].width,plats[i].height)
						
					}
					break;
				case "box1":
					ctx.drawImage(model_box1,plats[i].x,plats[i].y,plats[i].width,plats[i].height)
					break;
				case "box2":
					ctx.drawImage(model_box2,plats[i].x,plats[i].y,plats[i].width,plats[i].height)
					break;
				case "box3":
					ctx.drawImage(model_box3,plats[i].x,plats[i].y,plats[i].width,plats[i].height)
					break;
				case "box4":
					ctx.drawImage(model_box4,plats[i].x,plats[i].y,plats[i].width,plats[i].height)
					break;
				case "magma":
					ctx.drawImage(model_magma,plats[i].x,plats[i].y,plats[i].width,plats[i].height)
					break;
				case "acid":
					ctx.drawImage(model_acid,plats[i].x,plats[i].y,plats[i].width,plats[i].height)
					break;
				case "portal":
					if (roundTime-plats[i].frameTime > 200) {
						ctx.drawImage(anim_portal3,plats[i].x-20,plats[i].y,50,plats[i].height)
						plats[i].frameTime = roundTime;
					}
					else if (roundTime-plats[i].frameTime > 100) {
						ctx.drawImage(anim_portal2,plats[i].x-20,plats[i].y,50,plats[i].height)
					}
					else if (roundTime-plats[i].frameTime > 0) {
						ctx.drawImage(anim_portal1,plats[i].x-20,plats[i].y,50,plats[i].height)
					}
					break;
				case "boost":
					switch (plats[i].frame) {
						case 1:
							ctx.drawImage(anim_boost1,plats[i].x,plats[i].y-70,100,90)
							break;
						case 2:
							ctx.drawImage(anim_boost2,plats[i].x,plats[i].y-70,100,90)
							break;
						case 3:
							ctx.drawImage(anim_boost3,plats[i].x,plats[i].y-70,100,90)
							break;
						case 4:
							ctx.drawImage(anim_boost4,plats[i].x,plats[i].y-70,100,90)
							break;
						case 5:
							ctx.drawImage(anim_boost5,plats[i].x,plats[i].y-70,100,90)
							break;
					}

					break;
			}
		}
	}
	//отрисовка пуль
	for (var s in shots) { 
		//отрисовка пуль
		if (shots[s] != null) {
			if (shots[s].dir == 1) {
				ctx.drawImage(bullet,shots[s].x,shots[s].y);
			}else {
				ctx.save();
	   			ctx.translate(shots[s].x,shots[s].y);
			    ctx.scale(-1,1);
	   			ctx.drawImage(bullet,0,0);
			    ctx.restore();
			}
		}
	}




		
	

	//отрисовка врагов
	for (var e in enemys) {
		if (enemys[e].dead != 1) {
			if (enemys[e].persDir == 1) {
				ctx.drawImage(vitia2,enemys[e].x,enemys[e].y);
			}
			if (enemys[e].persDir == 0) {
				ctx.save();
	   			ctx.translate(enemys[e].x+pep2.width,enemys[e].y);
			    ctx.scale(-1,1);
	   			ctx.drawImage(vitia2,0,0);
			    ctx.restore();
			}
			//отрисовка ника врага
			ctx.fillStyle = "#157E14";
			ctx.font = "10px PressStart2P";
			var tmpNickX = enemys[e].nick.length
			ctx.fillText(enemys[e].nick, enemys[e].xPos-tmpNickX, enemys[e].y-10);
			if(enemys[e].takeWeapon != 0) {
				if(enemys[e].takeWeapon == "gun") {
					if (enemys[e].persDir == 1) {
						ctx.drawImage(gun,enemys[e].x-10,enemys[e].y+55);
					}
					if (enemys[e].persDir == 0) {
						ctx.save();
			   			ctx.translate(enemys[e].x-10+gun.width,enemys[e].y+55);
					    ctx.scale(-1,1);
			   			ctx.drawImage(gun,0,0);
					    ctx.restore();
					}	
				}
				if(enemys[e].takeWeapon == "m4a4") {
					if (enemys[e].persDir == 1) {
						ctx.drawImage(m4a4,enemys[e].x-10,enemys[e].y+50);
					}
					if (enemys[e].persDir == 0) {
						ctx.save();
			   			ctx.translate(enemys[e].x-10+gun.width,enemys[e].y+50);
					    ctx.scale(-1,1);
			   			ctx.drawImage(m4a4,0,0);
					    ctx.restore();
					}	
				}
			}
		}
	}
	
	
	//отрисовка игрока
	if (dead != 1) {
		if (persDir == 1) {
			ctx.drawImage(vitia,xPos,yPos);
		}else if (persDir == 0) {
			ctx.save();
			ctx.translate(xPos+pep.width,yPos);
	    	ctx.scale(-1,1);
			ctx.drawImage(vitia,0,0);
	    	ctx.restore();
		}
		//отрисовка ника игрока
		ctx.fillStyle = "#157E14";
		ctx.font = "10px PressStart2P";
		var tmpNickX = nick.length
		ctx.fillText(nick, xPos-tmpNickX, yPos-10);
		//отрисовка оружия у игрока
		if (takeWeapon != 0) {
			switch (takeWeapon) {
				case "gun":
					if (persDir == 1) {
						ctx.drawImage(gun,xPos-10,yPos+55);
					}
					if (persDir == 0) {
						ctx.save();
			   			ctx.translate(xPos-10+gun.width,yPos+55);
					    ctx.scale(-1,1);
			   			ctx.drawImage(gun,0,0);
					    ctx.restore();
					}	
					break;
				case "m4a4":
					if (persDir == 1) {
						ctx.drawImage(m4a4,xPos-10,yPos+50);
					}
					if (persDir == 0) {
						ctx.save();
			   			ctx.translate(xPos-10+m4a4.width,yPos+50);
					    ctx.scale(-1,1);
			   			ctx.drawImage(m4a4,0,0);
					    ctx.restore();
					}	
					break;
			}	
		}
	}
	//отрисовка массива с оружиями
	for (var k in guns) {
		if (guns[k] == null) {
			continue;
		}
		mayTake = 0
		if (guns[k].takes != 1) {
			switch (guns[k].name) {
				case "gun":
					ctx.drawImage(gun,guns[k].x,guns[k].y);
					break;
				case "m4a4":
					ctx.drawImage(m4a4,guns[k].x,guns[k].y);
					break;
			}
			var gx = 1;
			while (gx != guns[k].width) {
				gx++;
				if (
						(
							(guns[k].x+gx > xPos)&&(guns[k].x+gx < xPos+pep.width)
						)
						&&
						(
							(guns[k].y < yPos+pep.height && guns[k].y > yPos)
						)
						&& takeWeapon != guns[k].name 
					) 
				{
					ctx.drawImage(prompt,xPos+pep.width+20,yPos-60);
					if (take == 1) {
						sendTake(takeWeapon,k);
						break;
					}
				}
			}
		}
	}

	
	if (reload == 1) {
		ctx.drawImage(reloadImg,xPos+5,yPos-45);
	}

	
	if (devMode == 1) {
		// рисование текста над игроком
		ctx.fillStyle = "#000";
		ctx.font = "10px Verdana";
		ctx.fillText("xPos: " + xPos, xPos, yPos-20);
		ctx.fillText("yPos: " + yPos, xPos, yPos-10);
		ctx.fillText("xCam: " + xCam, xPos, yPos-40);
		ctx.fillText("yCam: " + yCam, xPos, yPos-30);
		ctx.fillText("Time: " + roundTime, xPos, yPos-50);
		ctx.fillText("onPlatformAll: " + onPlatformAll, xPos, yPos-60);
		ctx.fillText("underPlatformAll: " + underPlatformAll, xPos, yPos-70);
		ctx.fillText("barrierLeftAll: " + barrierLeftAll, xPos, yPos-80);
		ctx.fillText("barrierRightAll: " + barrierRightAll, xPos, yPos-90);
		ctx.fillText("minY+100: " + MINyPos, xPos, yPos-100);
		ctx.fillText("grav: " + (Math.floor(moveSpeed*(grav/13))), xPos, yPos-110);
		ctx.fillStyle = "#4A8AF4";
		ctx.font = "40px Verdana";
		ctx.fillText("devMode", xPos-350, yPos-150);
	}

	if(dead == 1) {
		ctx.fillStyle = "rgba(74,138,244,0.5)";
		ctx.fillRect(0,0,canv.width,canv.height);
		ctx.font = "60px PressStart2P";
		ctx.fillStyle = "red";
		var deadMessageBox = Math.floor((roundTime - deadTime)/1000);
		ctx.fillText("Возрождение через "+(5-deadMessageBox), 500, 600);
		xPos = spawnX;
		yPos = spawnY; 
	}

	if(viewTab == 1) {
		tab.style.opacity = '1';
	}else {
		tab.style.opacity = '0';
	}
	ctx2.fillStyle = "#fff";
	ctx2.font = "20px PressStart2P";

	for(var t in stats) {
		var numT = Number(t)+1;
		
		ctx2.fillText("#"+numT+" "+stats[t].nick+"-"+stats[t].kills+"-"+stats[t].deads,200,200+(t*20));
	}

	var roundTimeStamp = new Date(roundTime);
	if (roundTimeStamp.getSeconds() < 10) {
		var roundTimeStampMinutesTmp = "0"+roundTimeStamp.getSeconds();
	}else {
		var roundTimeStampMinutesTmp = roundTimeStamp.getSeconds();
	}
	hudTime.innerHTML = roundTimeStamp.getMinutes()+":"+roundTimeStampMinutesTmp;





	if (gameEngineOperation == 1) {
		requestAnimationFrame(draw);
		//setTimeout(draw,10);
	}
}// закртие draw

//отрисовка интерфейса------------------------------------------------------------
setInterval(()=>{
	//отрисовка пинга
	if (ping != null) {
		if (ping > 100) {
			hudPing.style.color = "#FF0800";
		}else if (ping > 50) {
			hudPing.style.color = "#FFDB00";
		}else {
			hudPing.style.color = "#44FF2B";
		}
		hudPing.innerHTML = "Ping: "+ping;
	}

	//отрисовка уведомлений
	hudNotfLine.innerHTML = "";
	for(var n in notifications) {
		hudNotfLine.innerHTML += "<p>"+notifications[n].mes+"</p>";
	}
},500)























var HOST = location.origin.replace(/^http/, 'ws')

const ws = new WebSocket(HOST);

ws.onopen = () => {
	console.log('status: online');
	var inpNick = document.querySelector(".enterNick_text");
	var inpBut = document.querySelector(".enterNick_submit");
	inpNick.oninput = ()=>{
		if(inpNick.value != "") {
			inpBut.style.display = 'flex';
			inpBut.onclick = ()=>{
				nick = inpNick.value;
				document.querySelector(".enterNick").style.display = 'none';
				gameEngineOperation = 1;
				sendStartGame();
			}
		}else {
			inpBut.style.display = 'none';
		}
	}
};

ws.onclose = () => {
	console.log('status: disconnected');
	gameEngineOperation = 0;
};

ws.onmessage = response => {
	let res = JSON.parse(response.data);

	if (res.even == "START") {
		spawnX = res.spawnX;
		spawnY = res.spawnY;
		plats = res.plats;
		xPos = spawnX;
		yPos = spawnY;
		userID = res.id;
		roundTime = res.roundTime;
		takeWeapon = res.takeWeapon;
		console.log("UserID: "+userID);
		gameСycle();
		draw();
		pingChecker();
		setInterval(pingChecker,1000);
	}

	if (res.even == "UPDATE") {
		enemys = res.enemys;
		// for (var e in enemys) {
		// 	if (enemys[e].dead != 1) {
		// 		plats[enemys[e].platsNum] = {
		// 			x: enemys[e].x,
		// 			y: enemys[e].y+3,
		// 			width: 50,
		// 			height: 100,
		// 			human: 1
		// 		}
		// 	}
		// }
		spawnX = res.spawnX;
		spawnY = res.spawnY;
		shots = res.shots;
		guns = res.guns;
		takeWeapon = res.takeWeapon;
		dead = res.dead;
		deadTime = res.deadTime;
		tempPlats = res.tempPlats;
		stats = res.stats;
		for(var i in tempPlats) {
			var index = tempPlats[i].index;
			plats[index] = tempPlats[i].info;
		}
		roundTime = res.roundTime;
	}
	if (res.even == "NOTIFICATION") {
		var notfTimeToDel = roundTime+3000;
		notifications.push({
			mes: res.mes,
			timeToDel: notfTimeToDel
		})
	}
	if (res.even == "SOUNDS") {
		sounds = res.sounds;
		for(var s in sounds) {
			if (sounds[s].for == "all") {
				if (sounds[s].from == userID) {
					soundVolume = 1;
				}else {
					soundVolume = 0.3;
				}
			} else {
				soundVolume = 1;
			}
			switch (sounds[s].name) {
				case "shot":
					var soundItem = new Audio("sounds/shot.mp3");
					soundItem.volume = soundVolume;
					soundItem.autoplay = true;
					break;
				case "boost":
					var soundItem = new Audio("sounds/boost.mp3");
					soundItem.volume = soundVolume;
					soundItem.autoplay = true;
					break;
				case "hit":
					var soundItem = new Audio("sounds/hit.mp3");
					soundItem.volume = soundVolume;
					soundItem.autoplay = true;
					break;
				case "dead":
					var soundItem = new Audio("sounds/dead.mp3");
					soundItem.volume = soundVolume;
					soundItem.autoplay = true;
					break;
				case "dead":
					var soundItem = new Audio("sounds/dead.mp3");
					soundItem.volume = soundVolume;
					soundItem.autoplay = true;
					break;
				case "spawn":
					var soundItem = new Audio("sounds/spawn.mp3");
					soundItem.volume = soundVolume;
					soundItem.autoplay = true;
					break;
				// case "fall":
				// 	var soundItem = new Audio("sounds/fall.mp3");
				// 	soundItem.volume = soundVolume;
				// 	soundItem.autoplay = true;
				// 	break;
				case "take":
					var soundItem = new Audio("sounds/take.mp3");
					soundItem.volume = soundVolume;
					soundItem.autoplay = true;
					break;
			}	
		}
	}
}


//запрос на начало игры
function sendStartGame() {
	var userInfoStart = {
		even: "START",
		nick: nick
	}
	ws.send(JSON.stringify(userInfoStart));
}

//запрос на обновление данных сервера
function sendInfo() {
	var userInfoUpdate = {
		even: "UPDATE",
		id: userID,
		vars: {
			x: xPos,
			y: yPos,
			persDir: persDir,
			reload: reload
		}
	}
	ws.send(JSON.stringify(userInfoUpdate));
}

//запрос на воспроизведение звука
function sendSound(sound) {
	var userInfoTake = {
		even: "SOUND",
		id: userID,
		name: sound,
		for: "all",
		from: userID
	}
	ws.send(JSON.stringify(userInfoTake));
}

//запрос на подбор предмета
function sendTake(arg1,arg2) {
	var userInfoTake = {
		even: "TAKE",
		id: userID,
		take: arg1,
		takeId: arg2
	}
	ws.send(JSON.stringify(userInfoTake));
}
//запрос на анимацию платформы
function sendAnimation(arg1,arg2) {
	var userInfoAnimate = {
		even: "ANIMATE",
		animObj: arg1,
		animObjIndex: arg2
	}
	
	ws.send(JSON.stringify(userInfoAnimate));
}

//запрос на создание выстрелов
function sendShotAdd(shotMode) {
	switch (shotMode) {
		case "burst":
			if (takeWeaponDir == 1) {
				var shotX = xPos + 55
			}else {
				var shotX = xPos - 10
			}
			setTimeout(function(){
				sendShotAdd();
			},200)
			setTimeout(function(){
				sendShotAdd();
			},400)
			break;
		default:
			if (takeWeaponDir == 1) {
				var shotX = xPos + 55
			}else {
				var shotX = xPos - 10
			}
			break;
	}	

	userInfoShot = {
		even: "SHOT_ADD",
		id: userID,
		x: shotX,
		y: yPos+57,
		dir: takeWeaponDir
	}

	ws.send(JSON.stringify(userInfoShot));	
}


