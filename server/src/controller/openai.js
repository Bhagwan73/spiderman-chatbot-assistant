require('dotenv').config({path:"./.env"});

const {Configuration,OpenAIApi}=require("openai")

const configuration=new Configuration({
    organization:process.env.ORGANIZATION_ID,
    apiKey:process.env.API_KEY
})

exports.openai=new OpenAIApi(configuration)  