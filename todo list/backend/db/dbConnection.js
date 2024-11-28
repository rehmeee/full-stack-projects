import mongoose from "mongoose"

const dbConnection = async () => {
        try {
           const dbResponse= await mongoose.connect(`${process.env.DATABASE_URL}`)
        //    console.log(dbResponse,"this is response from database");
        console.log(dbResponse.connection.host , "this is the host of the db");


        } catch (error) {
            console.log(error.message, "error maessage");

        }
}

export {dbConnection}