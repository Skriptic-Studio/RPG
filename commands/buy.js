module.exports={
	name: 'buy',
	description: 'Buy items from hour shop',
	details: '',
	register: true,
	test: true,
	args: true,
	aliases: ['b'],
	//cooldown: '30 seconds',
	async execute(message, args, client){
		const Discord = require("discord.js")
		const Keyv = require("keyv")
		const usersDb = new Keyv('sqlite://./databases/users.sqlite')
		const mainDb = new Keyv('sqlite://./databases/main.sqlite')
		const userO = await usersDb.get(`user - ${message.author.id}`);
		const shop = new Keyv('sqlite://./databases/shop.sqlite')

		const embed = new Discord.MessageEmbed();

		
	}
}//vou dar backup no código, sorria :)//:), coloquei 6 int no 