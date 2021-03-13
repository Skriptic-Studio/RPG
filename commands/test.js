module.exports={
    name:'test',
    description: "Test",
		detail: "Test",
		//register: true,
		args: true,
		test: true,
		usage: "",
		cooldown: '5 seconds',
    async execute(message, args){
			var fightUsers;
			const Discord = require("discord.js");
			const Keyv = require("keyv");
			const usersDb = new Keyv("sqlite://./databases/users.sqlite");
			var embed = new Discord.MessageEmbed().setColor("#FF0000");

			function fight(user){
				embed.setDescription(`It's ${user}'s turn!`)
				message.channel.send(embed);
			}

			if(!message.mentions.users.size){
				embed.setTitle("No Mentions").setDescription("You didn't mention any user!");
				return message.channel.send(embed);
			}
			else{
				var target=message.mentions.users.first();
				var userO = await usersDb.get(`user - ${target.id}`);
			}

			if(target.bot){
				embed.setTitle("Bot Fight").setDescription("You can't fight a bot!");
				return message.channel.send(embed);
			}
			else if(!userO){
				embed.setTitle("Not registered").setDescription("The user you are trying to fight is not registered!");
				return message.channel.send(embed);
			}

			fightUsers = `${message.author.username} v.s. ${target.username}`;

			embed.setTitle("Fight Request").setDescription(`${target.username}, ${message.author.username} sent you a fight request! Will you accept it?\nAnswer with yes/no(y/n)!`).setColor("#00FF00");
			message.channel.send(embed);
			embed.setDescription("");
			const filter = m => m.author == target;
			const collector = message.channel.createMessageCollector(filter,{time: 15000, max: 1});

			collector.on('end', collected => {
				if(!collected.size){
					embed.setTitle(`${target.username} didn't answer in time!`).setColor("FF0000");
					return message.channel.send(embed);
				}
				else if(collected.first().content.toLowerCase()=='y'||collected.first().content.toLowerCase()=='yes'){
					embed.setTitle(`${target.username} accepted your fight request!`).setColor("#00FF00");
					message.channel.send(embed);
					
					embed.setTitle(fightUsers).setDescription("Let the fight begin!").setColor("#0000FF");
					message.channel.send(embed);
					fight(message.author);
				}
				else if(collected.first().content.toLowerCase()=='n'||collected.first().content.toLowerCase()=='no'){
					embed.setTitle(`${target.username} rejected your fight request!`).setColor("#FF0000");
					return message.channel.send(embed);
				}
				else{
					embed.setTitle(`${target.username} provided and invaid answer!`).setColor("#FF0000");
					return message.channel.send(embed);
				}
			});
    }
};