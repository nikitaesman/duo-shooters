const chalk = require('chalk')
const http = require('http')
const fs = require('fs')
const path = require('path')
const WebSocket = require('ws')

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
		if (req.url == "/pingChecker") {
			res.end()
		}
	}

	

	
	
})

const PORT = process.env.PORT || 3000;

server.listen(PORT, ()=>{
	console.log(chalk.bgGreen('Server has been started on '+PORT+'...'))
})



//gameData --------------------------------------------
	var spawns = []
	var spawnPickPoint = 1;
	
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
	//физические константы
	var moveSpeed = 5;
	var grav = 5;
	var shotSpeed = 8;

function gameData() {
	{
		spawns = []
		spawnPickPoint = 1;
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
		playersCount = 0
		players = []
		guns = []
		plats = []
		shots = []
		sounds = []
		stats = []
		roundTime = 0
		canv = {
			width: 2100,
			height:  1100
		};


		//физические константы
		moveSpeed = 5;
		grav = 5;
		shotSpeed = 8;


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
			width: 480,
			height: 20,
			model: "plats"
		}
		plats[2] = {
			x: 480,
			y: 980,
			width: 100,
			height: 20,
			model: "plats"
		}
		plats[3] = {
			x: 0,
			y: 820,
			width: 200,
			height: 20,
			model: "plats"
		}
		plats[4] = {
			x: 580,
			y: 970,
			width: 20,
			height: 120,
			updated: 1,
			model: "plats",
			updated: 1,
			unStatic: 1,
			moveObj: {
				speed: 0.5,
				moveX: 0,
				goFromX: 0,
				goToX: 0,
				moveY: 1,
				goFromY: 980,
				goToY: 1200,
			}
		}
		plats[5] = {
			x: 0,
			y: 800,
			width: 100,
			height: 20,
			model: "boost",
			updated: 1,
			frame: 1,
			toBoost: 1
		}
		plats[6] = {
			x: 330,
			y: 740,
			width: 590,
			height: 20,
			model: "plats"
		}
		plats[7] = {
			x: 180,
			y: 840,
			width: 20,
			height: 140,
			model: "plats"
		}
		plats[8] = {
			x: 200,
			y: 900,
			width: 100,
			height: 80,
			model: "box2"
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
			y: 590,
			width: 80,
			height: 70,
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
			y: 590,
			width: 80,
			height: 70,
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
				speed: 0.5,
				moveX: 1,
				goFromX: 400,
				goToX: 1000,
				moveY: 0,
				goFromY: 0,
				goToY: 0,
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
			x: 1600,
			y: -220,
			width: 20,
			height: 470,
			model: "plats",
			updated: 1,
			unStatic: 1,
			moveObj: {
				speed: 1,
				moveX: 0,
				goFromX: 0,
				goToX: 0,
				moveY: 1,
				goFromY: -220,
				goToY: 0,
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
		guns[2] = {
			x: 30,
			y: 900,
			width: 115,
			height: 27,
			name: "awp",
			takes: 2
		}
	}
}
gameData()

var maneInterval



if (roundTime != undefined) {
	maneInterval = setInterval(serverMoves,10)
}


//функция обработки движка на сервере
function serverMoves() {
	roundTime+=10
	if (roundTime > 600000) {
		roundTime = 0
		console.log('serverReboot in process')
		serverReboot()
		return
	}
	if (roundTime == 590000) {
		var notfMes = "Сервер будет перезапущен через 10 секунд"
		notification(notfMes,"server")
		sounds.push({
			name: "overtime",
			for: "all"
		})
		setTimeout(()=>{
			sounds.push({
				name: "overtime",
				for: "all"
			})
		},1000)
		setTimeout(()=>{
			sounds.push({
				name: "overtime",
				for: "all"
			})
		},2000)
		setTimeout(()=>{
			sounds.push({
				name: "overtime",
				for: "all"
			})
		},3000)
		setTimeout(()=>{
			sounds.push({
				name: "overtime",
				for: "all"
			})
		},4000)
		setTimeout(()=>{
			sounds.push({
				name: "overtime",
				for: "all"
			})
		},5000)
		setTimeout(()=>{
			sounds.push({
				name: "overtime",
				for: "all"
			})
		},6000)
		setTimeout(()=>{
			sounds.push({
				name: "overtime",
				for: "all"
			})
		},7000)
		setTimeout(()=>{
			sounds.push({
				name: "overtime",
				for: "all"
			})
		},8000)
	}
	//удвление afk пользователей
	// for (var p in players) {
	// 	if (roundTime - players[p].connectionTime > 5000) {
	// 		players.splice(p,1)
	// 		continue
	// 	}
	// }
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
		if (plats[i].unStatic == 1 && plats[i].moveObj.moveX != 0) {
			if (plats[i].x != plats[i].moveObj.goToX && plats[i].moveObj.moveX == 1) {
				plats[i].x += plats[i].moveObj.speed;
			}
			if (plats[i].x != plats[i].moveObj.goFromX && plats[i].moveObj.moveX == -1) {
				plats[i].x -= plats[i].moveObj.speed;
			}
			if (plats[i].x == plats[i].moveObj.goToX) {
				plats[i].moveObj.moveX = -1;
			}
			if (plats[i].x == plats[i].moveObj.goFromX) {
				plats[i].moveObj.moveX = 1;
			}
		}
		if (plats[i].unStatic == 1 && plats[i].moveObj.moveY != 0) {
			if (plats[i].y != plats[i].moveObj.goToY && plats[i].moveObj.moveY == 1) {
				plats[i].y += plats[i].moveObj.speed;
			}
			if (plats[i].y != plats[i].moveObj.goFromY && plats[i].moveObj.moveY == -1) {
				plats[i].y -= plats[i].moveObj.speed;
			}
			if (plats[i].y == plats[i].moveObj.goToY) {
				plats[i].moveObj.moveY = -1;
			}
			if (plats[i].y == plats[i].moveObj.goFromY) {
				plats[i].moveObj.moveY = 1;
			}
		}
	}
	stats = []
	for (var p in players) {
		//проверка на afk
		if (roundTime - players[p].connectionTime < 5000) {
			stats.push({
				id: players[p].id,
				nick: players[p].nick,
				kills: players[p].kills,
				deads: players[p].deads,
				ping: players[p].ping
			})
		}	
	}
	function sortByKills(arr) {
	  arr.sort((a, b) => a.kills < b.kills ? 1 : -1);
	}

	sortByKills(stats)




	for (var p in players) {
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
		if (tmpSounds.length != 0) {
			socketServer.clients.forEach(client => {
				if (client.readyState === WebSocket.OPEN) {
					if (client.onclient == players[p].id) {
						client.send(JSON.stringify(userInfo))
					}
				}
			})
		}
	}

	sounds = []
	
}

