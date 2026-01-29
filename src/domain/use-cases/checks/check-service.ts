import { LogEntity, LogSeverityLevel } from '../../entities/log.entity';
import { LogRepository } from '../../repository/log.repository';
interface CheckServiceUseCase{
    execute(url: string):Promise<boolean>
}

type SuccessCallback = ()=> void;
type ErrorCallback = (error: string)=> void;


export class CheckService implements CheckServiceUseCase {

    constructor(
        private readonly logRepository: LogRepository,
        private readonly successCallback: SuccessCallback,
        private readonly errorCallback: ErrorCallback
    ){

    }

    private origin = "check-service-ts";

    async execute(url: string):Promise<boolean>{

        try{
            const req = await fetch(url);

            if(!req.ok)
            {
                throw new Error(`Error checking service: ${url} `);
            }

            this.logRepository.saveLog(new LogEntity({message:`${url} checked.`, level: LogSeverityLevel.low, origin: this.origin}));
            this.successCallback();

            return true;
        }
        catch(error){
            this.logRepository.saveLog(new LogEntity({message:`${url} fail. ${error}`, level: LogSeverityLevel.high, origin: this.origin}));
            this.errorCallback(`${error}`);
            return false;
        }

        
    }

}