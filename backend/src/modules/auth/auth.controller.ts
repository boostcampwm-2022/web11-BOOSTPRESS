import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { User } from 'src/decorator';
import { GitHubGuard, JwtGuard } from 'src/guard';
import { Auth } from 'src/types';
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
        const jwt = this.tokenService.create(user);

        res.cookie(Auth, `Bearer ${jwt}`, this.tokenService.bearerOption());

        await this.tokenService.setToken(user, jwt);

        return user;
    }

    @UseGuards(JwtGuard)
    @Get('commit_test')
    async create(@User() user) {
        return this.authService.commit(user);
    }
}
