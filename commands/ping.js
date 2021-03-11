module.exports={
    name:'ping',
    description: "Pong",
		usage: '',
		guildOnly: true,
    async execute(message, args){
			const Discord = require("discord.js")
			const ping = new Discord.MessageEmbed()
			.setTitle('Ping')
			.setDescription(`Latency of ${Date.now() - message.createdTimestamp}ms`)
			.setColor('#0ff')
			.setThumbnail('https://images.emojiterra.com/google/android-oreo/512px/1f3d3.png');
      
			message.channel.send(ping);
    }
};