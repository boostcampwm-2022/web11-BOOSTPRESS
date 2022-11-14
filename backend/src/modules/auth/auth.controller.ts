import { Controller, Get, Query } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Get('github')
    async github(@Query('code') code: string) {
        const { login } = await this.authService.login(code);
        return `Hello, ${login}!`;
    }
}
