import { Controller, Get, Query, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { User } from 'src/decorator';
import { GitHubGuard } from 'src/guard';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly tokenService: TokenService,
    ) {}

    @UseGuards(GitHubGuard)
    @Get('github')
    async github(@User() user, @Res({ passthrough: true }) res: Response) {
        res.cookie('Authorization', `Bearer ${this.tokenService.create(user)}`);
        return user;
    }

    @Get('commit_test')
    async create(@Res() res: Response) {
        return this.authService.commit();
    }
}
