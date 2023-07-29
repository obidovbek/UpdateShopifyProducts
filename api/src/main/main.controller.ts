import { Controller, Get,  Query } from "@nestjs/common";
import axios from 'axios'; 
import { ConfigService } from "@nestjs/config";
import { throwError } from "rxjs";
@Controller('main')
export class MainController {

    constructor(private configService: ConfigService) {}

    @Get('student')
    async getStudent(@Query() passport_cridentials: {passport_pin: number, passport_series: string}){
        // const 
        try{
            const student = await axios.get('https://student.ferpi.uz/rest/v1/data/student-list', {params: passport_cridentials, headers: {Authorization: `Bearer ${this.configService.get<string>('HEMIS_TOKEN')}`}});
            return student.data;
        }catch(e){
            return new Error(e);
        }

    }
}