import { Controller, Get } from "@nestjs/common";
import { AxiosResponse } from "axios";
import { ShopifyProductService } from "./shopify-product.service";

@Controller('shopify-product')
export class ShopifyProductController{

    constructor(
        private service: ShopifyProductService    
    ){}
    
    @Get('update-price')
    async updateProductPrice(){
        try{
            const url = 'https://www.broadbandbuyer.com/products/36913-netgear-gs308-300uks/'
            // const url = 'https://www.box.co.uk/TL-SG1016-TP-Link-TL-SG1016-16-Port-Gigabit-Switch_667152.html'
            // const url = 'https://hflbroadband.co.uk/products/netgear-m4300-28g-poe?pr_prod_strat=use_description&pr_rec_id=626d15a77&pr_rec_pid=7801675088128&pr_ref_pid=7873798177024&pr_seq=uniform'
            const response = await this.service.updateProductPrice(url, {});
            return response;
        }catch(e){
            throw new Error('Failed to get products list')
        }
    }

    @Get('list')
    async getAllProducts():Promise<AxiosResponse<any>>{
        try{
            const response = await this.service.getAllProducts();
            return response.data;
        }catch(e){
            throw new Error('Failed to get products list')
        }
    }
}