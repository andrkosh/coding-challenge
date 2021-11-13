import { Injectable } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import puppeteer from 'puppeteer-extra';
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

@Injectable()
export class ScrapperService {
    private cronJobName: string = 'scrapping title';

    constructor(private schedulerRegistry: SchedulerRegistry) {}

    async getTitle(asin: string | unknown) {
        const width = 4019;
        const height = 1900;

        const browser = await puppeteer.launch({
            args: [
                `--window-size=${width},${height}`,
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-infobars',
                '--disable-dev-shm-usage',
                '--disable-features=VizDisplayCompositor',
                '--window-position=0,0',
                '--ignore-certifcate-errors',
                '--ignore-certifcate-errors-spki-list',
                '--user-agent="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) snap Chromium/81.0.4044.113 Chrome/81.0.4044.113 Safari/537.36"'
            ]
        });

        const page = await browser.newPage();
        await page.goto(`https://amazon.de/dp/${asin}`);
        await page.screenshot({ path: 'amazone-home.png' });

        const results = await page.evaluate(() => {
            return document.querySelector('meta[name="title"]').getAttribute('content');
        });

        console.log('getDataViaPuppeteer results :', results);
        return results;
    }


    async getTitleScheduled(data: Record<string, unknown>) {
        const job = new CronJob(data.crontab, () => {
            console.log(`CronJob "${this.cronJobName}" running: ${data.crontab}`);
            this.getTitle(data.text);
        });

        this.schedulerRegistry.addCronJob(this.cronJobName, job);
        job.start();
        console.log(`CronJob "${this.cronJobName}" scheduled: ${data.crontab}`);
    }

    deleteCron() {
        this.schedulerRegistry.deleteCronJob(this.cronJobName);
        console.log(`job ${this.cronJobName} deleted!`);
    }
}
