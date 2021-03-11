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
		.addField('Level: ', `${userO.level} (${userO.xp+'/'+(Math.pow(userO.level*2, 2)+'xp')})`)
		
		message.channel.send(embed);
  }
};