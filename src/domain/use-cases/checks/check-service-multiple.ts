import { LogEntity, LogSeverityLevel } from '../../entities/log.entity';
import { LogRepository } from '../../repository/log.repository';
interface CheckServiceMultipleUseCase{
    execute(url: string):Promise<boolean>
}

type SuccessCallback = ()=> void;
type ErrorCallback = (error: string)=> void;


export class CheckServiceMultiple implements CheckServiceMultipleUseCase {

    constructor(
        private readonly logRepository: LogRepository[],
        private readonly successCallback: SuccessCallback,
        private readonly errorCallback: ErrorCallback
    ){

    }

    private origin = "check-service-ts";

    private callLogs(log: LogEntity){
        this.logRepository.forEach(logRepo =>{
            logRepo.saveLog(log);
        });
    }

    async execute(url: string):Promise<boolean>{

        try{
            const req = await fetch(url);

            if(!req.ok)
            {
                throw new Error(`Error checking service: ${url} `);
            }

            this.callLogs(new LogEntity({message:`${url} checked.`, level: LogSeverityLevel.low, origin: this.origin}));
            this.successCallback();

            return true;
        }
        catch(error){
            this.callLogs(new LogEntity({message:`${url} fail. ${error}`, level: LogSeverityLevel.high, origin: this.origin}));
            this.errorCallback(`${error}`);
            return false;
        }

        
    }

}