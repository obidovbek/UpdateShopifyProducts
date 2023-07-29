import {Module} from "@nestjs/common";
import { ShopifyProductController } from "./shopify-product.controller";
import { ShopifyProductService } from "./shopify-product.service"; 
import { ConfigModule } from "@nestjs/config";
import { GetProductPriceService } from "./get-product-price.service";
@Module({
    imports:[
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`
        }),
    ],
    controllers:[ShopifyProductController],
    providers: [ShopifyProductService,GetProductPriceService]
})
export class ShopifyProductModule{

}