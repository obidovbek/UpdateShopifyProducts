import { Controller, Get, Body, Post, Query, Put } from "@nestjs/common";
import { AxiosResponse } from "axios";
import { GetProductPriceService } from "./get-product-price.service";
import { ShopifyProductService } from "./shopify-product.service";

@Controller('shopify-product')
export class ShopifyProductController{

    constructor(
        private service: ShopifyProductService,
        private priceService: GetProductPriceService    
    ){}
    
    @Get('get-price')
    async getPrice(@Query() {link}:any){
        try{
            const response = await this.priceService.getPrice(link);
            return response;
        }catch(e){
            throw new Error('Failed to get products list')
        }
    }

    @Put('update-price')
    async updateProductPrice(@Body() {id, variants_id, newPrice}:any){
        try{
            const response = await this.service.updateProductPrice(id, variants_id, newPrice);
            return response;
        }catch(e){
            throw new Error('Failed to get products list')
        }
    }

    @Get('list')
    async getAllProducts():Promise<any>{
        try{
            const response = await this.service.getAllProducts();
            return response.data;
        }catch(e){
            throw new Error('Failed to get products list')
        }
    }

    @Post('link-product-url')
    async LinkProductUrl(@Body() body: any){
        try{
            const response = await this.service.ProductUrl(body);
            return response.data;
        }catch(e){
            throw new Error('Failed to link product Url')
        }
    }
}