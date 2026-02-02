import { envs } from "./config/plugins/envs.plugin";
import { MongoDatabase } from "./data/mongo";
import { Server } from "./presentation/server";


// import { PrismaClient } from "./generated/prisma/client";
// import { PrismaPg } from "@prisma/adapter-pg";




(async()=>{
    main();
})();

async function main(){
    const {MONGO_DB_NAME: dbName, MONGO_URL: mongoUrl, POSTGRES_URL: postgreUrl} = envs;
    await MongoDatabase.connect({mongoUrl, dbName});

    //const newLog = await LogModel.create({message:"Hola mundo mongo", origin:"app.ts", level: "medium"});
    //const resp = await newLog.save();
    //console.log({resp});



    Server.start();
    //console.log(envs.PORT);
}