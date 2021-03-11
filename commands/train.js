module.exports={
	name: 'train',
	description: 'Trains your character',
	details: 'Trains your character in a specific area that you can choose between attack, defense, speed, accuracy, range and xp(main level)',
	register: true,
	test: true,
	args: true,
	aliases: ['tr'],
	//cooldown: '10 minutes',
	async execute(message, args){
		const Discord = require('discord.js');
		const Keyv = require('keyv');
		const userDb = new Keyv('sqlite://./databases/users.sqlite');
		const mainDb = new Keyv('sqlite://./databases/main.sqlite');
		const userO = await userDb.get(`user - ${message.author.id}`);

		const prefix = (await mainDb.get(`prefix - ${message.guild.id}`)||'r.');
		let embed = Discord.MessageEmbed();

		/*general---------------------------------*/

		//level up support vars
		let currentExperience = 0;
		let currentLevel;
		let level;

		//level up and modify database
		async function checkLevelUp(area) {
			if(area == undefined) 
				experienceToLevelUp = Math.pow(userO.level*2, 2);
			else 
				experienceToLevelUp = Math.pow(userO[`${area}Level`]*2, 2);
			if(currentExperience > experienceToLevelUp) {
				level++;
				currentExperience -= experienceToLevelUp;
				checkLevelUp(area);
			}
			else{
				if(level>currentLevel){
					if (level==currentLevel+1)
						message.channel.send("You leveled up!");
					else message.channel.send(`WOW! You leveled up ${level-currentLevel} times!`);
				}
			}
			currentLevel = level;
			if(area == undefined) {
				userO.level = currentLevel;
				userO.xp = currentExperience;
			}
			else {
				userO[`${area}Level`] = currentLevel;
				userO[`${area}Xp`] = currentExperience;
			}
			await userDb.set(`user - ${message.author.id}`, userO)
		}

		//randomize arrays
		var randArray = (arr) =>{
			for (var i = arr.length - 1; i > 0; i--) {
    	  let j = Math.floor(Math.random() * (i + 1));
    	  let temp = arr[i];
    	  arr[i] = arr[j];
    	  arr[j] = temp;
    	}
			return arr;
		}

		/*accuracy--------------------------------*/

		//vars for accuracy train
		let accEmojis = [
			':apple:',':volleyball:',':jigsaw:',':bread:',':rabbit2:',':clap:',':tada:'
		]
		let accEmojisLenght = parseInt(accEmojis.length);
		let accRabbitNumber;
		let accCollectedAmount = 0;
		let accRounds = 0;

		//accuracy train function
		function accFunction() {
    	randArray(accEmojis);
			for (let k = 0; k<7; k++) {
				if(accEmojis[k] == ':rabbit2:') {
					k++;
					accRabbitNumber = k;
					break;
				}
			}
			message.channel.send( new Discord.MessageEmbed()
				.setTitle('Training your Accuracy!')
				.setDescription(`Answer the position of the animal\n${accEmojis.join("")}`)
				.setFooter('You have 10 seconds for 3 awsners')
			);	
		}

		/*xp--------------------------------------*/

		//vars xp train 
		let numberMind = [':one:', ':two:', ':three:', ':four:', ':five:'];

		let correct = false;
		let letterQuantityMindPhrases = ["Welcome to our RPG", "Thanks for playing", "This is a phrase", "How many letters are here", "Type the invite command and join our Discord server", "You should try counting these characters instead of reading", "The number is 13", "Go get XP", "Training is the path of success", "Go for it", "Can you check how many letters", "The XP is in your hands", "More XP is equal to more level", "More level more success"];
		
		//one of the xp train functions
		function numberXp(){
			let emojisPos = randArray(numberMind);
			let correct = [];
			let correctNum = [];
			embed.setTitle("Training your Mind!").setDescription(`Answer with the order of the position of the numbers\n${emojisPos.join("")}`).setFooter("Separate the numbers with space. Example: 5 1 3 4 2");
			message.channel.send(embed);
			for(let i = 0; i<emojisPos.length; i++){
				switch(emojisPos[i]){
					case ':one:':
						correct.push(emojisPos[0]);
					break;
					case ':two:':
						correct.push(emojisPos[1]);
					break;
					case ':three:':
						correct.push(emojisPos[2]);
					break;
					case ':four:':
						correct.push(emojisPos[3]);
					break;
					case ':five:':
						correct.push(emojisPos[4]);
					break;
				}
			}

			for(let i = 0; i<emojisPos.length; i++){
				switch(correct[i]){
					case ':one:':
						correctNum.push(1);
					break;
					case ':two:':
						correctNum.push(2);
					break;
					case ':three:':
						correctNum.push(3);
					break;
					case ':four:':
						correctNum.push(4);
					break;
					case ':five:':
						correctNum.push(5);
					break;
				}
			}

			let filter = m => m.author.id == message.author.id;

			let collector = message.channel.createMessageCollector(filter, { time: 10000, max: 1 });
			collector.on('collect', m => {
				if(m.content==correctNum.join(" ")){
					message.channel.send(`Correct!\n You got ${6*userO.level}xp!`);
					currentExperience += 6*userO.level;
					checkLevelUp();
				}
				else{
					message.channel.send("Wrong answer!");
				}
			});

			collector.on('end', collected => {
				if(collected.size==0)
					message.channel.send("You didn't answer in time!")
			});
		}

		//another xp train function
		function letterQuantityMind() {
			let currentPhrase = letterQuantityMindPhrases[Math.floor(letterQuantityMindPhrases.length * Math.random())];

			embed.setTitle('Training your Mind!').setDescription(`Quick! Count each letter of the phrase below and write it!\n${currentPhrase}`).setFooter('You have 10 seconds to count it!');
			message.channel.send(embed);

			let quantityChar = currentPhrase.split(" ").join("").length;

			let letterQuantityMindFilter = m => m.author.id == message.author.id;
			let letterQuantityMindCollector = message.channel.createMessageCollector(letterQuantityMindFilter, { time: 10000, max: 1 });

			letterQuantityMindCollector.on('collect', async(m, user) => {
				if(m.content == quantityChar) {
					message.channel.send("Correct!");
					correct = true;
				}
				else {
					message.channel.send("Wrong Answer!")
					correct = false;
				}
			});

			letterQuantityMindCollector.on('end', collected => {
				if(!collected.size){
					message.channel.send("You didn't answer in time!")
					message.channel.send("You got 0xp!");
				}
				if(correct) {
					message.channel.send(`You got ${3*2*userO.level} xp!`);
					currentExperience += 3*2*userO.level;
					checkLevelUp();
				}
				else message.channel.send("You got 0 xp!");
			});
		}

		/*speed-----------------------------------*/

		//speed train array
		let spdWords = ['speed', 'fast', 'movement', 'type', 'word', 'quick', 'velocity', 'spd', 'rpg', 'move', 'speed'];

		/*defense---------------------------------*/

		//defense train function
		function def(left){
			let filter = m => m.author.id == message.author.id;
			let ePos = Math.floor(Math.random()*3);
			ePosStr = (ePos==0?'left':(ePos==1?'middle':'right'));
			let map = ['🔳','🔳','🔳']
			map[ePos] = '👾';
			embed.setTitle('Training your Defense!').setDescription(`Answer with the position(Left/Right/Middle) the enemy(👾) to defend it!\n\n${map.join("")}`).setFooter(`${left} defense left!`);
			message.channel.send(embed).then(async() => {
				message.channel.awaitMessages(filter, { max: 1, time: 3000, errors: ['time'] }).then(collected => {

				if(collected.first().content==ePosStr)
					message.channel.send("You defended!");
				else {message.channel.send("You missed the enemy and didn't got any xp."); left=-1;}

				if(left>1)
					def(left-1);
				else if(left==1)
					message.channel.send(`You won ${6*userO.level+1}xp!`);
					currentExperience += 6*userO.level+1;
					checkLevelUp('defense');
			}).catch(collected => {
				if(collected.size==0)
					return message.channel.send(`You didn't answer in time and the enemy got you!`);
			})
			})
		}

		/*range-----------------------------------*/

		//range train function
		let rangeWonXp = 0;
		function range(left){
			let filter = m => m.author.id == message.author.id;
			hyp = Math.ceil(Math.random()*10);
			correct = '';
			embed.setTitle('Training your Range!').setDescription(`Type hyphen(-) ${hyp} times and then add a greater than(>) symbol after it!`);

			for(let i = 0; i<hyp; i++){
				correct += '-';
			}
			correct+='>';

			message.channel.send(embed).then(async() => {
				message.channel.awaitMessages(filter, { max: 1, time: 3000, errors: ['time'] }).then(collected => {

				if(collected.first().content==correct){
					message.channel.send("You got it!");
					rangeWonXp+=1;
				}
				else message.channel.send("Your range wasn't the exact long and you missed it...");

				if(left>1) range(left-1);
				
				else if(left==1)
					message.channel.send(`You won ${rangeWonXp}xp!`);
					currentExperience += rangeWonXp;
					checkLevelUp('range');
			}).catch(collected => {
				if(collected.size==0)
					return message.channel.send(`You didn't answer in time!`);
			})
			})
		}

		/*switch----------------------------------*/

		//switch for trains
		switch(args[0]){
			case 'xp':
				currentExperience = userO.xp;
				currentLevel = userO.level;
				level = currentLevel;

				randXp = Math.floor(Math.random()*3);
				if(randXp==0)
						numberXp();
				else if(randXp==1){
					embed.setTitle('Training your Mind!').setDescription('Quick! React the :brain: emoji as many times as you can!').setFooter('You have 5 seconds to react the emoji');

					let filterMind = (reaction, user) => {
						return reaction.emoji.name === '🧠' && user.id === message.author.id;
					};

					let mMind = await message.channel.send(embed)
					mMind.react("🧠");
					let collectedAmountMind = 0;
					let collectorMind = mMind.createReactionCollector(filterMind, { time: 5000 });

					collectorMind.on('collect', (reaction, user) => {
						collectedAmountMind++;
					});

					collectorMind.on('end', collected => {
						message.channel.send(`You got ${collectedAmountMind*userO.level} xp!`);
						currentExperience += collectedAmountMind*userO.level;
						checkLevelUp();
					});
				}
				else letterQuantityMind();
			break;

			case 'mind':
				currentExperience = userO.xp;
				currentLevel = userO.level;
				level = currentLevel;
				randXp = Math.floor(Math.random()*3);
				if(randXp==0)
						numberXp();
				else if(randXp==1){
					embed.setTitle('Training your Mind!').setDescription('Quick! React the :brain: emoji as many times as you can!').setFooter('You have 5 seconds to react the emoji');

					let filterMind = (reaction, user) => {
						return reaction.emoji.name === '🧠' && user.id === message.author.id;
					};

					let mMind = await message.channel.send(embed)
					mMind.react("🧠");
					let collectedAmountMind = 0;
					let collectorMind = mMind.createReactionCollector(filterMind, { time: 5000 });

					collectorMind.on('collect', (reaction, user) => {
						collectedAmountMind++;
					});

					collectorMind.on('end', collected => {
						message.channel.send(`You got ${collectedAmountMind*userO.level} xp!`);
						currentExperience += collectedAmountMind*userO.level;
						checkLevelUp();
					});
				}
				else letterQuantityMind();
			break;

			case 'attack':
				currentExperience = userO.attackXp;
				currentLevel = userO.attackLevel;
				level = currentLevel;
				embed.setTitle('Training your Attack!').setDescription('Quick! React the ⚔️ emoji as many times as you can!').setFooter('You have 5 seconds to react the emoji');

				let filterAtk1 = (reaction, user) => {
					return reaction.emoji.name === '⚔️' && user.id === message.author.id;
				};

				let mAtk1 = await message.channel.send(embed)
				mAtk1.react("⚔️");
				let collectedAmountAtk1 = 0;
				let collectorAtk1 = mAtk1.createReactionCollector(filterAtk1, { time: 5000 });
				
				collectorAtk1.on('collect', (reaction, user) => {
					collectedAmountAtk1++;
				});
				
				collectorAtk1.on('end', collected => {
					message.channel.send(`You got ${collectedAmountAtk1*userO.attackLevel} xp!`);
					currentExperience += collectedAmountAtk1*userO.attackLevel;
	
					checkLevelUp('attack');			
				});
			break;
			case 'atk':
				currentExperience = userO.attackXp;
				currentLevel = userO.attackLevel;
				level = currentLevel;
				embed.setTitle('Training your Attack!').setDescription('Quick! React the ⚔️ emoji as many times as you can!').setFooter('You have 5 seconds to react the emoji');
				let filterAtk2 = (reaction, user) => {
					return reaction.emoji.name === '⚔️' && user.id === message.author.id;
				};

				let mAtk2 = await message.channel.send(embed)
				mAtk2.react("⚔️");
				let collectedAmountAtk2 = 0;
				let collectorAtk2 = mAtk2.createReactionCollector(filterAtk2, { time: 5000 });
				
				collectorAtk2.on('collect', (reaction, user) => {
					collectedAmountAtk2++;
				});
				
				collectorAtk2.on('end', collected => {
					message.channel.send(`You got ${collectedAmountAtk2*userO.attackLevel} xp!`);
					currentExperience += collectedAmountAtk2*userO.attackLevel;
	
					checkLevelUp('attack');			
				});
			break;

			case 'defense':
				currentExperience = userO.defenseXp;
				currentLevel = userO.defenseLevel;
				level = currentLevel;
				def(5);
			break;
			case 'def':
				currentExperience = userO.defenseXp;
				currentLevel = userO.defenseLevel;
				def(5);
			break;

			case 'accuracy':
				currentExperience = userO.accuracyXp;
				currentLevel = userO.accuracyLevel;
				level = currentLevel;
				const filterAccuracy = m => m.author.id==message.author.id;
				const collectorAccuracy = message.channel.createMessageCollector(filterAccuracy, { time: 10000, max: 3 });

				await accFunction();

				collectorAccuracy.on('collect', async(m, user) => {
					accRounds++;
					if(m.content == accRabbitNumber) {
						accCollectedAmount++;
						message.channel.send('Correct!');
					}
					else {
						message.channel.send('Wrong answer!')
					}
					if(accRounds < 3) {
						await accFunction();
					}
				});

				collectorAccuracy.on('end', collected => {
					if(accCollectedAmount == 0) {
						message.channel.send("You didn't answer in time!");
					}
					else if(accCollectedAmount != 3) {
						message.channel.send("Time's Up!");
					}
					accRabbitNumber = null;
					accRounds = 0;
					message.channel.send(`You got ${accCollectedAmount*2*userO.accuracyLevel} xp!`);
					currentExperience += accCollectedAmount*2*userO.accuracyLevel;
	
					checkLevelUp('accuracy');		
				});
			break;
			
			case 'acc': 
				currentExperience = userO.accuracyXp;
				currentLevel = userO.accuracyLevel;
				level = currentLevel;
				const filterAcc = m => m.author.id==message.author.id;
				const collectorAcc = message.channel.createMessageCollector(filterAcc, { time: 10000, max: 3 });

				await accFunction();

				collectorAcc.on('collect', async(m, user) => {
					accRounds++;
					if(m.content == accRabbitNumber) {
						accCollectedAmount++;
						message.channel.send('Correct!');
					}
					else {
						message.channel.send('Wrong anwer!')
					}
					if(accRounds < 3) {
						await accFunction();
					}
				});

				collectorAcc.on('end', collected => {
					if(accCollectedAmount == 0) {
						message.channel.send("You didn't answer in time!");
					}
					else if(accCollectedAmount != 3) {
						message.channel.send("Time's Up!");
					}
					accRabbitNumber = null;
					accRounds = 0;
					message.channel.send(`You got ${accCollectedAmount*2*userO.accuracyLevel} xp!`);
					currentExperience += accCollectedAmount*2*userO.accuracyLevel;
	
					checkLevelUp('accuracy');
				});
			break;

			case 'speed':
				currentExperience = userO.speedXp;
				currentLevel = userO.speedLevel;
				level = currentLevel;
				embed.setTitle('Training your Speed!').setDescription('Quick! Follow the instructions below!').setFooter('You have 10 seconds to type 3 words!');
				let palavra1 = spdWords[Math.floor(Math.random()*spdWords.length)];

				const filterSpeed = m => m.author.id==message.author.id;

				const collectorSpeed = message.channel.createMessageCollector(filterSpeed, { time: 10000, max: 3 });

				let mSpeed = await message.channel.send(embed)
				message.channel.send(`Type \`${palavra1}\``)
				let collectedAmountSpeed = 0;

				let collected1=0;
				
				collectorSpeed.on('collect', (m, user) => {
					collected1++;
					if(m.content == palavra1){
						collectedAmountSpeed++;
						message.channel.send("Correct!")
					}
					else{
						message.reply("wrong word!")
					}
					if(collected1!=3){
						palavra1 = spdWords[Math.floor(Math.random()*spdWords.length)];
						message.channel.send("Now type `"+palavra1+'`!');
					}
				});
				
				collectorSpeed.on('end', collected => {
					if(collectedAmountSpeed == 0) {
						message.channel.send("You didn't answer in time!");
					}
					else if(collectedAmountSpeed != 3) {
						message.channel.send("Time's Up!");
					}
					message.channel.send(`You got ${collectedAmountSpeed*2*userO.speedLevel} xp!`);
					currentExperience += collectedAmountSpeed*2*userO.speedLevel;
	
					checkLevelUp('speed');			
				});
			break;
			
			case 'spd':
				currentExperience = userO.speedXp;
				currentLevel = userO.speedLevel;
				level = currentLevel;
				embed.setTitle('Training your Speed!').setDescription('Quick! Follow the instructions below!').setFooter('You have 10 seconds to type 3 words!');
				let palavra = spdWords[Math.floor(Math.random()*spdWords.length)];

				const filterSpd = m => m.author.id==message.author.id;

				const collectorSpd = message.channel.createMessageCollector(filterSpd, { time: 10000, max: 3 });

				let mSpd = await message.channel.send(embed)
				message.channel.send(`Type \`${palavra}\``)
				let collectedAmountSpd = 0;

				let collected=0;
				
				collectorSpd.on('collect', (m, user) => {
					collected++;
					if(m.content == palavra){
						collectedAmountSpd++;
						message.channel.send("Correct!")
					}
					else{
						message.reply("wrong word!")
					}
					if(collected!=3){
						palavra = spdWords[Math.floor(Math.random()*spdWords.length)];
						message.channel.send("Now type `"+palavra+'`!');
					}
				});
				
				collectorSpd.on('end', collected => {
					if(collectedAmountSpd == 0) {
						message.channel.send("You didn't answer in time!");
					}
					else if(collectedAmountSpd != 3) {
						message.channel.send("Time's Up!");
					}
					message.channel.send(`You got ${collectedAmountSpd*2*userO.speedLevel} xp!`);
					currentExperience += collectedAmountSpd*2*userO.speedLevel;
	
					checkLevelUp('speed');			
				});
			break;

			case 'range':
				currentExperience = userO.rangeXp;
				currentLevel = userO.rangeLevel;
				level = currentLevel;
				range(3);
			break;

			default:
				return message.reply(`There is no such area to train. Use \`${prefix}help train\` to get more information.`);
			break;
		}

		/*message.channel.send(character).then(async() => {
			message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] }).then(collected => {
			
		}).catch(collected => {
			if(collected.size==0)
				return message.channel.send(`Proccess cancelled, you didn't answer in time`);

			else if(cancelled) return message.channel.send("Proccess Cancelled, invalid answer provided");
		})
		})*/
  }
}	