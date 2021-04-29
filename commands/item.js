module.exports = {
	name: "item",
	description: "Get items information",
	aliases: ["items", "iteminfo", "item-info"],
	async execute(message, args){
		const Discord = require("discord.js");
		const Keyv = require("keyv");
		const embed = new Discord.MessageEmbed();
		const db = new Keyv('sqlite://./databases/main.sqlite');

		var prefix = await db.get(`prefix - ${message.guild.id}`)||'r.';

		var items = require("../config/items.json");
		let keys = Object.keys(items);

		/*try{
			var itemsObj = JSON.parse(itemsJSON);
		} catch (e) {
			console.error(e);
		}*/

		if(!args.length){
			message.channel.send(embed.setTitle("No arguments!").setDescription(`You need to provide what item's info you want to.\nThe correct usage would be: \`${prefix}item <item id/full name>\``));
		}
		var itemRequested;
		if(parseInt(args[0])||parseInt(args[0])==0){
			for(let i of keys){
				if(items[i].id != args[0]) continue;
				itemRequested = i;
			}
			if(!itemRequested){
				return message.channel.send(embed.setTitle("Invalid ID").setDescription(`You provided an invalid item id!\nThe correct usage would be: \`${prefix}item <item id/full name>\``))
			}
		} else {
			if(items[args.join('_').toLowerCase()]){
				itemRequested = args.join('_').toLowerCase();
			} else {
				return message.channel.send(embed.setTitle("Invalid Item").setDescription(`You provided an invalid item name!\nThe correct usage would be: \`${prefix}item <item id/full name>\``))
			}
		}
		message.channel.send(embed.setTitle(itemRequested.split('_').join(" ")).setDescription(`**ID:** ${items[itemRequested].id}\n**Description:** ${items[itemRequested].description}\n`));
	}
}