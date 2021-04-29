module.exports={
	name: 'shop2',
	description: 'Hour shop',
	details: '',
	register: true,
	test: true,
	args: false,
	aliases: ['sh2'],
	//cooldown: '1 minutes',
	async execute(message, args, client){
		const Discord = require("discord.js")
		const Keyv = require("keyv")
		const usersDb = new Keyv('sqlite://./databases/users.sqlite')
		const mainDb = new Keyv('sqlite://./databases/main.sqlite')
		const userO = await usersDb.get(`user - ${message.author.id}`);
		const shop = new Keyv('sqlite://./databases/shop.sqlite')

		const embed = new Discord.MessageEmbed();
		
		const i1 = await shop.get('common1');
		const i2 = await shop.get('common2');
		const i3 = await shop.get('common_uncommon');
		const i4 = await shop.get('uncommon_rare1');
		const i5 = await shop.get('uncommon_rare2');
		const i6 = await shop.get('rare_exotic_legendary');

		const onz = client.emojis.cache.find(emoji => emoji.name == "onz");

		var emoji = (rarity) => {
			if(rarity == "common") return ":white_large_square:";
			if(rarity == "uncommon") return ":green_square:";
			if(rarity == "rare") return ":yellow_square:";
			if(rarity == "exotic") return ":orange_square:";
			if(rarity == "legendary") return ":red_square:";
		}
		/*message.channel.send(embed
		.setTitle("Shop")

		.addField(`**${i1.name}** - Costs ${i1.cost} ${onz}`, `${emoji(i1.rarity)} **${i1.rarity[0].toUpperCase() + i1.rarity.slice(1, i1.rarity.length)}** - ${i1.description}`, true)
		.addField(`**${i2.name}** - Costs ${i2.cost} ${onz}`, `${emoji(i2.rarity)} **${i2.rarity[0].toUpperCase() + i2.rarity.slice(1, i2.rarity.length)}** - ${i2.description}`, true)
		.addField(`**${i3.name}** - Costs ${i3.cost} ${onz}`, `${emoji(i3.rarity)} **${i3.rarity[0].toUpperCase() + i3.rarity.slice(1, i3.rarity.length)}** - ${i3.description}`, true)
		.addField(`**${i4.name}** - Costs ${i4.cost} ${onz}`, `${emoji(i4.rarity)} **${i4.rarity[0].toUpperCase() + i4.rarity.slice(1, i4.rarity.length)}** - ${i4.description}`, true)
		.addField(`**${i5.name}** - Costs ${i5.cost} ${onz}`, `${emoji(i5.rarity)} **${i5.rarity[0].toUpperCase() + i5.rarity.slice(1, i5.rarity.length)}** - ${i5.description}`, true)
		.addField(`**${i6.name}** - Costs ${i6.cost} ${onz}`, `${emoji(i6.rarity)} **${i6.rarity[0].toUpperCase() + i6.rarity.slice(1, i6.rarity.length)}** - ${i6.description}`, true)

		.setFooter("This shop is updated every 2 hours!"));*/

		message.channel.send(embed
		.setTitle("Shop")
		.setColor("#CC00B0")
		.setFooter("This shop is updated every 2 hours!")

		.addField(`**${i1.name}** - Costs ${i1.cost} ${onz}`, `${emoji(i1.rarity)} **${i1.rarity[0].toUpperCase() + i1.rarity.slice(1, i1.rarity.length)}** - ${i1.description}`)
		.addField(`**${i2.name}** - Costs ${i2.cost} ${onz}`, `${emoji(i2.rarity)} **${i2.rarity[0].toUpperCase() + i2.rarity.slice(1, i2.rarity.length)}** - ${i2.description}`)
		.addField(`**${i3.name}** - Costs ${i3.cost} ${onz}`, `${emoji(i3.rarity)} **${i3.rarity[0].toUpperCase() + i3.rarity.slice(1, i3.rarity.length)}** - ${i3.description}`)
		.addField(`**${i4.name}** - Costs ${i4.cost} ${onz}`, `${emoji(i4.rarity)} **${i4.rarity[0].toUpperCase() + i4.rarity.slice(1, i4.rarity.length)}** - ${i4.description}`)
		.addField(`**${i5.name}** - Costs ${i5.cost} ${onz}`, `${emoji(i5.rarity)} **${i5.rarity[0].toUpperCase() + i5.rarity.slice(1, i5.rarity.length)}** - ${i5.description}`)
		.addField(`**${i6.name}** - Costs ${i6.cost} ${onz}`, `${emoji(i6.rarity)} **${i6.rarity[0].toUpperCase() + i6.rarity.slice(1, i6.rarity.length)}** - ${i6.description}`)
		)
	}
}