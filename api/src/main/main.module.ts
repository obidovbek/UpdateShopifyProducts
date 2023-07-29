import { Module } from "@nestjs/common";
import { MainController } from "./main.controller";
import {ConfigModule} from "@nestjs/config";
@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `../.${process.env.NODE_ENV}.env`
         }),
    ],
    controllers: [MainController],
    providers: [],
})
export class MainModule {

}