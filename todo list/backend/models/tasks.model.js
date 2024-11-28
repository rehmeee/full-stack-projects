import mongoose, { Schema } from "mongoose"

const taskSchema = new mongoose.Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    taskName:{
        type: String, 
        required: true, 

    },
    taskDescription:{
        type: String, 
        default: ""

    },
    isCompleted:{
        type: Boolean,
        default:false
    }


} ,{timestamps:true})

export const Task = mongoose.model("Task", taskSchema)