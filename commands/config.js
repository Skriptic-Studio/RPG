/*module.exports={
    name:'config',
    description: "Reconfigura o server",
		details: "Configura o prefix e outras funções do server, use esse comando se for sua primeira vez ou para resetar database",
    async execute(message, args){

		const Discord = require('discord.js');
		const fs = require('fs');
		const Keyv = require('keyv');
		const db = new Keyv('sqlite://./databases/main.sqlite')

		await db.set(message.guild.id + ' prefix', 'r.');
		var prefix =	await db.get(message.guild.id + ' prefix');

		message.channel.send('done')

  }
};*/