function serverReboot() {
	socketServer.close(()=>{
		clearInterval(maneInterval)
		gameData()
		AddsocketServer()
		maneInterval = setInterval(serverMoves,10)
	})
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
	spawnPick()
	players[index].spawnX = spawns[spawnPickPoint].x
	players[index].spawnY = spawns[spawnPickPoint].y
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

function notification(mes,from) {
	userInfoMes = {
		even: "NOTIFICATION",
		from: from,
		mes: mes
	}
	socketServer.clients.forEach(client => {
		if (client.readyState === WebSocket.OPEN) {
			client.send(JSON.stringify(userInfoMes))
		}
	})
}

function spawnPick() {
	if (spawnPickPoint == 5) {
		spawnPickPoint = 1
	}else {
		spawnPickPoint ++
	}
}

var startConnection
var requestConnection
var socketServer

AddsocketServer()

function AddsocketServer() {
	socketServer = new WebSocket.Server({ server })
	console.log(chalk.bgGreen("WebSocket server has been started on "+PORT+"..."))

	socketServer.on('connection', ws => {
		startConnection = new Date()
		ws.on('message', message => {
			let userInfoReq = JSON.parse(message)
			let userInfo
			let abort = false

			switch (userInfoReq.even) {
				case "START":
					requestConnection = new Date()
					ms = requestConnection.valueOf() - startConnection.valueOf();
					
					playersCount++;
					console.log(chalk.cyan("User id: "+playersCount+" connected to SocetServer..."+" ---Connection ping: "+ms))
					spawnPick()
					players[playersCount] = {
						id: playersCount,
						nick: userInfoReq.nick,
						x: spawns[spawnPickPoint].x,
						y: spawns[spawnPickPoint].y,
						spawnX: spawns[spawnPickPoint].x,
						spawnY: spawns[spawnPickPoint].y,
						platsNum: plats.length+1,
						persDir: 0,
						dead: 0,
						deads: 0,
						deadTime: 0,
						kills: 0,
						takeWeapon: "gun",
						reload: 0,
						ping: 0,
						connectionTime: 0,
						connTime: roundTime
					}
					userInfo = {
						even: "START",
						id: players[playersCount].id,
						plats: plats,
						spawnX: players[playersCount].spawnX,
						spawnY: players[playersCount].spawnY,
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
					if (players[userInfoReq.id].dead == 0) {
						shots.push({
							x: userInfoReq.x,
							y: userInfoReq.y,
							dir: userInfoReq.dir,
							type: userInfoReq.type,
							id: userInfoReq.id
						})
						switch (userInfoReq.type) {
							case "through":
								sounds.push({
									name: "shotAwp",
									for: "all",
									from: userInfoReq.id
								})
								break;
							case "default":
								sounds.push({
									name: "shot",
									for: "all",
									from: userInfoReq.id
								})
								break;
						}
						
					}
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
						for: "all",
						from: userInfoReq.id
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
							players[u].ping = userInfoReq.vars.ping
							players[u].connectionTime = roundTime
						}else if (players[u].id != userInfoReq.id 
						  		&& roundTime - players[u].connectionTime < 5000) 
							{
							enemys.push({
								id: players[u].id,
								x: players[u].x,
								y: players[u].y,
								nick: players[u].nick,
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
							&& shots[s].id != players[p].id
							&& players[p].dead == 0) 
							{	
								var killerID = shots[s].id
								var murderID = p
								switch (shots[s].type) {
									case "default":
										shots.splice(s,1)
										break
									case "through":
						
										break
								}
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
								var notfMes = players[killerID].nick+" убил "+players[murderID].nick
								notification(notfMes,"user")
								respawnPlayer(murderID,5000)
								break
							}
						}
						
					
						
					}
					for (var s in shots) {
						//проверка на уничтожение пуль за полем
						if (shots[s].x < 3 || shots[s].x > canv.width) {
							shots.splice(s,1)	
							continue
						}
						switch (shots[s].type) {
							case "default":
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
								break
							case "through":
								
								break
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
								var notfMes = players[userInfoReq.id].nick+" решил поплавать в кислоте"
								notification(notfMes,"user")
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
						spawnX: players[userInfoReq.id].spawnX,
						spawnY: players[userInfoReq.id].spawnY,
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
}// AddsocketServer exit




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










