import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { Response } from 'express';
import { CurrentUser } from 'src/decorator';
import { GitHubGuard, JwtGuard } from 'src/guard';
import { Auth } from 'src/types';
import { TokenService } from './token.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly tokenService: TokenService) {}

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
}
