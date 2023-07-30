import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import axios, { AxiosRequestConfig, AxiosResponse  } from "axios";
import { GetProductPriceService } from "./get-product-price.service";
const path = require('path');
const fs = require('fs');
const encoding = 'utf8'

const SHOPIFY_ACCESS_TOKEN='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'
const SHOPIFY_STORE_URL='https://e11900.myshopify.com'
const SHOPIFY_ALL_PRODUCT_LINK = '/admin/api/2023-07/'

@Injectable()
export class ShopifyProductService{
    constructor(
        private configService:ConfigService,
        private getPrice: GetProductPriceService
    ){}
    
    async getAllProducts(): Promise<any>{
        return new Promise(async (resolve, reject)=>{
            try{

                const headers:AxiosRequestConfig  = {
                    headers:{
                        'Content-Type': 'application/json',
                        'X-Shopify-Access-Token': SHOPIFY_ACCESS_TOKEN
                    }
                }
                const {data} = await axios.get(SHOPIFY_STORE_URL+SHOPIFY_ALL_PRODUCT_LINK+'products.json', headers)
                const productsLink = await this.getProductsLink()
                resolve({data: {products:data.products, productsLink}});
            }catch(e){
                console.log(e)
                throw new Error('Failed to get products')
            }
        })
    }
    async updateProductPrice(id, variants_id, newPrice){
        return new Promise(async (resolve, reject)=>{
            try{

                const headers:AxiosRequestConfig  = {
                    headers:{
                        'Content-Type': 'application/json',
                        'X-Shopify-Access-Token': SHOPIFY_ACCESS_TOKEN
                    }
                }
                const body = {
                    "product": {
                      id,
                      "variants": [{
                                  "id": variants_id,
                                  "product_id": id,
                                  "title": `UZS ${newPrice}`,
                                  "price": newPrice,
                                  "option1": `UZS ${newPrice}`
                      }]
                    }
                  }
                const {data} = await axios.put(SHOPIFY_STORE_URL+SHOPIFY_ALL_PRODUCT_LINK+"products/"+id+'.json', body, headers)
                resolve(true);
            }catch(e){
                console.log(e)
                throw new Error('Failed to get products')
            }
        })
    }
    async getProductsLink(){
        return new Promise(async (resolve, reject)=>{
            try{
                const filePath = path.join(__dirname,"../../database/productUrls/");
                const files = await fs.readdirSync(filePath);
                const productUrls = {}
                await files.map(async(file)=>{
                    productUrls[file.slice(0, -5)] = JSON.parse(await fs.readFileSync(path.join(filePath, file), encoding))
                })
                resolve(productUrls)
            }catch(e){reject(e.message)}
        })

    }
    async ProductUrl(body){
        try{
            const fileName = `${body.id}.json`
            const filePath = path.join(__dirname,"../../database/productUrls/");
            const fullPath = path.join(filePath, fileName)
            if(!fs.existsSync(filePath)){
                await fs.mkdirSync(filePath, {recursive:true})
            }
            await  fs.writeFileSync(fullPath, JSON.stringify({link:body.link}));
            return {data:{success: true}}
        }catch(e){alert(e.message)}
    }
}