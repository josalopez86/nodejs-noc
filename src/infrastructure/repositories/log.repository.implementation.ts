import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogRepository } from "../../domain/repository/log.repository";


export class LogRepositoryImplementation implements LogRepository{
    //private logDataSource: LogDatasource;
    constructor( private readonly logDatasource: LogDatasource){

    }

    saveLog(log: LogEntity): Promise<void> {
        return this.logDatasource.saveLog(log);
    }

    getLog(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        return this.logDatasource.getLog(severityLevel);
    }

}