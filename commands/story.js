module.exports = {
	name: 'story',
	description: 'Get the story of the game',
	aliases: ['stories'],
	cooldown: '5 seconds',
	execute(message){
		const Discord = require('discord.js')
		const embed = new Discord.MessageEmbed()
		.setTitle("Story of \\*\\*\\*\\*\\*\\*")
		.setDescription(`Long ago, the Gods ruled the Multiverse peacefully until one day, when the system collapsed. The younger God got mad at the Supreme God and decided to do something to destroy the entire Multiverse.\nOne night, while all the Gods were sleeping, the Younger God escaped from the God's Land and went to the Forbidden Land, where the Forbidden Monsters were locked. The Younger God asked the Forbidden Monsters to destroy the entire Multiverse, and in return, he would unlock them.\nWhen the Forbidden Monsters saw themselves free, they started to destroy every single thing they saw, including the younger God.\nWhen the Supreme God noticed the fact, it was too late, the monsters broke into the God's Land and captured the God and stabbed him. Right before the God's death, he dropped a magic spell that fell on  Earth and knew that it would save the Multiverse from the Forbidden Monsters.\n\nThis is the beginning of the \\*\\*\\*\\*\\*\\*, the saviors of the Multiverse.\nHundreds of years passed and the human's technology evolved. One day, the scientist got a strange signal from the space. Every day since then, the same signal is received by the scientists, that worked day and night to decode it.\nFinally, after a few months, the scientist could understand the signal. The decoded words was: "Supreme... God... Earth... Spell..... Multiverse...... The Humans... Savior...". When the media knew it, the entire internet was posting about this kind of stuff.\nA few people, including ${message.author.username} felt strange that day. But after a few days, on their dreams(that was the same through the time) they were informed about everything, and knew that they were the descendant of the human's affected by the spell, and they were chosen to save the Multiverse.\n\nAn Adventure Begins!`)
		.setFooter("Use `<prefix>start` to check the how to play");
		message.channel.send(embed);
	}
}