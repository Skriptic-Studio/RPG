module.exports={
    name:'botinfo',
    description: "Shows the bot's info",
		usage: '',
		guildOnly: true,
    async execute(message, args, client){
			const Discord = require("discord.js")
			const info = new Discord.MessageEmbed()
			.setTitle("RPG's info")
			.setColor('#0ff')
			.setThumbnail(client.user.displayAvatarURL({ format: "png", dynamic: true }))
			.addFields(
				{ name: 'Bot Version', value: '0.0.1' },
				{ name: 'Guild Count', value: `${client.guilds.cache.size}`, inline: true },
				{ name: 'Ping', value: `${Date.now() - message.createdTimestamp}`, inline: true },
				{ name: 'Developers', value: '<@793963605682552862>\n<@460429419404853248>'},
				{ name: 'Graphic Designer', value: '<@336669775964930050>'},
			)
			.setFooter("By Skriptic Studio", "https://media.discordapp.net/attachments/790916584168226856/800417826393292870/sks.png")
      
			message.channel.send(info);
      }
};