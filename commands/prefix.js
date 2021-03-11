module.exports={
    name:'prefix',
    description: "Prefix",
		guildOnly: true,
		usage: '[new prefix]',
    async execute(message, args){
			const Discord = require("discord.js")
			const Keyv = require("keyv")
			const db = new Keyv('sqlite://./databases/main.sqlite')

			var prefix = (await db.get(`prefix - ${message.guild.id}`)||'r.')

			const prefixE = new Discord.MessageEmbed()
			.setTitle('Prefix')
			.setDescription(`The prefix is ${prefix}`)
			.setColor('#0ff')

			const no_perms = new Discord.MessageEmbed()
			.setTitle('No perms')
			.setDescription(`You don't have enough perms to change the prefix!`)
			.setColor('#ff0000')
			.setThumbnail('https://emoji.gg/assets/emoji/9636_Cross.png')
      
			const setPrefix = new Discord.MessageEmbed()
			.setTitle('Prefix')
			.setColor('#0ff')

			const prefixSize = new Discord.MessageEmbed()
			.setTitle('Invalid Prefix')
			.setDescription('Your prefix length should be between 1 and 5 characters')
			.setColor('#ff0000')
			.setThumbnail('https://emoji.gg/assets/emoji/9636_Cross.png');

			if(!args[0]) return message.channel.send(prefixE);
			if(args.join(" ").length<1||args.join(" ").length>5) return message.channel.send(prefixSize);

			else{
				const authorPerms = message.channel.permissionsFor(message.author);
		 		if (!authorPerms || !authorPerms.has('MANAGE_GUILD')) return message.channel.send(no_perms);
				await db.set(`prefix - ${message.guild.id}`, args.join(" "))
				setPrefix.setDescription("Prefix changed to "+ await db.get(`prefix - ${message.guild.id}`));
				return message.channel.send(setPrefix);
			}
      }
};