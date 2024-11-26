import mongoose from "mongoose"

const dbConnection = async () => {
        try {
           const dbResponse= await mongoose.connect("mongodb+srv://chrehmanali5:40p8HqKGmHNvK0we@todo-users.0eern.mongodb.net/Todo List")
        //    console.log(dbResponse,"this is response from database");
        console.log(dbResponse.connection.host , "this is the host of the db");


        } catch (error) {
            console.log(error.message, "error maessage");

        }
}

export {dbConnection}