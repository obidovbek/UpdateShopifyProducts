import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import axios, { AxiosRequestConfig, AxiosResponse  } from "axios";
import { GetProductPriceService } from "./get-product-price.service";

@Injectable()
export class ShopifyProductService{
    constructor(
        private configService:ConfigService,
        private getPrice: GetProductPriceService
    ){}
    
    async getAllProducts(): Promise<AxiosResponse<any>>{
        try{
            const SHOPIFY_ACCESS_TOKEN='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'
            const SHOPIFY_STORE_URL='https://e11900.myshopify.com'
            const SHOPIFY_ALL_PRODUCT_LINK = '/admin/api/2023-07/products.json'
            const headers:AxiosRequestConfig  = {
                headers:{
                    'Content-Type': 'application/json',
                    'X-Shopify-Access-Token': SHOPIFY_ACCESS_TOKEN
                }
            }
            const products = await axios.get(SHOPIFY_STORE_URL+SHOPIFY_ALL_PRODUCT_LINK, headers)
            return products;
        }catch(e){
            throw new Error('Failed to get products')
        }

    }
    async updateProductPrice(url, productData){
        const price = await this.getPrice.getPrice(url)
        console.log(price)
        return price
    }
}