import express, { urlencoded } from "express"
import { dbConnection } from "./db/dbConnection.js"
import cors from "cors"
import cookieParser from "cookie-parser"
const app = express()

app.use(express.json({limit:"16kb"}))
app.use(cors({origin:"http://localhost:5173",
    credentials:true,
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow 'Content-Type' header
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'], // Allowed HTTP methods

}))
app.use(cookieParser())
app.use(express.urlencoded({
    extended:true,
    limit:"16kb"
}))
dbConnection().then(()=>{
    
    app.get("/", (req,res)=>{
        res.send("hello mister")
    })
    
    app.listen(5000, ()=>{
        console.log("app is listening on port 5000");
    }) 
}).catch((error)=>console.log(error))

import router from "./routs/user.routes.js"
import taskRouter from "./routs/task.routes.js"
app.use("/api/v1/tasks", taskRouter)
app.use("/api/v1/users",router)