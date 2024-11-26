import express from "express"
import { dbConnection } from "./db/dbConnection.js"

const app = express()

dbConnection().then(()=>{

    app.get("/", (req,res)=>{
        res.send("hello mister")
    })
    
    app.listen(5000, ()=>{
        console.log("app is listeni ng on port 5000");
    }) 
}).catch((error)=>console.log(error))

