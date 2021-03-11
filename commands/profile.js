module.exports={
  name:'profile',
  description: "Show the user profile",
	aliases:['p', 'stat', 'stats', 'user', 'userinfo'],
	usage: '[user]',
	guildOnly: true,
	
  async execute(message, args){
		const Discord = require("discord.js")
		const Keyv = require("keyv");
		const userDb = new Keyv("sqlite://./databases/users.sqlite");
		let target = (message.mentions.users.size?message.mentions.users.first():message.author)

		var userO = await userDb.get(`user - ${target.id}`);

		let embed = new Discord.MessageEmbed()
		.setTitle(`${target.username}#${target.discriminator}`)
		.setColor('#FFFF00')
		.setThumbnail(message.author.avatarURL())
		.addField('Type: ', `${userO.type}`)
		.addField('Weapon: ', `${userO.weapon}`)
		.addField('Level: ', `${userO.level} (${userO.xp+'/'+(Math.pow(userO.level*2, 2)+'xp')})`)
		.addField('Coins: ', `${userO.coins}`)
		
		message.channel.send(embed);
  }
};