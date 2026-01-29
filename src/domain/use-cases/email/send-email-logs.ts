import { EmailService } from '../../../presentation/email/email.service';
import { LogEntity, LogSeverityLevel } from '../../entities/log.entity';
import { LogRepository } from '../../repository/log.repository';

interface SendEmailLogUseCase{
    execute: (to: string | string[]) => Promise<boolean>;
}

export class SendEmailLogs implements SendEmailLogUseCase{

constructor(
    private readonly emailService: EmailService,
    private readonly logRepository: LogRepository
){

}


    async execute(to: string | string[]):Promise<boolean>{

        try{

            const sent = await this.emailService.sendEmailWithFileSystemLogs(to);
            if(!sent)
            {
                throw new Error("Could NOT send logs email ");
            }
            const log = new LogEntity({level: LogSeverityLevel.low, message:`Logs email sent`, origin:"SendEmailLogs.ts"});
            this.logRepository.saveLog(log);
            return true;
        }catch(error){

            const log = new LogEntity({level: LogSeverityLevel.high, message:`${error}`, origin:"SendEmailLogs.ts"});
            this.logRepository.saveLog(log);

            return false;
        }
    }

}