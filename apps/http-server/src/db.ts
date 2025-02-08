import mongoose from "mongoose"

export const connect = async () => {
    await mongoose.connect("mongodb://127.0.0.1/paytm-app")
    .then(()=>{
        console.log("Mongoose Connnected!!")
    })
}

const Schema = mongoose.Schema;

const User = new Schema({
    username: String,
    email: String,
    password:  String
})


const UserModel = mongoose.model("User", User)

export {UserModel}
