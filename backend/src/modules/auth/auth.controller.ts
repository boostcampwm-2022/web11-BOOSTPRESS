import { Controller, Delete, Get, Res, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { Response } from 'express';
import { CurrentUser } from 'src/decorator';
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
    async github(
        @CurrentUser() user: User,
        @Res({ passthrough: true }) res: Response,
    ) {
        const jwt = this.tokenService.create(user);

        res.cookie(Auth, `Bearer ${jwt}`, this.tokenService.bearerOption());
        await this.tokenService.setToken(user, jwt);

        return user;
    }

    @UseGuards(JwtGuard)
    @Delete('logout')
    async logout(
        @CurrentUser() user: User,
        @Res({ passthrough: true }) res: Response,
    ) {
        return await this.authService.logout(user, res.clearCookie);
    }

    @UseGuards(JwtGuard)
    @Get('me')
    async me(@CurrentUser() user: User) {
        return user;
    }
}
