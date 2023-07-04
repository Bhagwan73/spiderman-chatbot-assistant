const { openai } = require("./openai")
require('dotenv').config({path:"./.env"});

exports.chatbot = async (req, res) => {
    try {   
        const { chat } = req.body 
        console.log(chat)
        const result = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [     
                { role: "system", content: process.env.SYSTEM_CONTENT },
                ...chat,
            ],
            max_tokens: 60,
            temperature: 0.7, 
            stop: ["\n"], 
        })

        if(!result.data) return res.status(200).send({data:"I'm sorry, but I'm currently experiencing connection issues and cannot provide a response at the moment. Please try again later. Apologies for the inconvenience."})
        const data = result.data.choices[0].message.content;
        return res.status(200).send({data:data})
    } catch (err) {
        return res.status(500).send({ status: false, data: err.message })
    }
}
