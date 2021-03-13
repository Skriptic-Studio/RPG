module.exports={
  name:'start',
  description: "Start the game",
	details: "Get info on how to play and register yourself by running this",
	guildOnly: true,
  async execute(message, args){
		const Discord = require("discord.js")
		const Keyv = require("keyv")
		const usersDb = new Keyv('sqlite://./databases/users.sqlite')
		const mainDb = new Keyv('sqlite://./databases/main.sqlite')

		const prefix = await mainDb.get(`prefix - ${message.guild.id}`);

		const start = new Discord.MessageEmbed()
			.setTitle('Start')
			.setColor('#0ff')
			.setDescription(`**Welcome to the RPG, ${message.author.username}!**\n In this RPG, your objective is to reach a better position on the leaderboard(${prefix}leaderboard). \n**Levels:**\nLevels are earned by defeating enemies(${prefix}hunt), by friendly battling someone(${prefix}fight <usermention>) or by training(${prefix}train all)`)
			.setFooter('To get a list of command, use ' + prefix + 'help');

		const character = new Discord.MessageEmbed()
			.setTitle('Character')
			.setDescription('It seems is your first time playing, lets start by setting up your character.\n\n1. Melee: 6 Attack, 8 Defense, 8 Accuracy, 2 Range and 6 Speed.\n2. Ranged: 6 Attack, 6 Defense, 4 Accuracy, 10 Range and 4 Speed.\n3. Mage: 8 Attack, 6 Defense, 6 Accuracy and 8 Range, 2 Speed.\n\nPS: Every character type has 20 HP')
			.setFooter('You have 30 seconds to answer with a number!')
			.setColor('#00ff00');

		const melee = new Discord.MessageEmbed()
			.setTitle('Weapons')
			.setDescription("Melee type, a high defense and and short range one. Now let's set up your weapon.\n\n1. Sword: +1 Speed and -1 Attack.\n2. Machete: +2 Attack and -2 Speed.\n3. Spear: +2 Range, -1 Defense and -1 Accuracy")
			.setFooter('You have 30 seconds to answer with a number!')
			.setColor('#00ff00');

		const ranged = new Discord.MessageEmbed()
			.setTitle('Weapons')
			.setDescription("Ranged type, a high range and short range one. Now let's set up your weapon.\n\n1. Bow: +1 Defense, +1 Range and -2 Attack.\n2. Slingshot: +2 Speed, -1 Attack and -1 Defense.\n3. Dart: +2 Speed, -1 Attack and -1 Accuracy")
			.setFooter('You have 30 seconds to answer with a number!')
			.setColor('#00ff00');
		
		const mage = new Discord.MessageEmbed()
			.setTitle('Weapons')
			.setDescription("Mage type, a very equilibrated one. Now let's set up your weapon.\n\n1. Magic Wand: +2 Speed and -2 Defense.\n2. Staff: +1 Range and -1 Speed.\n3. Magic Gloves: +2 Speed and -2 Range")
			.setFooter('You have 30 seconds to answer with a number!')
			.setColor('#00ff00');

		message.channel.send(start);
		var userO = await usersDb.get(`user - ${message.author.id}`);
			
		if(!userO){

			userO = {
				date: `${new Date().getFullYear()}/${new Date().getMonth()+1}/${new Date().getDate()}`,
				type: undefined,
				weapon: undefined,
				coins: 0,
				level: 1,
				xp: 0,
				attack: undefined,
				attackXp: 0,
				attackLevel: 1,
				defense: undefined,
				defenseXp: 0,
				defenseLevel: 1,
				accuracy: undefined,
				accuracyXp: 0,
				accuracyLevel: 1,
				range: undefined,
				rangeXp: 0,
				rangeLevel: 1,
				speed: undefined,
				speedXp: 0,
				speedLevel: 1,
				hp: 20
			}

			let filter = m => m.author.id == message.author.id;

			var cancelled = false;

			message.channel.send(character).then(async() => {
				message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] }).then(collected => {
				var m = collected.first().content;
						if(!parseInt(m)||parseInt(m)<=0||parseInt(m)>3) {
							cancelled = true;
							return message.channel.send("Process cancelled, invalid answer provided");
						}

						else{
							if(m=='1'){
								setup = 'melee';
								message.channel.send(melee).then(async()=>{
									message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] }).then(async collected => {
									let m2 = collected.first().content;
									console.log(m2);

									if(!parseInt(m2)||parseInt(m2)<=0||parseInt(m2)>3) return message.channel.send('Invalid answer provided');

									console.log(m2);
									
									if(m2 == '1'){//sword/bow/magic wand
										const embed = new Discord.MessageEmbed().setTitle("Character Set!").setDescription("Your character was set as meelee type using a sword!")
										console.log(`${message.author.id}/${message.author.username} joined`)
										message.channel.send(embed)
										userO.type = 'Melee';
										userO.weapon = 'Sword';
										userO.attack = 5;
										userO.defense = 8;
										userO.accuracy = 8;
										userO.range = 2;
										userO.speed = 7;
										try{
											await usersDb.set(`user - ${message.author.id}`, userO);
										}
										catch(e){
											console.error(e);
										}
										console.log("Funfa aki");
									}
									else if(m2 == '2'){//machete/dart/staff
										const embed = new Discord.MessageEmbed().setTitle("Character Set!").setDescription("Your character was set as meelee type using a machete!")
										console.log(`${message.author.id}/${message.author.username} joined`)
										message.channel.send(embed)
										userO.type = 'Melee';
										userO.weapon = 'Machete';
										userO.attack = 8;
										userO.defense = 8;
										userO.accuracy = 8;
										userO.range = 2;
										userO.speed = 4;
										await usersDb.set(`user - ${message.author.id}`, userO);
									}
									else if(m2 == '3'){//spear/slingshot/gloves
										const embed = new Discord.MessageEmbed().setTitle("Character Set!").setDescription("Your character was set as meelee type using a spear!")
										console.log(`${message.author.id}/${message.author.username} joined`)
										message.channel.send(embed)
										userO.type = 'Melee';
										userO.weapon = 'Spear';
										userO.attack = 6;
										userO.defense = 7;
										userO.accuracy = 7;
										userO.range = 4;
										userO.speed = 3;
										await usersDb.set(`user - ${message.author.id}`, userO);
									}

									}).catch(collected => {
										if(collected.size == 0){
											cancelled = true;
											message.channel.send("You didn't answer in time!")
										}
									})
								})
							}
							else if(m=='2'){
								setup = 'ranged'
								message.channel.send(ranged).then(async()=>{
									message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] }).then(async collected => {
									let m2 = collected.first().content;

									if(!parseInt(m2)||parseInt(m2)<=0||parseInt(m2)>3) message.channel.send('Invalid answer provided');
									if(m2 == '1'){//sword/bow/magic wand
										const embed = new Discord.MessageEmbed().setTitle("Character Set!").setDescription("Your character was set as ranged type using a Bow!")
										console.log(`${message.author.id}/${message.author.username} joined`)
										message.channel.send(embed)
										userO.type = 'Ranged';
										userO.weapon = 'Bow';
										userO.attack = 4;
										userO.defense = 7;
										userO.accuracy = 4;
										userO.range = 11;
										userO.speed = 4;
										await usersDb.set(`user - ${message.author.id}`, userO);
									}
									else if(m2 == '2'){//machete/slingshot/staff
										const embed = new Discord.MessageEmbed().setTitle("Character Set!").setDescription("Your character was set as ranged type using Slingshot!")
										console.log(`${message.author.id}/${message.author.username} joined`)
										message.channel.send(embed)
										userO.type = 'Ranged';
										userO.weapon = 'Slingshot';
										userO.attack = 5;
										userO.defense = 5;
										userO.accuracy = 4;
										userO.range = 10;
										userO.speed = 6;
										await usersDb.set(`user - ${message.author.id}`, userO);
									}
									else if(m2 == '3'){//axe/dart/gloves
										const embed = new Discord.MessageEmbed().setTitle("Character Set!").setDescription("Your character was set as ranged type using a Dart!")
										console.log(`${message.author.id}/${message.author.username} joined`)
										message.channel.send(embed)
										userO.type = 'Ranged';
										userO.weapon = 'Dart';
										userO.attack = 4;
										userO.defense = 6;
										userO.accuracy = 3;
										userO.range = 10;
										userO.speed = 6;
										await usersDb.set(`user - ${message.author.id}`, userO);
									}
									}).catch(collected => {
										if(collected.size == 0){
											//cance
											message.channel.send("You didn't answer in time!")
										}
									})
								})
							}
							else{
								setup = 'mage'
								message.channel.send(mage).then(async()=>{
									message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] }).then(async collected => {
									let m2 = collected.first().content;

									if(!parseInt(m2)||parseInt(m2)<=0||parseInt(m2)>3) message.channel.send('Invalid answer provided');
									if(m2 == '1'){//sword/bow/magic wand
										const embed = new Discord.MessageEmbed().setTitle("Character Set!").setDescription("Your character was set as mage type using a magic wand!")
										console.log(`${message.author.id}/${message.author.username} joined`)
											message.channel.send(embed)
										userO.type = 'Mage';
										userO.weapon = 'Magic Wand';
										userO.attack = 8;
										userO.defense = 4;
										userO.accuracy = 6;
										userO.range = 8;
										userO.speed = 4;
										await usersDb.set(`user - ${message.author.id}`, userO);
									}
									else if(m2 == '2'){//machete/dart/staff
										const embed = new Discord.MessageEmbed().setTitle("Character Set!").setDescription("Your character was set as mage type using a staff!")
										console.log(`${message.author.id}/${message.author.username} joined`)
										message.channel.send(embed)
										userO.type = 'Mage';
										userO.weapon = 'Staff';
										userO.attack = 8;
										userO.defense = 6;
										userO.accuracy = 6;
										userO.range = 9;
										userO.speed = 1;
										await usersDb.set(`user - ${message.author.id}`, userO);
									}
									else if(m2 == '3'){//axe/slingshot/gloves
										const embed = new Discord.MessageEmbed().setTitle("Character Set!").setDescription("Your character was set as mage type using a magic gloves!")
										console.log(`${message.author.id}/${message.author.username} joined`)
										message.channel.send(embed)
										userO.type = 'Mage';
										userO.weapon = 'Magic Gloves';
										userO.attack = 8;
										userO.defense = 6;
										userO.accuracy = 6;
										userO.range = 6;
										userO.speed = 4;
										await usersDb.set(`user - ${message.author.id}`, userO);
									}

									}).catch(async collected => {
										if(collected.size == 0){
											return message.channel.send("You didn't answer in time!")
										}
									})
								})
							}								
						}
					}).catch(collected => {
					if(collected.size==0)
						return message.channel.send(`Proccess cancelled, you didn't answer in time`);

					else if(cancelled){return message.channel.send("Proccess Cancelled, invalid answer provided");}
				})
				});

			/*
			Character Types:
      Melee: 6 Attack, 8 Defense, 8 Accuracy, 2 Range and 6 Speed.
      Ranged: 6 Attack, 6 Defense, 4 Accuracy, 10 Range and 4 Speed.
      Mage: 8 Attack, 6 Defense, 6 Accuracy and 8 Range, 2 Speed.
			*/
		}
  }
};