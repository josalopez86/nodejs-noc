import mongoose from "mongoose";

interface ConnectionOptions{
    mongoUrl: string;
    dbName: string;

}

export class MongoDatabase{

    static async connect(options: ConnectionOptions){
        const {dbName, mongoUrl} = options;

        try{

            await mongoose.connect(mongoUrl,{
                dbName: dbName
            } );
            console.log("mongo connected.");

        }catch(error){
            throw new Error("Connection mongo bd failed.");
        }

    }

}