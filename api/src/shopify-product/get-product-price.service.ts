import { Injectable } from "@nestjs/common";
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import AdblockerPlugin from 'puppeteer-extra-plugin-adblocker';

// puppeteer.use(StealthPlugin());
puppeteer.use(AdblockerPlugin({ blockTrackers: true }));


@Injectable()
export class GetProductPriceService{
    
    getPrice = async(url)=>{
        return new Promise(async(resolve, reject)=>{
            try{
                let price;
                if(url.indexOf('broadbandbuyer.com') !== -1){
                    price = await this.getPriceBroadbandbuyer(url)
                }else if(url.indexOf('hflbroadband.co.uk') !== -1){
    
                    price = await this.getPriceHflbroadbandCoUk(url);
                }else if(url.indexOf('box.co.uk') !== -1){
                    
                    price = await this.getPriceBoxCoUk(url);
                }
                resolve(price)            
            }catch(e){reject(e)}
        })
    }
    getPriceBroadbandbuyer = (url) => {
        return new Promise(async (resolve, reject)=>{
            try {
                const browser = await puppeteer.launch();
                const page = await browser.newPage();
                await page.goto(url);
                await page.waitForSelector('#challenge-form');
                await page.evaluate(() => {
                  (document.querySelector('#challenge-form') as any).submit();
                });
                await page.waitForNavigation();
                const price = await page.evaluate(() => {
                    const priceQuerySelector = '#Product-box > div.price-info > div.PriceBox > div.Price > div.Price1';
                    return document.querySelector(priceQuerySelector)?.textContent;
                });
                await browser.close();
                resolve(price)
              } catch (error) {
                console.error('Error:', error.message);
                reject(error)
              }
        })
    };
    getPriceBoxCoUk = (url) => {
        return new Promise(async (resolve, reject)=>{
            try {
                const browser = await puppeteer.launch();
                const page = await browser.newPage();
                await page.goto(url);
                const price = await page.evaluate(() => {
                    const priceQuerySelector = '#p-right-1 > div.p-right-section > div.p-price > p.p-price-inc > span:nth-child(1)';
                    return document.querySelector(priceQuerySelector).textContent;
                });
                await browser.close();
                resolve(price)
              } catch (error) {
                console.error('Error:', error.message);
                reject(error)
              }
        })
    };
    getPriceHflbroadbandCoUk = (url) => {
        return new Promise(async (resolve, reject)=>{
            try {
                const browser = await puppeteer.launch();
                const page = await browser.newPage();
                await page.goto(url);
                const price = await page.evaluate(() => {
                    const priceQuerySelector = '#shopify-section-template--15991410721024__main > section > div > div > div > product-meta > div > div.price-list > span';
                    return document.querySelector(priceQuerySelector).textContent;
                });
                await browser.close();
                resolve('£'+price.split('£')[1])
              } catch (error) {
                console.error('Error:', error.message);
                reject(error)
              }
        })
    };
}