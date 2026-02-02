import { CheckService } from "../domain/use-cases/checks/check-service";
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource";
import { PostgresLogDatasource } from "../infrastructure/datasources/postgres-log.datasource";
import { LogRepositoryImplementation } from "../infrastructure/repositories/log.repository.implementation";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";

//const logRepository = new LogRepositoryImplementation(new FileSystemDatasource());
//const logRepository = new LogRepositoryImplementation(new MongoLogDatasource());
//const logRepository = new LogRepositoryImplementation(new PostgresLogDatasource());

const logsRepositories = [new LogRepositoryImplementation(new FileSystemDatasource()), 
        new LogRepositoryImplementation(new MongoLogDatasource()),
        new LogRepositoryImplementation(new PostgresLogDatasource())
    ];

//const emailService = new EmailService();

export class Server{
    public  static async start(){
        console.log("Server started.");
        //! MANDAR EMAIL

        //new SendEmailLogs(emailService, logRepository).execute("josa.lopez@live.com.mx");

        // const sentEmail = await emailService.sendEmail({
        //     from:"Jose Alberto",
        //     to: "josa.lopez@live.com.mx",
        //     subject:"hola mundo desde node",
        //     htmlBody:`<h3>Hola mundo!!!</h3>
        //     <p>El parrafo.</p>`,
        // });

        //const sentEmail = await emailService.sendEmailWithFileSystemLogs("josa.lopez@live.com.mx");


        //const url = "http://localhost:3000/posts";
        const url = "https://google.com";
        // CronService.createJob(
        //     '*/3 * * * * *', 
        //     ()=>{
        //         new CheckService(
        //             logRepository,
        //             ()=>{console.log("Sucess...")},
        //             (error)=>{console.log(error)}
        //         ).execute(url);
        //     }
        // );

        CronService.createJob(
            '*/3 * * * * *', 
            ()=>{
                new CheckServiceMultiple(
                    logsRepositories,
                    ()=>{console.log("Sucess...")},
                    (error)=>{console.log(error)}
                ).execute(url);
            }
        );
    }
}