const express=require("express")
const { chatbot } = require("../controller/chatController")
const router=express.Router()

router.post("/chat",chatbot)

module.exports=router