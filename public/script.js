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



//hud----------------
var hudPing = document.querySelector("#ping");
var hudNotfLine = document.querySelector("#notificationsLine");
var hudTime = document.querySelector("#time");
var hudStatsTable = document.querySelector("#statsTable");
var hudStatsInner = document.querySelector(".stats__inner__update");
var hudQuests = document.querySelector(".quests");
var hudServerNotf = document.querySelector("#serverNotifications");









//дефолтные текстуры
var pep = new Image();
var pep2 = new Image();
var vitia = new Image();
var vitia2 = new Image();
var gun = new Image();
var m4a4 = new Image();
var awp = new Image();
var reloadImg = new Image();
var prompt = new Image();
var bullet = new Image();
var bulletLong = new Image();


pep.src = "img/main_model.png";
pep2.src = "img/main_model.png";
vitia.src = "img/vitia.png";
vitia2.src = "img/vitia2.png";
gun.src = "img/gun.png";
m4a4.src = "img/m4a4.png";
awp.src = "img/awp.png";
reloadImg.src = "img/reload.png";
prompt.src = "img/prompt.png";
bullet.src = "img/bullet.png";
bulletLong.src = "img/bulletLong.png";
//текстуры предметов
var model_plat = new Image();
var model_wall = new Image();
var model_box1 = new Image();
var model_box2 = new Image();
var model_box3 = new Image();
var model_box4 = new Image();
var model_magma = new Image();
var model_acid = new Image();
var model_ramp = new Image();
var model_ramp_left = new Image();

model_plat.src = "img/models/plat.png";
model_wall.src = "img/models/wall.png";
model_box1.src = "img/models/box1.jpg";
model_box2.src = "img/models/box2.jpg";
model_box3.src = "img/models/box3.jpg";
model_box4.src = "img/models/box4.jpg";
model_magma.src = "img/models/magma.png";
model_acid.src = "img/models/acid.png";
model_ramp.src = "img/models/ramp.png";
model_ramp_left.src = "img/models/ramp_left.png";

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

//текстуры анимации игрока
var anim_vitia1 = new Image();
var anim_vitia2 = new Image();
var anim_vitia3 = new Image();
var anim_vitia4 = new Image();
var anim_vitia5 = new Image();
var anim_vitia6 = new Image();
var anim_vitia7 = new Image();
var anim_vitia8 = new Image();
var anim_vitia9 = new Image();
var anim_vitia10 = new Image();
var anim_vitia11 = new Image();
var anim_vitia12 = new Image();
var anim_vitia13 = new Image();
var anim_vitia14 = new Image();
anim_vitia1.src = "img/models/vitia/1.png";
anim_vitia2.src = "img/models/vitia/2.png";
anim_vitia3.src = "img/models/vitia/3.png";
anim_vitia4.src = "img/models/vitia/4.png";
anim_vitia5.src = "img/models/vitia/5.png";
anim_vitia6.src = "img/models/vitia/6.png";
anim_vitia7.src = "img/models/vitia/7.png";
anim_vitia8.src = "img/models/vitia/8.png";
anim_vitia9.src = "img/models/vitia/9.png";
anim_vitia10.src = "img/models/vitia/10.png";
anim_vitia11.src = "img/models/vitia/11.png";
anim_vitia12.src = "img/models/vitia/12.png";
anim_vitia13.src = "img/models/vitia/13.png";
anim_vitia14.src = "img/models/vitia/14.png";

var anim_vitia_down = new Image();
anim_vitia_down.src = "img/models/vitia_jump/down.png";

var anim_vitia_jump1 = new Image();
var anim_vitia_jump2 = new Image();
var anim_vitia_jump3 = new Image();
var anim_vitia_jump4 = new Image();
var anim_vitia_jump5 = new Image();
var anim_vitia_jump6 = new Image();
var anim_vitia_jump7 = new Image();
var anim_vitia_jump8 = new Image();
anim_vitia_jump1.src = "img/models/vitia_jump/1.png";
anim_vitia_jump2.src = "img/models/vitia_jump/2.png";
anim_vitia_jump3.src = "img/models/vitia_jump/3.png";
anim_vitia_jump4.src = "img/models/vitia_jump/4.png";
anim_vitia_jump5.src = "img/models/vitia_jump/5.png";
anim_vitia_jump6.src = "img/models/vitia_jump/6.png";
anim_vitia_jump7.src = "img/models/vitia_jump/7.png";
anim_vitia_jump8.src = "img/models/vitia_jump/8.png";


//текстуры анимации противника
var anim_vitia_red1 = new Image();
var anim_vitia_red2 = new Image();
var anim_vitia_red3 = new Image();
var anim_vitia_red4 = new Image();
var anim_vitia_red5 = new Image();
var anim_vitia_red6 = new Image();
var anim_vitia_red7 = new Image();
var anim_vitia_red8 = new Image();
var anim_vitia_red9 = new Image();
var anim_vitia_red10 = new Image();
var anim_vitia_red11 = new Image();
var anim_vitia_red12 = new Image();
var anim_vitia_red13 = new Image();
var anim_vitia_red14 = new Image();
anim_vitia_red1.src = "img/models/vitia_red/1.png";
anim_vitia_red2.src = "img/models/vitia_red/2.png";
anim_vitia_red3.src = "img/models/vitia_red/3.png";
anim_vitia_red4.src = "img/models/vitia_red/4.png";
anim_vitia_red5.src = "img/models/vitia_red/5.png";
anim_vitia_red6.src = "img/models/vitia_red/6.png";
anim_vitia_red7.src = "img/models/vitia_red/7.png";
anim_vitia_red8.src = "img/models/vitia_red/8.png";
anim_vitia_red9.src = "img/models/vitia_red/9.png";
anim_vitia_red10.src = "img/models/vitia_red/10.png";
anim_vitia_red11.src = "img/models/vitia_red/11.png";
anim_vitia_red12.src = "img/models/vitia_red/12.png";
anim_vitia_red13.src = "img/models/vitia_red/13.png";
anim_vitia_red14.src = "img/models/vitia_red/14.png";

