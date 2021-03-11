module.exports={
    name:'reset',
    description: "Pong",
		usage: '',
		guildOnly: true,
		register: true,
		test: true,

    async execute(message, args){
			const Discord = require("discord.js");
			const Keyv = require("keyv");
			const target = message.author.id;
			userDb = new Keyv("sqlite://./databases/users.sqlite");
			await userDb.delete(`user - ${target}`);
			message.reply("succesfully reset your data");
      }
};