import { PrismaPg } from "@prisma/adapter-pg";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { PrismaClient } from "../../generated/prisma";
import { envs } from "../../config/plugins/envs.plugin";
import { SeverityLevel } from '../../generated/prisma/enums';

const {POSTGRES_URL:postgreUrl} = envs;

const adapter = new PrismaPg({ connectionString: postgreUrl })
const prisma = new PrismaClient({ adapter })

const severityEnum = {
    low: SeverityLevel.LOW,
    medium: SeverityLevel.MEDIUM,
    high: SeverityLevel.HIGH
};


export class PostgresLogDatasource implements LogDatasource{
    async saveLog(log: LogEntity): Promise<void> {
        const newLog = await prisma.logModel.create({
    //     data:{
    //         message: log.message, 
    //         origin:"postgres-log.datasource.ts", 
    //         level: severityEnum[log.level]}
            data:{
                ...log,
                level: severityEnum[log.level]
            }});
            
        console.log({newLog});
    }
    
    async getLog(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        const logs =  await prisma.logModel.findMany({
        where: {
            level: severityEnum[severityLevel]
        }        
        });
        return logs.map(log =>{
            return LogEntity.fromObject(log);
        });
    }

    // private GetPostgresSeverity(Severity : LogSeverityLevel): SeverityLevel
    // {
    //     switch(Severity)
    //     {
    //         case "low":
    //             return SeverityLevel.LOW;
    //         case "medium":
    //             return SeverityLevel.MEDIUM;
    //         case "high":
    //             return SeverityLevel.HIGH;
    //             default:
    //                 return SeverityLevel.LOW;
    //     }
    // }

}