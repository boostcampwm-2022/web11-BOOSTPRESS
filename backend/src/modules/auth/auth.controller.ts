import { Controller, Delete, Get, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { Response } from 'express';
import { CurrentUser } from 'src/decorator';
import { GitHubGuard, JwtGuard } from 'src/guard';
import { Auth, Env } from 'src/types';
import { AuthService } from './auth.service';
import { LoginResponseDTO } from './dto';
import { GetGitHub, DeleteLogout, GetMe } from './swagger';
import { TokenService } from './token.service';

@Controller('auth')
export class AuthController {
    private readonly REDIRECT_URL: string;

    constructor(
        private readonly authService: AuthService,
        private readonly tokenService: TokenService,
        config: ConfigService<Env>,
    ) {
        this.REDIRECT_URL = config.get('REDIRECT_URL');
    }

    @ApiOperation(GetGitHub.Operation)
    @ApiResponse(GetGitHub._200)
    @ApiResponse(GetGitHub._401)
    @UseGuards(GitHubGuard)
    @Get('github')
    async github(
        @CurrentUser() user: User,
        @Res({ passthrough: true }) res: Response,
    ) {
        const jwt = this.tokenService.create(user);

        res.cookie(Auth, `Bearer ${jwt}`, this.tokenService.bearerOption());
        await this.tokenService.setToken(user, jwt);

        res.redirect(this.REDIRECT_URL);
    }

    @ApiOperation(DeleteLogout.Operation)
    @ApiResponse(DeleteLogout._200)
    @ApiResponse(DeleteLogout._401)
    @UseGuards(JwtGuard)
    @Delete('logout')
    async logout(
        @CurrentUser() user: User,
        @Res({ passthrough: true }) res: Response,
    ) {
        await this.authService.logout(user, res);
        res.redirect(this.REDIRECT_URL);
    }

    @ApiOperation(GetMe.Operation)
    @ApiResponse(GetMe._200)
    @ApiResponse(GetMe._401)
    @UseGuards(JwtGuard)
    @Get('me')
    async me(@CurrentUser() user: User): Promise<LoginResponseDTO> {
        return {
            nickname: user.nickname,
            email: user.email,
        };
    }
}
