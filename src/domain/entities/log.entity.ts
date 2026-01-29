export enum LogSeverityLevel{
    low = "low",
    medium = "medium",
    high = "high"

}

export interface LogEntityOptions {
    level: LogSeverityLevel,
    message: string,
    origin: string
}

export class LogEntity{

    public level: LogSeverityLevel;
    public message: string;
    public origin: string;
    public createdAt?: Date;

    constructor(option: LogEntityOptions){
        this.level = option.level;
        this.message = option.message;
        this.createdAt = new Date();
        this.origin = option.origin;
    }

    static fromJson = (json: string): LogEntity=>{
        const {level, message, createdAt, origin} = JSON.parse(json);
        
        const log = new LogEntity({message, level, origin});
        log.createdAt = new Date(createdAt);

        return log;
    }

    static fromObject = (obj: { [key: string]: any }): LogEntity=>{
        const {message, level, createdAt, origin} = obj;
        const log = new LogEntity({message, level, origin});
        log.createdAt = createdAt;
        return log;
    }

}