var anim_vitia_red_down = new Image();
anim_vitia_red_down.src = "img/models/vitia_red/down.png";




var persFrame = 1;
var persFrameVertical = 1;
var sounds;
var gameEngineOperation;
var ping = null;
var devMode = 0;
var continuousKills = 0;


//Позиция игрока
var xPos = 800;
var yPos = 800;
var persDir = 0;
var MINyPos = 5000;
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
var maxMoveSpeed = 19;
var grav = 9.8;
var shotSpeed = 8;


//переменные времени
var roundTime;
var connTime;
var connTimeRange;
var stepTime = 0;
var gravTime = 0;
var deadTime = 0;
var lastFallTime = 0;


//переменные оружия и предметов
var takeWeapon = 0;
var takeWeaponDir = 0;
var reload = 0;
var take = 0;

//переменные расположения игрока
var direction = 0;
var directionVertical = 0;
var directionKeyDown;
var jump = 0;
var jumpDiff = 0;
var barrierLeft = 0;
var barrierRight = 0;
var barrierLeftAll = 0;
var barrierRightAll = 0;
var onStay = 0;
var key = 0;
var onPlatformNum = null;
var onPlatformAll = 0;
var onPlatformCorrect = 0;
var underPlatformNum = null;
var underPlatform = 0;
var underPlatformAll = 0;
var onRamp = 0;

var stats = [];

var rooms = [
	{
		x: 1200,
		y: 680,
		width: 800,
		height: 450
	}
]	

var inRoomID = -1;

var plats = [];
var tempPlats = [];
var guns = [];
var shots = [];
var enemys = [];
var notifications = [];

var wildbeats = document.querySelector(".wildbeats");
document.querySelector(".soundState").onclick = ()=>{
	if (wildbeats.muted == false) {
		wildbeats.muted = true;
	}else {
		wildbeats.volume = false;
	}
}

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
	        jump = 120;//jump 
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
	    			sendShotAdd("m4a4");
	    			setTimeout(function(){
						sendShotAdd("m4a4");
					},200)
					setTimeout(function(){
						sendShotAdd("m4a4");
					},400)

	    			reload = 1;
	    			//время перезарядки
			        setTimeout(function(){
			        	reload = 0;
			        },1500);
	    			break;
	    		case "awp":
	    			//режим стрельбы
	    			sendShotAdd("awp");
	    			reload = 1;
	    			//время перезарядки
			        setTimeout(function(){
			        	reload = 0;
			        },3000);
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
        hudStatsTable.style.display = 'flex'
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
        hudStatsTable.style.display = 'none'
    }
}

function gravOn() {
	//Math.floor(moveSpeed*(jump/10))
	grav+=0.3;
	yPos += Math.floor(moveSpeed*(grav/10));//down
}

