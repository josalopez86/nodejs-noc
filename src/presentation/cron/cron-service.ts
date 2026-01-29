import { CronJob } from "cron";

type CronTime = string | Date;
type OnTick = ()=> void;
export class CronService{

    public static createJob(cronTime: CronTime, onTick: OnTick):CronJob{
                const job = new CronJob(
            cronTime, // '*/3 * * * * *'
            onTick, // onTick
            null, // onComplete
            false, // start
            'America/Los_Angeles' // timeZone
        );
        job.start();

        return job;
    }
}