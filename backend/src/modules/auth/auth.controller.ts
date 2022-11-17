import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { User } from 'src/decorator';
import { GitHubGuard } from 'src/guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(GitHubGuard)
    @Get('github')
    async github(@User() user) {
        return user;
    }
}
