module.exports={
  name:'profile',
  description: "Show the user profile",
	aliases:['p', 'stat', 'stats', 'user', 'userinfo'],
	usage: '[user]',
	guildOnly: true,
	register: true,

  async execute(message, args, client){
		const Discord = require("discord.js")
		const Keyv = require("keyv");
		const userDb = new Keyv("sqlite://./databases/users.sqlite");
		let target = (message.mentions.users.size?message.mentions.users.first():message.author)

		var userO = await userDb.get(`user - ${target.id}`);

		if(!userO) return message.reply(`${target.username} isn't registered!`);

		const melee = client.emojis.cache.find(emoji => emoji.name == "melee");
		const ranged = client.emojis.cache.find(emoji => emoji.name == "range");
		const mage = client.emojis.cache.find(emoji => emoji.name == "mage");

		const onz = client.emojis.cache.find(emoji => emoji.name == "onz");
		const speed = client.emojis.cache.find(emoji => emoji.name == "speed");
		const attack = client.emojis.cache.find(emoji => emoji.name == "attack");
		const defense = client.emojis.cache.find(emoji => emoji.name == "defense");
		const range = client.emojis.cache.find(emoji => emoji.name == "range");
		const accuracy = client.emojis.cache.find(emoji => emoji.name == "accuracy");

		const sword = client.emojis.cache.find(emoji => emoji.name == "sword");
		const machete = client.emojis.cache.find(emoji => emoji.name == "machete");
		const spear = client.emojis.cache.find(emoji => emoji.name == "spear");
		const bow = client.emojis.cache.find(emoji => emoji.name == "bow");
		const slingshot = client.emojis.cache.find(emoji => emoji.name == "slingshot");
		const dart = client.emojis.cache.find(emoji => emoji.name == "dart");
		const magic_wand = client.emojis.cache.find(emoji => emoji.name == "magic_wand");
		const staff = client.emojis.cache.find(emoji => emoji.name === "staff");
		const magic_gloves = client.emojis.cache.find(emoji => emoji.name == "magic_gloves");

		var weaponEmote = (weapon) => {
			if(weapon.toLowerCase()=='sword') return sword;
			if(weapon.toLowerCase()=='machete') return machete;
			if(weapon.toLowerCase()=='spear') return spear;
			if(weapon.toLowerCase()=='bow') return bow;
			if(weapon.toLowerCase()=='slingshot') return slingshot;
			if(weapon.toLowerCase()=='dart') return dart;
			if(weapon.toLowerCase()=='magic wand') return magic_wand;
			if(weapon.toLowerCase()=='staff') return staff;
			if(weapon.toLowerCase()=='magic gloves') return magic_gloves;
		}

		let formula = (area, areaLevel) => {
			return (area*(Math.pow(areaLevel, 1.5))).toFixed(2);
		}

		let embed = new Discord.MessageEmbed()
		.setTitle(`${target.username}#${target.discriminator}`)
		.setColor('#FFFF00')
		.setThumbnail(target.avatarURL())

		.addField(`Type: `, `${(userO.type=='Melee'?melee:(userO.type=='Ranged'?ranged:mage))} ${userO.type}`)
		.addField('Weapon: ', `${weaponEmote(userO.weapon)} ${userO.weapon}`)
		.addField('Level: ', `${userO.level} (${userO.xp+'/'+(Math.pow(userO.level*2, 2)+'xp')})`)
		.addField(`${onz} Coins: `, `${userO.coins} ${(userO.coins==1?' Onz':' Onzes')}`)
		.addField(`${attack} Attack: `, `${formula(userO.attack, userO.attackLevel)} (Level ${userO.attackLevel})`, true)
		.addField('\u200B','\u200B', true)
		.addField(`${defense} Defense: `, `${formula(userO.defense, userO.attackLevel)} (Level ${userO.defenseLevel})`, true)
		.addField(`${speed} Speed: `, `${formula(userO.speed, userO.speedLevel)} (Level ${userO.speedLevel})`, true)
		.addField('\u200B','\u200B', true)
		.addField(`${range} Range: `, `${formula(userO.range, userO.rangeLevel)} (Level ${userO.rangeLevel})`, true)
		.addField(`${accuracy} Accuracy: `, `${formula(userO.accuracy, userO.accuracyLevel)} (Level ${userO.accuracyLevel})`, true)

		.setFooter("By Skriptic Studio", "https://media.discordapp.net/attachments/790916584168226856/800417826393292870/sks.png")
		
		message.channel.send(embed);
  }
};