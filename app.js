
import qrcode from 'qrcode-terminal';
import whatsappPkg from "whatsapp-web.js";
import axios from 'axios';
import runCompletion from "./openAi.js";

const {Client, LocalAuth} = whatsappPkg;

const client = new Client({
	authStrategy: new LocalAuth()
});

await client.on('qr',(qr)=>{
	qrcode.generate(qr, {small: true})
});

await client.on('ready', ()=>{
	console.log('Client is ready')
});

await client.initialize();


client.on('message', async message =>{
	if(message.body.startsWith('#')){
		runCompletion(message.body.substring(1)).then(async (result) => {
			console.log(result, 'result');
			await message.reply(result);
		})
	}
	else if(message.body === 'pls joke') {
		const { data } = await axios.get('https://v2.jokeapi.dev/joke/Any?type=single');
		console.log(data.joke)
		await client.sendMessage(message.from, data.joke)
	}
})
