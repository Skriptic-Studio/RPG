module.exports = {
	name: 'help',
	description: 'Help Command',
	details: 'Command list or information about a specific command',
	aliases: ['h', 'cmd', 'cmds', 'commands', 'command'],
	usage: '[command name]',
	cooldown: '5 seconds',
	async execute(message, args) {
		const { checkmark, crossmark, warning, loading, tool } = require('../config/thumbnail.json')
		const Keyv = require("keyv");
		const ms = require('ms');
		const Discord = require("discord.js");
			const db = new Keyv('sqlite://./databases/main.sqlite');

			var prefix = (await db.get(`prefix - ${message.guild.id}`)||'r.');

			const comandos = new Discord.MessageEmbed()
			.setTitle('Commands')
			.setColor('#00ff00')
			.setFooter(`Use ${prefix}help [command] to get info about a specific command!`)
			.setThumbnail(tool)

			const cmdDetail = new Discord.MessageEmbed()
			.setColor('#00ff00')
			.setThumbnail(tool)

			const invalidCmd = new Discord.MessageEmbed()
			.setColor('#ff0000')
			.setTitle('Invalid')
			.setDescription('Invalid command provided')
			.setThumbnail(crossmark);


			const data = [];
			const { commands } = message.client;

			if (!args.length) {
				data.push(commands.map(command => (!command.test||!command.permissions=='OWNER')?(prefix + command.name + ' - ' + command.description):'').filter(n => n).join('\n'));

				comandos.setDescription(data)
				return message.channel.send(comandos);
	};


				const name = args[0].toLowerCase();
				const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

				if (!command) {
					return message.channel.send(invalidCmd);
				}

				cmdDetail.setTitle(`**Command:** ${command.name}`)

				data.push(`**Aliases:** ${(command.aliases||['none']).join(', ')}`);
				data.push(`**Description:** ${(command.details||command.description||'none')}`);
				data.push(`**Usage:** ${prefix}${command.name} ${(command.usage||'')}`);

				if(command.cooldown) data.push(`**Cooldown:** ${ms(ms(command.cooldown), {long: true}) || '0 seconds'}`);
				data.push(`**Private:** ${(command.test||command.permissions == 'OWNER'?'true':'false')}`);

				cmdDetail.setDescription(data);

				message.channel.send(cmdDetail);
	},
};
