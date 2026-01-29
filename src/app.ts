import { envs } from "./config/plugins/envs.plugin";
import { LogModel, MongoDatabase } from "./data/mongo";
import { Server } from "./presentation/server";



(async()=>{
    main();
})();

async function main(){
    const {MONGO_DB_NAME: dbName, MONGO_URL: mongoUrl} = envs;
    await MongoDatabase.connect({mongoUrl, dbName});

    //const newLog = await LogModel.create({message:"Hola mundo mongo", origin:"app.ts", level: "medium"});

    //const resp = await newLog.save();
    //console.log({resp});


    Server.start();
    //console.log(envs.PORT);
}