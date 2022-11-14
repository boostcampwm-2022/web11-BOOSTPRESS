import { Controller, Get } from '@nestjs/common';
import { User } from 'src/decorator';

@Controller('auth')
export class AuthController {
    @Get('github')
    async github(@User() user) {
        return user;
    }
}
