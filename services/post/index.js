const express= require("express")
const bodyParser = require("body-parser")
const {randomBytes} = require("crypto")
const cors = require('cors');
const app = express()
const posts={};

app.use(cors());
app.use(bodyParser.json())
/**
 * 
 */
app.get("/posts",(req,res)=>{
 res.send(posts);
})
/**
 * 
 */
app.post("/posts",(req,res)=>{
 const id = randomBytes(4).toString("hex");
 posts[id] = {id,title:req.body.title};
 res.status(201).send(posts[id])
})

/**
 * 
 */
app.listen(4000,()=>{
    console.log("post service working successfully");
})