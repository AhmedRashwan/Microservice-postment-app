const express= require("express")
const bodyParser = require("body-parser")
const {randomBytes} = require("crypto")
const app = express()
const comments={};

app.use(bodyParser.json())
/**
 * 
 */
app.get("/comments",(req,res)=>{
 res.send(posts);
})
/**
 * 
 */
app.post("/comments",(req,res)=>{
 const id = randomBytes(4).toString("hex");
 comments[id] = {id,title:req.body.title};
 res.status(201).send(comments[id])
})

/**
 * 
 */
app.listen(5000,()=>{
    console.log("comment service working successfully");
})