function jumpOn() {
	jumpDiff = Math.ceil(jump/7);
	if (jumpDiff >= maxMoveSpeed) {
		yPos -= maxMoveSpeed;//up
		jump -= maxMoveSpeed;
	}else {
		yPos -= jumpDiff;//up
		jump -= jumpDiff;
	}
	

	
	
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
		//проверка на удар об потолок
		if(yPos<0) {
			underPlatform = 1;
		}

		//движение человека вверх или низ
		if (jump > 0 && underPlatform == 0) {
			directionVertical = 1;
			jumpOn()
			grav = 9.8;
			
			if (MINyPos > yPos) {
				MINyPos = yPos;
			}
		}else if (onStay == 0){
			gravOn();
			jump = 0;
			directionVertical = 2;
			persFrameVertical = 1;
			onPlatformCorrect = 0;
		}
		if (yPos == canv.height - pep.height) {
			directionVertical = 0;
			if(onStay == 0) {
				onPlatformCorrect = 0;
			}
			if (onStay != 1) {
				sendSound("fall");
			}
			onStay = 1;
		}else if(yPos > canv.height - pep.height){
			directionVertical = 0;
			persFrameVertical = 1;
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
				directionVertical = 0;
				persFrameVertical = 1;
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
		onRamp = 0;
	} else {
		camCenter();
	}
	

	for (var i in plats) {		
		if (plats[i] === null || plats[i].model == "greenZone") {
			continue;
		}
		if (plats[i].unStatic == 1) {
			//движение вместе с платформой, если мы на ней
			if (onPlatformNum == i && plats[i].moveObj.moveX != 0) {
				if (plats[i].moveObj.moveX == 1 && barrierRightAll == 0) {
					xPos += plats[i].moveObj.speedX+0.06;

				}
				if (plats[i].moveObj.moveX == -1 && barrierLeftAll == 0) {
					xPos -= plats[i].moveObj.speedX+0.06;
				}
			}
			if (onPlatformNum == i && plats[i].moveObj.moveY != 0) {
				if (plats[i].moveObj.moveY == 1) {
					yPos += plats[i].moveObj.speedY+0.06;
				}
				if (plats[i].moveObj.moveY == -1 && underPlatformAll == 0) {
					yPos -= plats[i].moveObj.speedY+0.06;
				}
			}
		}

		var g = 1;
		var j = 1;
		while(g != pep.width) {
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
					((yPos + pep.height+2) > plats[i].y) && ((yPos+pep.height+2) < (plats[i].y+plats[i].height))
				)
			) {
				
				{	
					if (plats[i].toPort == 1) {
						xPos = plats[i].portObj.portToX;
						yPos = plats[i].portObj.portToY;
						var soundPortal = new Audio("sounds/portal.mp3");
						soundPortal.autoplay = true;
					}else {
						if (plats[i].model == "ramp") {
							var rampRate = plats[i].height/plats[i].width;
							if(plats[i].rampDir == 1){
								var rampDist = xPos+25-plats[i].x;
								if (rampDist>0 && rampDist<plats[i].width) {
									onRamp = 1;
									if(yPos+pep.height>=(plats[i].y+plats[i].height-10)-(rampDist*rampRate)) {
										onPlatformAll = 1;
										onPlatformNum = i;
										if (rampDist < 15) {
											yPos = (plats[i].y+plats[i].height-7)-(rampDist*rampRate)-pep.height;
										}else {
											yPos = (plats[i].y+plats[i].height-2)-(rampDist*rampRate)-pep.height;
										}
									}
								}
							}else {
								var rampDist = plats[i].x+plats[i].width-xPos-25;
								if (rampDist>0 && rampDist<plats[i].width) {
									onRamp = 1;
									if(yPos+pep.height>=(plats[i].y+plats[i].height-10)-(rampDist*rampRate)) {
										onPlatformAll = 1;
										onPlatformNum = i;
										if (rampDist < 15) {
											yPos = (plats[i].y+plats[i].height-7)-(rampDist*rampRate)-pep.height;
										}else {
											yPos = (plats[i].y+plats[i].height-2)-(rampDist*rampRate)-pep.height;
										}
									}
								}
							}
							break;
						}
						onPlatformAll = 1;
						onPlatformNum = i;
						if (onPlatformCorrect == 0) {
							onPlatformCorrect = 1;
							yPos = plats[i].y-pep.height;
							sendSound("fall");
						}
						//проверка на буст
						if(plats[i].toBoost == 1) {
							jump = plats[i].jump;//jump
					        onStay = 0;
					        sendAnimation("boost",i)
					        break;
						}
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
				if (plats[i].model == "ramp") {
					if(onRamp == 0) {
						underPlatformAll = 1;
						underPlatformNum = i;
					}
					break;
				}
				underPlatformAll = 1;
				underPlatformNum = i;
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
						if (plats[i].model == "ramp") {
							if(plats[i].rampDir == 1 && onRamp == 0) {
								barrierLeftAll = 1;
							}else {
								if ((yPos<plats[i].y+plats[i].height)&&(plats[i].y+plats[i].height<yPos+pep.height)) {
									barrierLeftAll = 1;
								}
							}
							break;
						}
						barrierLeftAll = 1;
						if (plats[i].unStatic == 1 && plats[i].moveObj.move != 0 && barrierRightAll == 0) {
							xPos += plats[i].moveObj.speedX;
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
						if (plats[i].model == "ramp") {
							if(plats[i].rampDir == -1 && onRamp == 0) {
								barrierRightAll = 1;
							}else {
								if ((yPos<plats[i].y+plats[i].height)&&(plats[i].y+plats[i].height<yPos+pep.height)) {
									barrierRightAll = 1;
								}
							}
							break;
						}
						barrierRightAll = 1;
						if (plats[i].unStatic == 1 && plats[i].moveObj.move != 0 && barrierLeftAll == 0) {
							xPos -= plats[i].moveObj.speedX;
						}
					}
				}
		}


		//под платформой
		if (underPlatformAll == 1) {
			underPlatform = 1;
			if (plats[i].unStatic == 1 && underPlatformNum == i) {
				xPos += 1;
			}
			if(onPlatformAll == 1 && barrierRightAll != 1 && onRamp == 0) {
				xPos += 1;
			}
		}else {
			underPlatform = 0;
		}
		//платформа с лева
		if (barrierLeftAll == 1 && onRamp == 0) {
			barrierLeft = 1;
		}else {
			barrierLeft = 0;
		}
		//платформа с права
		if (barrierRightAll == 1 && onRamp == 0) {
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
	

	//отрисовка платформ
	for (var i in plats) {
		if (plats[i] === null) {
			continue;
		}

		if (devMode == 1) {			
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
				case "ramp":
					if(plats[i].rampDir == 1){
						ctx.drawImage(model_ramp,plats[i].x,plats[i].y,plats[i].width,plats[i].height-10);
					}else {
						ctx.drawImage(model_ramp_left,plats[i].x,plats[i].y,plats[i].width,plats[i].height-10);
					}
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
				case "greenZone":
					ctx.fillStyle = "rgba(5,241,68,.2)";
					ctx.fillRect(plats[i].x,plats[i].y,plats[i].width,plats[i].height);
					break;
			}
		}
	}
	
	//отрисовка номеров платформ
	for(var i in plats) {
		if (devMode == 1) {
			ctx.fillStyle = "#FF0400";
			ctx.font = "10px Verdana";
			ctx.fillText(i, plats[i].x+(plats[i].width/2), plats[i].y - 5);
		}
	}
	//отрисовка врагов
	for (var e in enemys) {
		if (enemys[e].dead != 1) {
			if (enemys[e].directionVertical == 0) {
				if(enemys[e].direction != 0) {
					switch (enemys[e].persFrame) {
						case 1:
							if (enemys[e].persDir == 1) {
								ctx.drawImage(anim_vitia_red1,enemys[e].x,enemys[e].y);
							} else {
								ctx.save();
								ctx.translate(enemys[e].x+pep2.width,enemys[e].y);
						    	ctx.scale(-1,1);
								ctx.drawImage(anim_vitia_red1,0,0);
						    	ctx.restore();
							}
							break;
						case 2:
							if (enemys[e].persDir == 1) {
								ctx.drawImage(anim_vitia_red2,enemys[e].x,enemys[e].y);
							} else {
								ctx.save();
								ctx.translate(enemys[e].x+pep2.width,enemys[e].y);
						    	ctx.scale(-1,1);
								ctx.drawImage(anim_vitia_red2,0,0);
						    	ctx.restore();
							}
							break;
						case 3:
							if (enemys[e].persDir == 1) {
								ctx.drawImage(anim_vitia_red3,enemys[e].x,enemys[e].y);
							} else {
								ctx.save();
								ctx.translate(enemys[e].x+pep2.width,enemys[e].y);
						    	ctx.scale(-1,1);
								ctx.drawImage(anim_vitia_red3,0,0);
						    	ctx.restore();
							}
							break;
						case 4:
							if (enemys[e].persDir == 1) {
								ctx.drawImage(anim_vitia_red4,enemys[e].x,enemys[e].y);
							} else {
								ctx.save();
								ctx.translate(enemys[e].x+pep2.width,enemys[e].y);
						    	ctx.scale(-1,1);
								ctx.drawImage(anim_vitia_red4,0,0);
						    	ctx.restore();
							}
							break;
						case 5:
							if (enemys[e].persDir == 1) {
								ctx.drawImage(anim_vitia_red5,enemys[e].x,enemys[e].y);
							} else {
								ctx.save();
								ctx.translate(enemys[e].x+pep2.width,enemys[e].y);
						    	ctx.scale(-1,1);
								ctx.drawImage(anim_vitia_red5,0,0);
						    	ctx.restore();
							}
							break;
						case 6:
							if (enemys[e].persDir == 1) {
								ctx.drawImage(anim_vitia_red6,enemys[e].x,enemys[e].y);
							} else {
								ctx.save();
								ctx.translate(enemys[e].x+pep2.width,enemys[e].y);
						    	ctx.scale(-1,1);
								ctx.drawImage(anim_vitia_red6,0,0);
						    	ctx.restore();
							}
							break;
						case 7:
							if (enemys[e].persDir == 1) {
								ctx.drawImage(anim_vitia_red7,enemys[e].x,enemys[e].y);
							} else {
								ctx.save();
								ctx.translate(enemys[e].x+pep2.width,enemys[e].y);
						    	ctx.scale(-1,1);
								ctx.drawImage(anim_vitia_red7,0,0);
						    	ctx.restore();
							}
							break;
						case 8:
							if (enemys[e].persDir == 1) {
								ctx.drawImage(anim_vitia_red8,enemys[e].x,enemys[e].y);
							} else {
								ctx.save();
								ctx.translate(enemys[e].x+pep2.width,enemys[e].y);
						    	ctx.scale(-1,1);
								ctx.drawImage(anim_vitia_red8,0,0);
						    	ctx.restore();
							}
							break;
						case 9:
							if (enemys[e].persDir == 1) {
								ctx.drawImage(anim_vitia_red9,enemys[e].x,enemys[e].y);
							} else {
								ctx.save();
								ctx.translate(enemys[e].x+pep2.width,enemys[e].y);
						    	ctx.scale(-1,1);
								ctx.drawImage(anim_vitia_red9,0,0);
						    	ctx.restore();
							}
							break;
						case 10:
							if (enemys[e].persDir == 1) {
								ctx.drawImage(anim_vitia_red10,enemys[e].x,enemys[e].y);
							} else {
								ctx.save();
								ctx.translate(enemys[e].x+pep2.width,enemys[e].y);
						    	ctx.scale(-1,1);
								ctx.drawImage(anim_vitia_red10,0,0);
						    	ctx.restore();
							}
							break;
						case 11:
							if (enemys[e].persDir == 1) {
								ctx.drawImage(anim_vitia_red11,enemys[e].x,enemys[e].y);
							} else {
								ctx.save();
								ctx.translate(enemys[e].x+pep2.width,enemys[e].y);
						    	ctx.scale(-1,1);
								ctx.drawImage(anim_vitia_red11,0,0);
						    	ctx.restore();
							}
							break;
						case 12:
							if (enemys[e].persDir == 1) {
								ctx.drawImage(anim_vitia_red12,enemys[e].x,enemys[e].y);
							} else {
								ctx.save();
								ctx.translate(enemys[e].x+pep2.width,enemys[e].y);
						    	ctx.scale(-1,1);
								ctx.drawImage(anim_vitia_red12,0,0);
						    	ctx.restore();
							}
							break;
						case 13:
							if (enemys[e].persDir == 1) {
								ctx.drawImage(anim_vitia_red13,enemys[e].x,enemys[e].y);
							} else {
								ctx.save();
								ctx.translate(enemys[e].x+pep2.width,enemys[e].y);
						    	ctx.scale(-1,1);
								ctx.drawImage(anim_vitia_red13,0,0);
						    	ctx.restore();
							}
							break;
						case 14:
							if (enemys[e].persDir == 1) {
								ctx.drawImage(anim_vitia_red14,enemys[e].x,enemys[e].y);
							} else {
								ctx.save();
								ctx.translate(enemys[e].x+pep2.width,enemys[e].y);
						    	ctx.scale(-1,1);
								ctx.drawImage(anim_vitia_red14,0,0);
						    	ctx.restore();
							}
							break;
					}
				}else {
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
				}
			}else {
				if (enemys[e].persDir == 1) {
					ctx.drawImage(anim_vitia_red_down,enemys[e].x,enemys[e].y);
				}
				if (enemys[e].persDir == 0) {
					ctx.save();
		   			ctx.translate(enemys[e].x+pep2.width,enemys[e].y);
				    ctx.scale(-1,1);
		   			ctx.drawImage(anim_vitia_red_down,0,0);
				    ctx.restore();
				}
			}
			

			//отрисовка ника врага
			ctx.fillStyle = "#FA0018";
			ctx.font = "10px PressStart2P";
			var tmpNickX = enemys[e].nick;
			tmpNickX = tmpNickX.length*0.9;
			ctx.fillText(enemys[e].nick, enemys[e].x-tmpNickX, enemys[e].y-10);
			//отрисовка оружия врага
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
				if(enemys[e].takeWeapon == "awp") {
					if (enemys[e].persDir == 1) {
						ctx.drawImage(awp,enemys[e].x-20,enemys[e].y+43);
					}
					if (enemys[e].persDir == 0) {
						ctx.save();
			   			ctx.translate(enemys[e].x-47+awp.width,enemys[e].y+43);
					    ctx.scale(-1,1);
			   			ctx.drawImage(awp,0,0);
					    ctx.restore();
					}
				}

			}
		}
	}
	//отрисовка игрока
	if (dead != 1) {
		if (directionVertical == 0) {
			if(direction != 0) {
				switch (persFrame) {
					case 1:
						if (persDir == 1) {
							ctx.drawImage(anim_vitia1,xPos,yPos);
						} else {
							ctx.save();
							ctx.translate(xPos+pep.width,yPos);
					    	ctx.scale(-1,1);
							ctx.drawImage(anim_vitia1,0,0);
					    	ctx.restore();
						}
						break;
					case 2:
						if (persDir == 1) {
							ctx.drawImage(anim_vitia2,xPos,yPos);
						} else {
							ctx.save();
							ctx.translate(xPos+pep.width,yPos);
					    	ctx.scale(-1,1);
							ctx.drawImage(anim_vitia2,0,0);
					    	ctx.restore();
						}
						break;
					case 3:
						if (persDir == 1) {
							ctx.drawImage(anim_vitia3,xPos,yPos);
						} else {
							ctx.save();
							ctx.translate(xPos+pep.width,yPos);
					    	ctx.scale(-1,1);
							ctx.drawImage(anim_vitia3,0,0);
					    	ctx.restore();
						}
						break;
					case 4:
						if (persDir == 1) {
							ctx.drawImage(anim_vitia4,xPos,yPos);
						} else {
							ctx.save();
							ctx.translate(xPos+pep.width,yPos);
					    	ctx.scale(-1,1);
							ctx.drawImage(anim_vitia4,0,0);
					    	ctx.restore();
						}
						break;
					case 5:
						if (persDir == 1) {
							ctx.drawImage(anim_vitia5,xPos,yPos);
						} else {
							ctx.save();
							ctx.translate(xPos+pep.width,yPos);
					    	ctx.scale(-1,1);
							ctx.drawImage(anim_vitia5,0,0);
					    	ctx.restore();
						}
						break;
					case 6:
						if (persDir == 1) {
							ctx.drawImage(anim_vitia6,xPos,yPos);
						} else {
							ctx.save();
							ctx.translate(xPos+pep.width,yPos);
					    	ctx.scale(-1,1);
							ctx.drawImage(anim_vitia6,0,0);
					    	ctx.restore();
						}
						break;
					case 7:
						if (persDir == 1) {
							ctx.drawImage(anim_vitia7,xPos,yPos);
						} else {
							ctx.save();
							ctx.translate(xPos+pep.width,yPos);
					    	ctx.scale(-1,1);
							ctx.drawImage(anim_vitia7,0,0);
					    	ctx.restore();
						}
						break;
					case 8:
						if (persDir == 1) {
							ctx.drawImage(anim_vitia8,xPos,yPos);
						} else {
							ctx.save();
							ctx.translate(xPos+pep.width,yPos);
					    	ctx.scale(-1,1);
							ctx.drawImage(anim_vitia8,0,0);
					    	ctx.restore();
						}
						break;
					case 9:
						if (persDir == 1) {
							ctx.drawImage(anim_vitia9,xPos,yPos);
						} else {
							ctx.save();
							ctx.translate(xPos+pep.width,yPos);
					    	ctx.scale(-1,1);
							ctx.drawImage(anim_vitia9,0,0);
					    	ctx.restore();
						}
						break;
					case 10:
						if (persDir == 1) {
							ctx.drawImage(anim_vitia10,xPos,yPos);
						} else {
							ctx.save();
							ctx.translate(xPos+pep.width,yPos);
					    	ctx.scale(-1,1);
							ctx.drawImage(anim_vitia10,0,0);
					    	ctx.restore();
						}
						break;
					case 11:
						if (persDir == 1) {
							ctx.drawImage(anim_vitia11,xPos,yPos);
						} else {
							ctx.save();
							ctx.translate(xPos+pep.width,yPos);
					    	ctx.scale(-1,1);
							ctx.drawImage(anim_vitia11,0,0);
					    	ctx.restore();
						}
						break;
					case 12:
						if (persDir == 1) {
							ctx.drawImage(anim_vitia12,xPos,yPos);
						} else {
							ctx.save();
							ctx.translate(xPos+pep.width,yPos);
					    	ctx.scale(-1,1);
							ctx.drawImage(anim_vitia12,0,0);
					    	ctx.restore();
						}
						break;
					case 13:
						if (persDir == 1) {
							ctx.drawImage(anim_vitia13,xPos,yPos);
						} else {
							ctx.save();
							ctx.translate(xPos+pep.width,yPos);
					    	ctx.scale(-1,1);
							ctx.drawImage(anim_vitia13,0,0);
					    	ctx.restore();
						}
						break;
					case 14:
						if (persDir == 1) {
							ctx.drawImage(anim_vitia14,xPos,yPos);
						} else {
							ctx.save();
							ctx.translate(xPos+pep.width,yPos);
					    	ctx.scale(-1,1);
							ctx.drawImage(anim_vitia14,0,0);
					    	ctx.restore();
						}
						break;
				}
				if(persFrame != 14) {
					persFrame++;
				}else {
					persFrame = 1;
				}
			}else {
				if (persDir == 1) {
					ctx.drawImage(vitia,xPos,yPos);
				}else if (persDir == 0) {
					ctx.save();
					ctx.translate(xPos+pep.width,yPos);
			    	ctx.scale(-1,1);
					ctx.drawImage(vitia,0,0);
			    	ctx.restore();
				}
			}
		}else if(directionVertical == 1){
			switch (persFrameVertical) {
					case 1:
						if (persDir == 1) {
							ctx.drawImage(anim_vitia_jump1,xPos,yPos);
						}else {
							ctx.save();
							ctx.translate(xPos+pep.width,yPos);
					    	ctx.scale(-1,1);
							ctx.drawImage(anim_vitia_jump1,0,0);
					    	ctx.restore();
						}
						break;
					case 1.5:
						if (persDir == 1) {
							ctx.drawImage(anim_vitia_jump1,xPos,yPos);
						}else {
							ctx.save();
							ctx.translate(xPos+pep.width,yPos);
					    	ctx.scale(-1,1);
							ctx.drawImage(anim_vitia_jump1,0,0);
					    	ctx.restore();
						}
						break;
					case 2:
						if (persDir == 1) {
							ctx.drawImage(anim_vitia_jump2,xPos,yPos);
						}else {
							ctx.save();
							ctx.translate(xPos+pep.width,yPos);
					    	ctx.scale(-1,1);
							ctx.drawImage(anim_vitia_jump2,0,0);
					    	ctx.restore();
						}
						break;
					case 2.5:
						if (persDir == 1) {
							ctx.drawImage(anim_vitia_jump2,xPos,yPos);
						}else {
							ctx.save();
							ctx.translate(xPos+pep.width,yPos);
					    	ctx.scale(-1,1);
							ctx.drawImage(anim_vitia_jump2,0,0);
					    	ctx.restore();
						}
						break;
					case 3:
						if (persDir == 1) {
							ctx.drawImage(anim_vitia_jump3,xPos,yPos);
						}else {
							ctx.save();
							ctx.translate(xPos+pep.width,yPos);
					    	ctx.scale(-1,1);
							ctx.drawImage(anim_vitia_jump3,0,0);
					    	ctx.restore();
						}
						break;
					case 3.5:
						if (persDir == 1) {
							ctx.drawImage(anim_vitia_jump3,xPos,yPos);
						}else {
							ctx.save();
							ctx.translate(xPos+pep.width,yPos);
					    	ctx.scale(-1,1);
							ctx.drawImage(anim_vitia_jump3,0,0);
					    	ctx.restore();
						}
						break;
					case 4:
						if (persDir == 1) {
							ctx.drawImage(anim_vitia_jump4,xPos,yPos);
						}else {
							ctx.save();
							ctx.translate(xPos+pep.width,yPos);
					    	ctx.scale(-1,1);
							ctx.drawImage(anim_vitia_jump4,0,0);
					    	ctx.restore();
						}
						break;
					case 4.5:
						if (persDir == 1) {
							ctx.drawImage(anim_vitia_jump4,xPos,yPos);
						}else {
							ctx.save();
							ctx.translate(xPos+pep.width,yPos);
					    	ctx.scale(-1,1);
							ctx.drawImage(anim_vitia_jump4,0,0);
					    	ctx.restore();
						}
						break;
					case 5:
						if (persDir == 1) {
							ctx.drawImage(anim_vitia_jump5,xPos,yPos);
						}else {
							ctx.save();
							ctx.translate(xPos+pep.width,yPos);
					    	ctx.scale(-1,1);
							ctx.drawImage(anim_vitia_jump5,0,0);
					    	ctx.restore();
						}
						break;
					case 5.5:
						if (persDir == 1) {
							ctx.drawImage(anim_vitia_jump5,xPos,yPos);
						}else {
							ctx.save();
							ctx.translate(xPos+pep.width,yPos);
					    	ctx.scale(-1,1);
							ctx.drawImage(anim_vitia_jump5,0,0);
					    	ctx.restore();
						}
						break;
					case 6:
						if (persDir == 1) {
							ctx.drawImage(anim_vitia_jump6,xPos,yPos);
						}else {
							ctx.save();
							ctx.translate(xPos+pep.width,yPos);
					    	ctx.scale(-1,1);
							ctx.drawImage(anim_vitia_jump6,0,0);
					    	ctx.restore();
						}
						break;
					case 6.5:
						if (persDir == 1) {
							ctx.drawImage(anim_vitia_jump6,xPos,yPos);
						}else {
							ctx.save();
							ctx.translate(xPos+pep.width,yPos);
					    	ctx.scale(-1,1);
							ctx.drawImage(anim_vitia_jump6,0,0);
					    	ctx.restore();
						}
						break;
					case 7:
						if (persDir == 1) {
							ctx.drawImage(anim_vitia_jump7,xPos,yPos);
						}else {
							ctx.save();
							ctx.translate(xPos+pep.width,yPos);
					    	ctx.scale(-1,1);
							ctx.drawImage(anim_vitia_jump7,0,0);
					    	ctx.restore();
						}
						break;
					case 7.5:
						if (persDir == 1) {
							ctx.drawImage(anim_vitia_jump7,xPos,yPos);
						}else {
							ctx.save();
							ctx.translate(xPos+pep.width,yPos);
					    	ctx.scale(-1,1);
							ctx.drawImage(anim_vitia_jump7,0,0);
					    	ctx.restore();
						}
						break;
					case 8:
						if (persDir == 1) {
							ctx.drawImage(anim_vitia_jump8,xPos,yPos);
						}else {
							ctx.save();
							ctx.translate(xPos+pep.width,yPos);
					    	ctx.scale(-1,1);
							ctx.drawImage(anim_vitia_jump8,0,0);
					    	ctx.restore();
						}
						break;
			}
			if(persFrameVertical != 8) {
				persFrameVertical+=0.5;
			}
		}else if(directionVertical == 2){
			if (persDir == 1) {
					ctx.drawImage(anim_vitia_down,xPos,yPos);
				}else if (persDir == 0) {
					ctx.save();
					ctx.translate(xPos+pep.width,yPos);
			    	ctx.scale(-1,1);
					ctx.drawImage(anim_vitia_down,0,0);
			    	ctx.restore();
				}
		}
		//отрисовка оружия у игрока
		if (takeWeapon != 0) {
			if (persFrame == 7 ) {
				var cwy = -1;
			}else if (persFrame == 8){
				var cwy = -2;
			}else if (persFrame == 9){
				var cwy = -1;
			}else {
				var cwy = 0;
			}
			switch (takeWeapon) {
				case "gun":
					if (persDir == 1) {
						ctx.drawImage(gun,xPos-10,yPos+55+cwy);
					}
					if (persDir == 0) {
						ctx.save();
			   			ctx.translate(xPos-10+gun.width,yPos+55+cwy);
					    ctx.scale(-1,1);
			   			ctx.drawImage(gun,0,0);
					    ctx.restore();
					}	
					break;
				case "m4a4":
					if (persDir == 1) {
						ctx.drawImage(m4a4,xPos-10,yPos+50+cwy);
					}
					if (persDir == 0) {
						ctx.save();
			   			ctx.translate(xPos-10+m4a4.width,yPos+50+cwy);
					    ctx.scale(-1,1);
			   			ctx.drawImage(m4a4,0,0);
					    ctx.restore();
					}	
					break;
				case "awp":
					if (persDir == 1) {
						ctx.drawImage(awp,xPos-20,yPos+43+cwy);
					}
					if (persDir == 0) {
						ctx.save();
			   			ctx.translate(xPos-47+awp.width,yPos+43+cwy);
					    ctx.scale(-1,1);
			   			ctx.drawImage(awp,0,0);
					    ctx.restore();
					}	
					break;
			}	
		}
	}
	//отрисовка лежачего с оружиями
	for (var k in guns) {
		if (guns[k] == null) {
			continue;
		}
		if (guns[k].takes != 1) {
			switch (guns[k].name) {
				case "gun":
					ctx.drawImage(gun,guns[k].x,guns[k].y);
					break;
				case "m4a4":
					ctx.drawImage(m4a4,guns[k].x,guns[k].y);
					break;
				case "awp":
					ctx.drawImage(awp,guns[k].x,guns[k].y);
									//текст над авиком
									ctx.font = "8px PressStart2P";
									
									ctx.fillStyle = "#FB6523";
									ctx.fillText("Я знаю ты хочешь меня",guns[k].x-20, guns[k].y-5);
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
						take = 0;
						sendTake(takeWeapon,k);
						break;
					}
				}else if (continuousKills > 4 && takeWeapon != "awp") {
					//отрисовка возможности взять авик
					ctx.drawImage(prompt,xPos+pep.width+20,yPos-60);
					if (take == 1) {
						take = 0;
						sendTake(takeWeapon,2);
						break;
					}
				}
			}
		}
	}
	//отрисовка пуль
	for (var s in shots) { 
		//отрисовка пуль
		if (shots[s] != null) {
			switch (shots[s].type) {
				case "default":
					if (shots[s].dir == 1) {
						ctx.drawImage(bullet,shots[s].x,shots[s].y);
					}else {
						ctx.save();
			   			ctx.translate(shots[s].x,shots[s].y);
					    ctx.scale(-1,1);
			   			ctx.drawImage(bullet,0,0);
					    ctx.restore();
					}
					break
				case "through":
					if (shots[s].dir == 1) {
						ctx.drawImage(bulletLong,shots[s].x,shots[s].y);
					}else {
						ctx.save();
			   			ctx.translate(shots[s].x,shots[s].y);
					    ctx.scale(-1,1);
			   			ctx.drawImage(bulletLong,0,0);
					    ctx.restore();
					}
					break
			}
		}
	}
	
	if (reload == 1) {
		ctx.drawImage(reloadImg,xPos+5,yPos-45);
	}
	
	// inRoomID = -1;
	// for (var r in rooms) {
	// 	if (
	// 		((rooms[r].x<xPos+25)&&(xPos+25<rooms[r].x+rooms[r].width))
	// 		&&
	// 		((rooms[r].y<yPos+25)&&(yPos+25<rooms[r].y+rooms[r].height))
	// 	) {
	// 		inRoomID = r;

	// 		ctx.fillStyle = "#000";
	// 		ctx.beginPath();
	// 		ctx.moveTo(0,0);
	// 		ctx.lineTo(rooms[r].x,rooms[r].y);
	// 		ctx.lineTo(rooms[r].x+rooms[r].width,rooms[r].y);
	// 		ctx.lineTo(canv.width,0);
	// 		ctx.fill();

	// 		ctx.beginPath();
	// 		ctx.moveTo(canv.width,0);
	// 		ctx.lineTo(rooms[r].x+rooms[r].width,rooms[r].y);
	// 		ctx.lineTo(rooms[r].x+rooms[r].width,rooms[r].y+rooms[r].height);
	// 		ctx.lineTo(canv.width,canv.height);
	// 		ctx.fill();

	// 		ctx.beginPath();
	// 		ctx.moveTo(canv.width,canv.height);
	// 		ctx.lineTo(rooms[r].x+rooms[r].width,rooms[r].y+rooms[r].height);
	// 		ctx.lineTo(rooms[r].x,rooms[r].y+rooms[r].height);
	// 		ctx.lineTo(0,canv.height);
	// 		ctx.fill();

	// 		ctx.beginPath();
	// 		ctx.moveTo(0,canv.height);
	// 		ctx.lineTo(rooms[r].x,rooms[r].y+rooms[r].height);
	// 		ctx.lineTo(rooms[r].x,rooms[r].y);
	// 		ctx.lineTo(0,0);
	// 		ctx.fill();
	// 	}
	// 	if (inRoomID == r) {
	// 		continue;
	// 	}else {
	// 		ctx.fillStyle = "#000";
	// 		ctx.beginPath();
	// 		ctx.moveTo(rooms[r].x,rooms[r].y);
	// 		ctx.lineTo(rooms[r].x+rooms[r].width,rooms[r].y);
	// 		ctx.lineTo(rooms[r].x+rooms[r].width,rooms[r].y+rooms[r].height);
	// 		ctx.lineTo(rooms[r].x,rooms[r].y+rooms[r].height)
	// 		ctx.fill();
	// 	}

	// }

	
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
		ctx.fillText("onRamp: " + onRamp, xPos, yPos-120);
		ctx.fillStyle = "#4A8AF4";
		ctx.font = "40px Verdana";
		ctx.fillText("devMode", xPos-350, yPos-150);
	}else {
		//отрисовка ника игрока
		ctx.fillStyle = "#157E14";
		ctx.font = "10px PressStart2P";
		var tmpNickX = nick.length*0.9
		ctx.fillText(nick, xPos-tmpNickX, yPos-10);
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

	//вывод игровой статистики
	hudStatsInner.innerHTML = "";
	hudStatsInner.innerHTML += "<tr> <th>Num</th><th>Nick</th><th>Kills</th><th>Deads</th><th>Ping</th> </tr>";
	for(var t in stats) {
		var numT = Number(t)+1;
		hudStatsInner.innerHTML += "<tr> <td class='td__num'>"+"#"+numT+"</td><td class='td__nick'>"+stats[t].nick+"</td><td>"+stats[t].kills+"</td><td>"+stats[t].deads+"</td><td>"+stats[t].ping+"</td> </tr>";
	}

	//отрисовка квестов
	hudQuests.innerHTML = "";
	hudQuests.innerHTML += "<p/ class='quest__item'>Сделай ещё "+(5-continuousKills)+" килов, не умирая, что бы получить AWP</p>";
	//отрисовка временя раунда
	var roundTimeStamp = new Date(roundTime);
	if (roundTimeStamp.getSeconds() < 10) {
		var roundTimeStampMinutesTmp = "0"+roundTimeStamp.getSeconds();
	}else {
		var roundTimeStampMinutesTmp = roundTimeStamp.getSeconds();
	}
	hudTime.innerHTML = roundTimeStamp.getMinutes()+":"+roundTimeStampMinutesTmp;





	if (gameEngineOperation == 1) {
		requestAnimationFrame(draw);
	}
}// закртие draw

