import express from  "express"
import { connect, UserModel } from "./db"
import { mainRouter } from "./routes"



const app = express()

app.use(express.json())

app.use("api/v1", mainRouter)


connect()



app.listen(3000 , ()=>{
    console.log("Listening")
})