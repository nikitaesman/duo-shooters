const chalk = require('chalk')
const http = require('http')
const fs = require('fs')
const path = require('path')

const server = http.createServer( (req, res) => {

	
	if(req.method == "GET") {
		let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url)
	
		fs.readFile(filePath, (err, content) => {
			if(err) {
				fs.readFile(path.join(__dirname, 'public', 'error.html'), (err, data) => {
					if (err) {
						res.writeHead(500)
						res.end('Error')
					} else {
						res.writeHead(200, {
							'Content-Type': 'text/html'
						})
						res.end(data)
					}
				})
			} else {
				res.writeHead(200, {
					'Content-Type': 'text/html'
				})
				res.end(content)
			}
		})
	}
	if (req.method == "POST") {

	}

	

	
	
})

const PORT = process.env.PORT || 3000;

server.listen(PORT, ()=>{
	console.log(chalk.bgGreen('Server has been started on '+PORT+'...'))
})


var spawns = []
spawns[1] = {
	x: 1300,
	y: 980
}
spawns[2] = {
	x: 1800,
	y: 980
}
spawns[3] = {
	x: 1800,
	y: 750
}
spawns[4] = {
	x: 1300,
	y: 750
}
spawns[5] = {
	x: 1500,
	y: 850
}
var playersCount = 0
var players = []
var guns = []
var plats = []
var shots = []
var sounds = []
var stats = []
var roundTime = 0
var canv = {
	width: 2100,
	height:  1100
};


setInterval(function(){
	roundTime+=10
	serverMoves()

},10)

//физические константы
var moveSpeed = 5;
var grav = 5;
var shotSpeed = 8;


//создание платформ
plats[0] = {
	x: 1000,
	y: 1080,
	width: 100,
	height: 20,
	model: "boost",
	updated: 1,
	frame: 1,
	toBoost: 1
}
plats[1] = {
	x: 0,
	y: 980,
	width: 400,
	height: 20,
	model: "plats"
}
plats[2] = {
	x: 500,
	y: 980,
	width: 200,
	height: 20,
	model: "plats"
}
plats[3] = {
	x: 1250,
	y: 1100-20,
	width: 100,
	height: 20,
	model: "plats"
}
plats[4] = {
	x: 1750,
	y: 1100-20,
	width: 100,
	height: 20,
	model: "plats"
}
plats[5] = {
	x: 0,
	y: 740,
	width: 100,
	height: 20,
	model: "boost",
	updated: 1,
	frame: 1,
	toBoost: 1
}
plats[6] = {
	x: 300,
	y: 740,
	width: 600,
	height: 20,
	model: "plats"
}
plats[7] = {
	x: 0,
	y: 820,
	width: 200,
	height: 160,
	model: "box2"
}
plats[8] = {
	x: 200,
	y: 900,
	width: 100,
	height: 80,
	model: "box1"
}
plats[9] = {
	x: 600,
	y: 420,
	width: 20,
	height: 100,
	model: "plats"
}
plats[10] = {
	x: 1200,
	y: 660,
	width: 820,
	height: 20,
	model: "plats"
}
plats[11] = {
	x: 100,
	y: 420,
	width: 200,
	height: 20,
	model: "plats"
}
plats[12] = {
	x: 300,
	y: 420,
	width: 1050,
	height: 20,
	model: "plats"
}
plats[13] = {
	x: 1800,
	y: 420,
	width: 400,
	height: 20,
	model: "plats"
}
plats[14] = {
	x: 1500,
	y: 470,
	width: 170,
	height: 190,
	model: "box2"
}
plats[15] = {
	x: 1400,
	y: 580,
	width: 80,
	height: 80,
	model: "box1"
}
plats[16] = {
	x: 2000,
	y: 1080,
	width: 100,
	height: 20,
	model: "boost",
	updated: 1,
	frame: 1,
	toBoost: 1

}
plats[17] = {
	x: 1680,
	y: 580,
	width: 80,
	height: 80,
	model: "box4"
}
plats[18] = {
	x: 600,
	y: 640,
	width: 20,
	height: 100,
	model: "plats"
}
plats[19] = {
	x: 300,
	y: 320,
	width: 20,
	height: 100,
	model: "plats"
}
plats[20] = {
	x: 1150,
	y: 320,
	width: 20,
	height: 100,
	model: "plats"
}
plats[21] = {
	x: 320,
	y: 340,
	width: 830,
	height: 80,
	model: "acid",
	toDie: 1
}
plats[22] = {
	x: 400,
	y: 300,
	width: 50,
	height: 20,
	model: "plats",
	updated: 1,
	unStatic: 1,
	moveObj: {
		move: 1,
		speed: 1,
		goFromX: 400,
		goToX: 1000 
	}
}
plats[23] = {
	x: 1250,
	y: 850,
	width: 100,
	height: 20,
	model: "plats"
}
plats[24] = {
	x: 1750,
	y: 850,
	width: 100,
	height: 20,
	model: "plats"
}
plats[25] = {
	x: 1500,
	y: 950,
	width: 100,
	height: 20,
	model: "plats"
}
plats[26] = {
	x: 25,
	y: 1000,
	width: 10,
	height: 100,
	toPort: 1,
	portObj: {
		portToX: 2000,
		portToY: 319
	},
	model: "portal",
	frameTime: 1
}
plats[27] = {
	x: 2065,
	y: 320,
	width: 10,
	height: 100,
	toPort: 1,
	portObj: {
		portToX: 40,
		portToY: 1000
	},
	model: "portal",
	frameTime: 1
}
plats[28] = {
	x: 550,
	y: 690,
	width: 50,
	height: 50,
	model: "box3"
}
plats[29] = {
	x: 620,
	y: 700,
	width: 40,
	height: 40,
	model: "box4"
}
plats[30] = {
	x: 0,
	y: 760,
	width: 100,
	height: 60,
	model: "box4"
}
plats[31] = {
	x: 300,
	y: 1000,
	width: 100,
	height: 100,
	updated: 1,
	model: "box2",
	unStatic: 1,
	moveObj: {
		move: 1,
		speed: 0.5,
		goFromX: 300,
		goToX: 500 
	}
}











