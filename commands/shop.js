module.exports={
	name: 'shop',
	description: 'Hour shop',
	details: '',
	register: true,
	test: true,
	args: false,
	aliases: ['sh'],
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

		function checkRarity(rarity) {
			if(rarity == "common") return ":white_large_square:";
			if(rarity == "uncommon") return ":green_square:";
			if(rarity == "rare") return ":yellow_square:";
			if(rarity == "exotic") return ":orange_square:";
			if(rarity == "legendary") return ":red_square:";
		}

		message.channel.send(embed
		.setColor(`#CA00B0`)
		.setTitle("Shop")
		.addField('**Name**', `${i1.name}\n- - -\n${i2.name}\n- - -\n${i3.name}\n- - -\n${i4.name}\n- - -\n${i5.name}\n- - -\n${i6.name}`, true)
		.addField('**Rarity**', `${checkRarity(i1.rarity)}\n- - -\n${checkRarity(i2.rarity)}\n- - -\n${checkRarity(i3.rarity)}\n- - -\n${checkRarity(i4.rarity)}\n- - -\n${checkRarity(i5.rarity)}\n- - -\n${checkRarity(i6.rarity)}`, true)
		.addField('**Cost**', `${onz}${i1.cost}\n- - -\n${onz}${i2.cost}\n- - -\n${onz}${i3.cost}\n- - -\n${onz}${i4.cost}\n- - -\n${onz}${i5.cost}\n- - -\n${onz}${i6.cost}`, true)
		.setFooter("This shop is updated every 2 hours!"));
	}
}