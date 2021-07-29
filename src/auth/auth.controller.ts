import {Body, Controller, HttpCode, Post} from '@nestjs/common';
import {AuthDto} from "./dto/Auth.dto";

@Controller('auth')
export class AuthController {
    @HttpCode(200)
    @Post('login')
    async login(@Body() dto: AuthDto) {

    }
}