//создание лежащего оружия
// guns[0] = {
// 	x: 100,
// 	y: 570,
// 	width: 70,
// 	height: 17,
// 	name: "gun",
// 	takes: 0
// }

guns[1] = {
	x: 700,
	y: 250,
	width: 70,
	height: 27,
	name: "m4a4",
	takes: 2
}

//функция обработки движения различных объектов на сервере
function serverMoves() {
	//движение пуль
	for (var s in shots) { 
		if (shots[s].dir == 1) {
			shots[s].x = shots[s].x + shotSpeed;
		}else {
			shots[s].x = shots[s].x - shotSpeed;
		}
	}
	//движение платформ
	for (var i in plats) {
		if (plats[i].unStatic == 1 && plats[i].moveObj.move != 0) {
			if (plats[i].moveObj.goFromX != 0 && plats[i].moveObj.goToX != 0) {
				if (plats[i].x != plats[i].moveObj.goToX && plats[i].moveObj.move == 1) {
					plats[i].x += plats[i].moveObj.speed;
				}
				if (plats[i].x != plats[i].moveObj.goFromX && plats[i].moveObj.move == -1) {
					plats[i].x -= plats[i].moveObj.speed;
				}
				if (plats[i].x == plats[i].moveObj.goToX) {
					plats[i].moveObj.move = -1;
				}
				if (plats[i].x == plats[i].moveObj.goFromX) {
					plats[i].moveObj.move = 1;
				}
			}
		}
	}
	stats = []
	for (var p in players) {
		stats.push({
			id: players[p].id,
			nick: players[p].nick,
			kills: players[p].kills,
			deads: players[p].deads
		})



	//отправка звуков клиентам
		var tmpSounds = []
		for(var s in sounds) {
			if (sounds[s].for != "all") {
				if (sounds[s].for == players[p].id) {
					tmpSounds.push({
						name: sounds[s].name,
						for: sounds[s].for
					})
				}
			}else {
				tmpSounds.push({
					name: sounds[s].name,
					for: "all",
					from: sounds[s].from
				})
			}
		}
		userInfo = {
			even: "SOUNDS",
			sounds: tmpSounds
		}
		socketServer.clients.forEach(client => {
			if (client.readyState === WebSocket.OPEN) {
				if (client.onclient == players[p].id) {
					client.send(JSON.stringify(userInfo))
				}
			}
		})
	}

	sounds = []
	
}

