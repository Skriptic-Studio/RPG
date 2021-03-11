module.exports={
    name:'test',
    description: "Test",
		detail: "Test",
		//register: true,
		test: true,
		usage: "",
		cooldown: '5 seconds',
    async execute(message, args){
			/*const test = require("../modules/mdl.js")
			const clt = test.collector((message.channel, 1000, 1, message.author)||"error").then(() =>
			{
				console.log('yes1');
				message.channel.send(clt);
			})
			console.log("yes")*/

			message.reply(1212);
    }
};