exports.collector= async(mens, time, max, id)=>{
	const filter = m => m.author.id == id;
	
	mens.send("testt").then(async() => {
		await mens.awaitMessages(filter, { max: max, time: time, errors: ['time'] })
			.then(collected => {
				return (`${collected.first().author} got the correct answer!`);
			})
			.catch(collected => {
				return ('Looks like nobody got the answer this time.');
			});
	});
}


exports.start = async(message,embed,userO,setup) => {
	//var setup = '1';
	let filter = m => m.author.id == message.author.id;
	//console.log(m)
	//const collector = message.channel.createMessageCollector(filter, { time: 60000 });

	var cancelled = false;

	message.channel.send(embed).then(() => {
		message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] }).then(collected => {
		var m = collected.first().content;
	
		console.log('Collected')
	
		switch(setup){
			case 'invalid':
				message.channel.send("Invalid");
				return;
			break;
			case '1':
	
				if(!parseInt(m)||parseInt(m)<=0||parseInt(m)>3) {
					setup = 'invalid';
					return setup;
					//return cancelled = true;
				}

				else{
					if(m=='1'){
						setup = 'melee';
						return setup;
						//userO.type = 'Melee';
						//message.channel.send("Melee type, nice. Now lets set your weapon.")
					}
					else if(m=='2'){
						setup = 'ranged';
						return setup;
						//userO.type = 'Ranged';
						//message.channel.send("Ranged type, nice. Now lets set your weapon.")
					}
					else{
						setup = 'mage';
						return setup;
						//userO.type = 'Mage';
						//message.channel.send("Mage type, nice. Now lets set your weapon.")
					}								
				}
			break;
	
			case 'melee':
				console.log(m)
				cancelled = true;
			break;	
		
		}
	
	})
	})
	
	.catch(collected => {
		if(collected.size==0)
			message.channel.send(`Proccess cancelled, you didn't answer in time`)
		else if(cancelled){return message.channel.send("Proccess Cancelled, invalid answer provided");}
		
		else{
			console.log(`${message.author.id}/${message.author.username} joined`)
		}
	});
}