//отрисовка интерфейса------------------------------------------------------------
setInterval(()=>{
	if (gameEngineOperation == 1) {
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
		hudServerNotf.innerHTML = "";
		for(var n in notifications) {
			switch (notifications[n].from) {
				case "server":
					hudServerNotf.innerHTML += "<p>"+notifications[n].mes+"</p>";
					break;
				case "user":
					hudNotfLine.innerHTML += "<p>"+notifications[n].mes+"</p>";
					break;
			}
		}
	}
},500)























var HOST = location.origin.replace(/^http/, 'ws')

var ws;
function WSconnect() {
	ws = new WebSocket(HOST);

	ws.onopen = () => {
		console.log('status: online');
		if(nick == 0) {
			var enterNickForm = document.querySelector(".enterNick");
			var inpNick = document.querySelector(".enterNick_text");
			var inpBut = document.querySelector(".enterNick_submit");
			inpNick.oninput = ()=>{
				if(inpNick.value != "") {
					inpBut.style.display = 'flex';
					inpBut.onclick = ()=>{
						nick = inpNick.value;
						enterNickForm.style.display = 'none';
						gameEngineOperation = 1;
						sendStartGame();
					}
				}else {
					inpBut.style.display = 'none';
				}
			}
		}else {
			gameEngineOperation = 1;
			sendStartGame();
		}
		
	};

	ws.onclose = () => {
		console.log('status: disconnected');
		gameEngineOperation = 0;
		notifications = [];
		setTimeout(()=>{
			WSconnect();
			console.log('try to reconect')
		},1000)
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
			canv.width = res.canv.width;
			canv.height = res.canv.height;
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
			continuousKills = res.continuousKills;
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
			var notfTimeToDel = roundTime+5000;
			notifications.push({
				mes: res.mes,
				from: res.from,
				timeToDel: notfTimeToDel
			})
		}
		if (res.even == "CORD") {
			xPos = res.x;
			yPos = res.y;
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
					case "shotAwp":
						var soundItem = new Audio("sounds/shotAwp.mp3");
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
					case "overtime":
						var soundItem = new Audio("sounds/overtime.mp3");
						soundItem.volume = soundVolume;
						soundItem.autoplay = true;
						break;
					// case "fall":
					// 	if(roundTime - lastFallTime > 300) {
					// 		var soundItem = new Audio("sounds/fall.mp3");
					// 		soundItem.volume = soundVolume;
					// 		soundItem.autoplay = true;
					// 		lastFallTime = roundTime;
					// 	}
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
}//WSconnect exit

WSconnect()
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
			direction: direction,
			directionVertical: directionVertical,
			persFrame: persFrame,
			reload: reload,
			ping: ping
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
		case "m4a4":
			if (takeWeaponDir == 1) {
				var shotX = xPos + 55
			}else {
				var shotX = xPos - 10
			}
			var bullType = "default"
			var bullY = yPos+57;
			break;
		case "awp":
			if (takeWeaponDir == 1) {
				var shotX = xPos + 90
			}else {
				var shotX = xPos - 40
			}
			var bullType = "through"
			var bullY = yPos+53;
			break;
		default:
			if (takeWeaponDir == 1) {
				var shotX = xPos + 50
			}else {
				var shotX = xPos - 10
			}
			var bullType = "default"
			var bullY = yPos+57;
			break;
	}	

	userInfoShot = {
		even: "SHOT_ADD",
		id: userID,
		x: shotX,
		y: bullY,
		dir: takeWeaponDir,
		type: bullType
	}

	ws.send(JSON.stringify(userInfoShot));	
}

window.onload = function () {
	//Preloader
    var preloader = document.querySelector("#page-preloader");
	setTimeout(()=>{
		preloader.style.opacity = "0.9";
	},20)
	setTimeout(()=>{
		preloader.style.opacity = "0.8";
	},40)
	setTimeout(()=>{
		preloader.style.opacity = "0.7";
	},60)
	setTimeout(()=>{
		preloader.style.opacity = "0.6";
	},80)
	setTimeout(()=>{
		preloader.style.opacity = "0.5";
	},100)
	setTimeout(()=>{
		preloader.style.opacity = "0.4";
	},120)
	setTimeout(()=>{
		preloader.style.opacity = "0.3";
	},140)
	setTimeout(()=>{
		preloader.style.opacity = "0.2";
	},160)
	setTimeout(()=>{
		preloader.style.opacity = "0.1";
	},180)
	setTimeout(()=>{
		preloader.style.opacity = "0";
		preloader.style.display = 'none';
	},200)
    
}



