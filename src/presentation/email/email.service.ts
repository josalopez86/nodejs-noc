import nodemailer from "nodemailer";
import { envs } from '../../config/plugins/envs.plugin';

interface SendEmailOptions{
    to: string | string[],
    subject: string,
    htmlBody: string,
    from: string,
    attachments?: Attachment[]
}

interface Attachment{
    filename: string,
    path: string

}


export class EmailService{

    constructor(){

    }
    private transport = nodemailer.createTransport(
        {
            service: envs.MAILER_SERVICE,
            port: 465,
            secure: true,
            auth:{
                user: envs.MAILER_EMAIL,
                pass: envs.MAILER_SECRET_KEY
            },
            tls: {
                rejectUnauthorized: false
            }
        }
    );

    async sendEmail(options: SendEmailOptions): Promise<boolean>{
        const {to, subject, htmlBody, from, attachments =[]} = options;

        try{

            const sentEmail = await this.transport.sendMail({
                from: from,
                to: to,
                subject: subject,
                html: htmlBody,
                attachments: attachments
            });

            return true;
        }
        catch(error){
            return false;
        }
    }

    async sendEmailWithFileSystemLogs(to: string | string[]): Promise<boolean>{

        const subject = "Logs del servidor";
        const htmlBody = `<h3>Hola mundo!!</h3>
            <p>El parrafo con attachments.</p>`;
        const attachments: Attachment[] = [{filename:"logs-high.log", path:"./logs/logs-high.log"},
            {filename:"logs-low.log", path:"./logs/logs-low.log"},
            {filename:"logs-medium.log", path:"./logs/logs-medium.log"}
        ];        
        try{

            const sentEmail = await this.sendEmail({
                from: "Jose Alberto",
                to: to,
                subject: subject,
                htmlBody: htmlBody,
                attachments: attachments
            });

            console.log({sentEmail});

            return true;
        }
        catch(error){
            console.log({error})
            return false;
        }

    }
}