const Discord = require('discord.js');
const keep_alive = require('./web/keep_alive.js');
const fs = require('fs');
const ms = require('ms');
const Keyv = require('keyv');
const db = new Keyv('sqlite://./databases/main.sqlite');
const userDb = new Keyv('sqlite://./databases/users.sqlite');
const cooldown = new Keyv('sqlite://./databases/cooldown.sqlite');

const { checkmark, crossmark, warning, loading, tool } = require('./config/thumbnail.json');

const { ownerID, tester } = require('./config/main.json');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
	console.log('Ready!');
	client.user.setActivity("r.help | People level up.", { type: "WATCHING" });
});

client.on("guildCreate", async guild => {
	console.log("Joined a new guild: " + guild.name);
	await db.set(`prefix - ${message.guild.id}`, 'r.');
})


client.on('message', async message => {
	if (message.channel.type == 'dm') { prefix = 'r.'; }
	else {
		prefix = await db.get(`prefix - ${message.guild.id}`) || "r.";
	}

	if (message.mentions.has(client.user.id)) {
		const embed = new Discord.MessageEmbed()
			.setTitle("You pinged me!")
			.setDescription("My prefix is " + prefix)
			.setColor("#0000ff");
		return message.channel.send(embed)
	};
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.toLowerCase().slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	if (command.guildOnly && message.channel.type === 'dm') {
		const embed = new Discord.MessageEmbed()
			.setTitle("DM")
			.setDescription('I can\'t execute that command inside DMs!')
			.setColor('#ff0000')
			.setThumbnail(crossmark);

		return message.channel.send(embed);
	}

	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments!`;

		if (command.usage) {
			reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
		}

		const embed = new Discord.MessageEmbed()
			.setTitle("Arguments")
			.setDescription(reply)
			.setFooter('<> = required argument and [] = opcional argument')
			.setThumbnail(crossmark);
		return message.channel.send(embed);
	}

	if (command.register) {
		if (!await userDb.get(`user - ${message.author.id}`)) {
			const embed = new Discord.MessageEmbed()
				.setTitle("Not registered")
				.setDescription(`You need to register using ${prefix}start before using this command!`)
				.setColor('#ff0000')
				.setThumbnail(crossmark);
			return message.channel.send(embed);
		}
	}

	if (command.test) {
		if (!tester.includes(message.author.id)) {
			return;
		}
	}

	if (command.permissions) {
		if (command.permissions == 'OWNER') {
			if (message.author.id != ownerID) {
				return;
			}
		}
		const authorPerms = message.channel.permissionsFor(message.author);
		if (!authorPerms || !authorPerms.has(command.permissions)) {
			const embed = new Discord.MessageEmbed()
				.setTitle("Permission")
				.setDescription("You don't have enough permission to do that!")
				.setThumbnail(crossmark);
			return message.channel.send(embed);
		}
	}

	/*if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = ms(command.cooldown||'1 second');

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now);
			return message.reply(`please wait ${ms(timeLeft, {long: true})} before reusing the \`${command.name}\` command.`);
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);*/

	if (command.cooldown) {
		let userCd = await cooldown.get(`cooldown - ${message.author.id}`);
		if(!userCd){
			await cooldown.set(`cooldown - ${message.author.id}`, {});
			userCd = await cooldown.get(`cooldown - ${message.author.id}`);
		}
		if (userCd[command.name]) {
			if (userCd[command.name] < Date.now()) {
				userCd[command.name] = parseInt(ms(command.cooldown)) + parseInt(Date.now());
			}
			else { return message.reply(`Please wait more ${(userCd[command.name]-Date.now()<1000)?'0 seconds':ms(userCd[command.name]-Date.now(), {long: true})} before using this command`) }
		}
		else {
			userCd[command.name] = parseInt(ms(command.cooldown)) + parseInt(Date.now());
		}
		await cooldown.set(`cooldown - ${message.author.id}`, userCd);
	}

	try {
		command.execute(message, args, client);
	} catch (error) {
		console.error(error);
		const embed = new Discord.MessageEmbed()
			.setTitle("Error")
			.setDescription('There was an error executing that command!')
			.setColor('#ff0000')
			.setThumbnail(crossmark);
		message.channel.send(embed);
	}
});

client.login(process.env.DISCORD_TOKEN);
