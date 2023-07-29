import {Body, Controller, Post, Get, Headers, UseGuards } from '@nestjs/common';
import {CreateUserDto} from "../users/dto/create-user.dto";
import {AuthService} from "./auth.service";
import { UsersService } from 'src/users/users.service';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import { Roles } from "./roles-auth.decorator";
import {JwtService} from "@nestjs/jwt";
import { RolesGuard } from "./roles.guard";
import {User} from "src/users/users.model";

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService,
        private usersService: UsersService,
        private jwtService:JwtService) {}

    @Post('/login')
    login(@Body() userDto: CreateUserDto) {
        return this.authService.login(userDto)
    }

    @Post('/registration')
    registration(@Body() userDto: CreateUserDto) {
        return this.authService.registration(userDto)
    }

    @ApiOperation({summary: 'Получить одного пользователя'})
    @ApiResponse({status: 200, type: [User]})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Get('/autologin')
    getUser(@Headers('authorization') authHeader: string) {
        const token = authHeader.split(' ')[1]
        const user = this.jwtService.verify(token);
        return this.usersService.getUser(user.email);
    }
}
