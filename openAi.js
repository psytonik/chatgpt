import {Configuration, OpenAIApi} from 'openai';
import dotenv from 'dotenv';
dotenv.config();

const configuration = new Configuration({
	apiKey: process.env.OPEN_AI_API_KEY,
	organization: process.env.OPEN_AI_ORGANIZATION
})
const openAi = new OpenAIApi(configuration);

const runCompletion = async (message) => {
	try{
		const completion = await openAi.createCompletion({
			model: "text-davinci-003",
			prompt: message,
			max_tokens: 4000,
			temperature: 0.9,
		})
		return completion.data.choices[0].text;
	} catch (e) {
		if(e instanceof Error){
			console.log(e.message);
		}
	}
};

export default runCompletion;