function boostAnimation(i) {
	plats[i].frame = 2;
    setTimeout(()=>{
    	plats[i].frame = 3;
    },30);
	setTimeout(()=>{
		plats[i].frame = 4;
    },60);
    setTimeout(()=>{
    	plats[i].frame = 5;
    },90);
    setTimeout(()=>{
    	plats[i].frame = 4;
    },120);
    setTimeout(()=>{
    	plats[i].frame = 3;
    },150);
    setTimeout(()=>{
    	plats[i].frame = 2;
    },180);
    setTimeout(()=>{
    	plats[i].frame = 1;
    },210);
}

function respawnPlayer(index,time) {
	players[index].deadTime = roundTime
	players[index].dead = 1;
	players[index].deads += 1;
	socketServer.clients.forEach(client => {
		if (client.readyState === WebSocket.OPEN) {
			if (client.onclient == players[index].id) {
				setTimeout(()=>{
					players[index].dead = 0
					players[index].takeWeapon = "gun"

					sounds.push({
						name: "spawn",
						for: players[index].id
					})
				},time)
			}
		}
	})
}






const WebSocket = require('ws')
const socketServer = new WebSocket.Server({port:80},()=>{
	console.log(chalk.bgGreen("WebSocket server has been started on 8080..."))
})

socketServer.on('connection', ws => {	

	ws.on('message', message => {
		let userInfoReq = JSON.parse(message)
		let userInfo
		let abort = false

		switch (userInfoReq.even) {
			case "START":
				playersCount++;
				console.log(chalk.cyan("User id: "+playersCount+" connected to SocetServer..."))
				players[playersCount] = {
					id: playersCount,
					nick: userInfoReq.nick,
					x: spawns[1].x,
					y: spawns[1].y,
					platsNum: plats.length+1,
					persDir: 0,
					dead: 0,
					deads: 0,
					deadTime: 0,
					kills: 0,
					takeWeapon: "gun",
					reload: 0,
					connTime: roundTime
				}
				userInfo = {
					even: "START",
					id: players[playersCount].id,
					plats: plats,
					spawnX: players[playersCount].x,
					spawnY: players[playersCount].y,
					connTime: players[playersCount].connTime,
					roundTime: roundTime,
					takeWeapon: players[playersCount].takeWeapon
				}
				socketServer.clients.forEach(client => {
					if(client.onclient == undefined) {
						client.onclient = players[playersCount].id
					}
					if (client.readyState === WebSocket.OPEN) {
						if (client.onclient == players[playersCount].id) {
							client.send(JSON.stringify(userInfo))
						}
					}
				})	
				break
			case "SHOT_ADD":
				shots.push({
					x: userInfoReq.x,
					y: userInfoReq.y,
					dir: userInfoReq.dir,
					id: userInfoReq.id
				})
				sounds.push({
					name: "shot",
					for: "all",
					from: userInfoReq.id
				})
				break
			case "SOUND":
				sounds.push({
					name: userInfoReq.name,
					for: "all",
					from: userInfoReq.id
				})
				
				break
			case "TAKE":
				players[userInfoReq.id].takeWeapon = guns[userInfoReq.takeId].name;
				if (guns[userInfoReq.takeId].takes == 0) {
					guns[userInfoReq.takeId].takes = 1
				}
				sounds.push({
					name: "take",
					for: userInfoReq.takeId 
				})
				
				break
			case "ANIMATE":
				switch (userInfoReq.animObj) {
					case "boost":
						boostAnimation(userInfoReq.animObjIndex)
						sounds.push({
							name: "boost",
							for: "all",
							from: userInfoReq.id
						})
						break;
				}
				break
			case "UPDATE":
				var enemys = []
				for (var u in players) {
					if(players[u].id == userInfoReq.id) {
						//добовление новой инфы пользователя от клиента
						players[u].x = userInfoReq.vars.x
						players[u].y = userInfoReq.vars.y
						players[u].persDir = userInfoReq.vars.persDir
						players[u].reload = userInfoReq.vars.reload
					}else if (players[u].id != userInfoReq.id) {
						enemys.push({
							id: players[u].id,
							x: players[u].x,
							y: players[u].y,
							persDir: players[u].persDir,
							platsNum: players[u].platsNum,
							dead: players[u].dead,
							takeWeapon: players[u].takeWeapon,
							reload: players[u].reload
						})
					}
				}
				//проверка на смерть от пули
				for (var s in shots) { 
					for(var p in players) {
						if (shots[s].x+5 < players[p].x+50
						&& shots[s].x+5 > players[p].x
						&& shots[s].y+2 < players[p].y+100
						&& shots[s].y+2 > players[p].y
						&& players[p].dead == 0) 
						{	
							var killerID = shots[s].id
							var murderID = p
							shots.splice(s,1)
							players[killerID].kills++;
							//звук для киллера
							sounds.push({
								name: "hit",
								for: killerID
							})
							//звук для жертвы
							sounds.push({
								name: "dead",
								for: murderID
							})
							console.log("Игрок: "+killerID+"("+players[killerID].kills+")"+"убил игрока: "+players[murderID].id)
							respawnPlayer(murderID,5000)
							break;
						}
					}
				}
					
				for (var s in shots) {
					//проверка на уничтожение пуль за полем
					if (shots[s].x < 3 || shots[s].x > canv.width) {
						shots.splice(s,1)	
						continue
					}
					//проверка на уничтожение пуль в платформе
					for (var i in plats) {
						if (shots[s].x+5 < plats[i].x+plats[i].width
							&& shots[s].x+5 > plats[i].x
							&& shots[s].y+2 < plats[i].y+plats[i].height
							&& shots[s].y+2 > plats[i].y
							&& plats[i].human != 1) 
						{
							shots.splice(s,1)
							break
						}
					}
				}
				var tempPlats = []
				for (var i in plats) {
					//проверка смерть в лаве
					if(plats[i].toDie == 1 && players[userInfoReq.id].dead != 1) {
						if (
								(
									(plats[i].x < players[userInfoReq.id].x+50)&&(plats[i].x+plats[i].width > players[userInfoReq.id].x+50)
									||
									(plats[i].x < players[userInfoReq.id].x)&&(plats[i].x+plats[i].width > players[userInfoReq.id].x)
									||
									(plats[i].x < players[userInfoReq.id].x)&&(plats[i].x+plats[i].width > players[userInfoReq.id].x)
								)
								&& 	
								(
									((players[userInfoReq.id].y + 100+10) > plats[i].y) && ((players[userInfoReq.id].y+100+10) < (plats[i].y+plats[i].height))
								)

							) 
						{	
							console.log("Игрок: "+userInfoReq.id+" решил поплавать в лаве")
							respawnPlayer(userInfoReq.id,5000)
							sounds.push({
								name: "dead",
								for: userInfoReq.id
							})
						}
					}
					//добовление обновляемых платформ во временный массив
					if(plats[i].updated == 1) {
						tempPlats.push({
							index: i,
							info: plats[i]
						})
					}
				}
				
				
				userInfo = {
					even: "UPDATE",
					id: userInfoReq.id,
					dead: players[userInfoReq.id].dead,
					deadTime: players[userInfoReq.id].deadTime,
					enemys: enemys,
					guns: guns,
					takeWeapon: players[userInfoReq.id].takeWeapon,
					shots: shots,
					tempPlats: tempPlats,
					kills: players[userInfoReq.id].kills,
					roundTime: roundTime,
					stats: stats
				}
				socketServer.clients.forEach(client => {
					if (client.readyState === WebSocket.OPEN) {
						if (client.onclient == userInfoReq.id) {
							client.send(JSON.stringify(userInfo))
						}
					}
				})
				break	
		}
	})
})



// const mysql = require('mysql')
// const conn = mysql.createConnection({
// 	host: "localhost",
// 	database: "ives_db",
// 	user: "root",
// 	password: ""
// })

// conn.connect(err => {
// 	if(err) {
// 		console.log(err)
// 		return err
// 	} else {
// 		console.log("Database --------- OK")
// 	}
// })

// let queryStr = "SELECT * FROM `users` WHERE `login` = 'Flecs1th';"

// conn.query(queryStr, (err, result) => {
// 	console.log("Ошибка запроса: "+err)
// 	console.log(result)

// 	conn.end(err => {
// 		if(err) {
// 			console.log(err)
// 			return err
// 		} else {
// 			console.log("Database --------- DISCONNECT")
// 		}
// 	})

// })










