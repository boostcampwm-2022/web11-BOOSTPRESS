import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { Response } from 'express';
import { Cookie, User } from 'src/decorator';
import { GitHubGuard, JwtGuard } from 'src/guard';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';

@Controller('auth')
export class AuthController {
    static readonly Auth = 'Authorization';

    constructor(
        private readonly authService: AuthService,
        private readonly tokenService: TokenService,
    ) {}

    @UseGuards(GitHubGuard)
    @Get('github')
    github(@User() user, @Res({ passthrough: true }) res: Response) {
        res.cookie(
            AuthController.Auth,
            `Bearer ${this.tokenService.create(user)}`,
            this.tokenService.bearerOption(),
        );
        return user;
    }

    @UseGuards(JwtGuard)
    @Get('commit_test')
    async create(@User() user) {
        return this.authService.commit(user);
    }
}
