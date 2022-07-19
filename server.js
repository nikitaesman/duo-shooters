const chalk = require('chalk')
const http = require('http')
const fs = require('fs')
const path = require('path')
const WebSocket = require('ws')
const url = require('url');

const server = http.createServer( (req, res) => {

	
	if(req.method == "GET") {
		let filePathPublic = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url)
	
		fs.readFile(filePathPublic, (err, content) => {
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

		if (req.url == "/saveMap") {
			let body = ""
			req.on("data", chunk => {
				body += chunk.toString()
			})
			req.on("end", () => {
				var mapName = (JSON.parse(body)).mapName + ".txt"
				let filePathNewMap = path.join(__dirname,'public','mapEdder','maps',mapName)

				fs.writeFile(filePathNewMap,body,err => {
					if(err) {
						throw err
					}
				})
				res.end("Файл "+mapName+" создан")
			})
			
		}
		if (req.url == "/openMap") {
			let body = ""
			req.on("data", chunk => {
				body += chunk.toString()
			})
			req.on("end", () => {
				var mapName = body + ".txt"
				let filePathOpenMap = path.join(__dirname,'public','mapEdder','maps',mapName)
				fs.readFile(filePathOpenMap,'utf-8',(err,content)=>{
					res.end(content)
				})
			})
		}
		if (req.url == "/getNames") {
			let filePathMaps = path.join(__dirname,'public','mapEdder','maps')
			fs.readdir(filePathMaps,(err,mapsNames)=>{
				var mapsNamesInfo = {
					mapsNames: mapsNames
				}
				res.end(JSON.stringify(mapsNamesInfo))
			})
		}
	}

	

	
	
})

const PORT = process.env.PORT || 3000;

server.listen(PORT, ()=>{
	console.log(chalk.bgGreen('Server has been started on '+PORT+'...'))
})



//gameData --------------------------------------------
	var spawns = []
	var rooms = []
	var spawnPickPoint = 0;
	
	var playersCount = 0
	var players = []
	var guns = []
	var plats = []
	var tempPlats = []
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
		spawnPickPoint = 0;
		playersCount = 0
		players = []
		shots = []
		sounds = []
		stats = []
		rooms = [
			{
				x: 1200,
				y: 680,
				width: 800,
				height: 450
			}
		]
		roundTime = 0


		var initMapName = "down_town.txt"
		let filePathInitMap = path.join(__dirname,'public','mapEdder','maps',initMapName)
		fs.readFile(filePathInitMap,'utf-8',(err,content)=>{
			if(err) {
				throw err
			}
			var mapContent = JSON.parse(content)
			canv = {
				width: mapContent.canvas.width,
				height:  mapContent.canvas.height
			}
			spawns = mapContent.spawns
			plats = mapContent.plats
			guns = mapContent.guns
		})

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
		notification("Сервер будет перезапущен через 10 секунд","server")
		setTimeout(()=>{
			if(players.length > 0) {
				var ntf = "Победителем раунда стал "+stats[0].nick+" набив "+stats[0].kills+" килов"
				notification(ntf,"server")
			}
		},6000)
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
		setTimeout(()=>{
			sounds.push({
				name: "overtime",
				for: "all"
			})
		},9000)
		setTimeout(()=>{
			sounds.push({
				name: "overtime",
				for: "all"
			})
		},10000)
	}
	//удвление afk пользователей
	// for (var p in players) {
	// 	if (roundTime - players[p].connectionTime > 5000) {
	// 		players.splice(p,1)
	// 		continue
	// 	}
	// }

	//проверка на уничтожение пуль
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
						if (plats[i].model == "ramp") {
							var rampRate = plats[i].height/plats[i].width
							if(plats[i].rampDir == 1) {
								var rampDist = shots[s].x-plats[i].x;
								if (shots[s].y+5>=(plats[i].y+plats[i].height)-(rampDist*rampRate)) {
									shots.splice(s,1)
								}
							}else {
								var rampDist = plats[i].x+plats[i].width-shots[s].x
								if (shots[s].y+5>=(plats[i].y+plats[i].height)-(rampDist*rampRate)) {
									shots.splice(s,1)
								}
							}
						}else {
							shots.splice(s,1)
							
						}
						break
					}
				}
				break
			case "through":
				
				break
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
				players[killerID].continuousKills++;
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
	//движение пуль
	for (var s in shots) { 
		if (shots[s].dir == 1) {
			shots[s].x = shots[s].x + shotSpeed;
		}else {
			shots[s].x = shots[s].x - shotSpeed;
		}
	}
	tempPlats = []
	//движение платформ
	for (var i in plats) {
		if (plats[i].unStatic == 1 && plats[i].moveObj.moveX != 0) {
			if (plats[i].x != plats[i].moveObj.goToX && plats[i].moveObj.moveX == 1) {
				plats[i].x += plats[i].moveObj.speedX;
			}
			if (plats[i].x != plats[i].moveObj.goFromX && plats[i].moveObj.moveX == -1) {
				plats[i].x -= plats[i].moveObj.speedX;
			}
			if (plats[i].x >= plats[i].moveObj.goToX) {
				plats[i].moveObj.moveX = -1;
			}
			if (plats[i].x == plats[i].moveObj.goFromX) {
				plats[i].moveObj.moveX = 1;
			}
		}
		if (plats[i].unStatic == 1 && plats[i].moveObj.moveY != 0) {
			if (plats[i].moveObj.moveY == 1) {
				plats[i].y += plats[i].moveObj.speedY;
				plats[i].y = Math.round(plats[i].y*10)/10

			}else {
				plats[i].y -= plats[i].moveObj.speedY;
				plats[i].y = Math.round(plats[i].y*10)/10
			}
			if (plats[i].y == plats[i].moveObj.goToY) {
				plats[i].moveObj.moveY = -1;
			}
			if (plats[i].y == plats[i].moveObj.goFromY) {
				plats[i].moveObj.moveY = 1;
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
		}else {
			players[p].x = 0
			players[p].y = 0
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
	players[index].dead = 1
	players[index].deads += 1
	players[index].continuousKills = 0
	spawnPick()
	socketServer.clients.forEach(client => {
		if (client.readyState === WebSocket.OPEN) {
			if (client.onclient == players[index].id) {
				setTimeout(()=>{
					if(players[index].dead == 1) {
						players[index].dead = 0
						players[index].takeWeapon = "gun"

						sounds.push({
							name: "spawn",
							for: players[index].id
						})
					}
				},time)
				userInfoMes = {
					even: "CORD",
					x: spawns[spawnPickPoint].x,
					y: spawns[spawnPickPoint].y
				}
				client.send(JSON.stringify(userInfoMes))
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
	if (spawnPickPoint == spawns.length-1) {
		spawnPickPoint = 0
	}else {
		spawnPickPoint ++
	}
}

var socketServer

AddsocketServer()

function AddsocketServer() {
	socketServer = new WebSocket.Server({ server })
	console.log(chalk.bgGreen("WebSocket server has been started on "+PORT+"..."))

	socketServer.on('connection', ws => {
		ws.on('message', message => {
			let userInfoReq = JSON.parse(message)
			let userInfo
			let abort = false

			switch (userInfoReq.even) {
				case "START":			
					playersCount++;
					console.log(chalk.cyan("User id: "+playersCount+" connected to SocetServer..."))
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
						direction: 0,
						directionVertical: 0,
						persFrame: 1,
						dead: 0,
						deads: 0,
						deadTime: 0,
						kills: 0,
						continuousKills: 0,
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
						takeWeapon: players[playersCount].takeWeapon,
						canv: {
							width: canv.width,
							height: canv.height
						}
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
							players[u].direction = userInfoReq.vars.direction
							players[u].directionVertical = userInfoReq.vars.directionVertical
							players[u].persFrame = userInfoReq.vars.persFrame
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
								direction: players[u].direction,
								directionVertical: players[u].directionVertical,
								persFrame: players[u].persFrame,
								platsNum: players[u].platsNum,
								dead: players[u].dead,
								takeWeapon: players[u].takeWeapon,
								reload: players[u].reload
							})
						}
					}
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
						continuousKills: players[userInfoReq.id].continuousKills,
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










