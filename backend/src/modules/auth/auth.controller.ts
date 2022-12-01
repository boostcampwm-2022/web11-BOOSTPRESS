import { Controller, Delete, Get, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { Response } from 'express';
import { CurrentUser } from 'src/decorator';
import { GitHubGuard, JwtGuard } from 'src/guard';
import { Auth, Env } from 'src/types';
import { AuthService } from './auth.service';
import { UserDTO } from './dto';
import { Login, Logout, Me } from './swagger';
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

    @ApiOperation(Login.Operation)
    @ApiResponse(Login._200)
    @ApiResponse(Login._401)
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

    @ApiOperation(Logout.Operation)
    @ApiResponse(Logout._200)
    @ApiResponse(Logout._401)
    @UseGuards(JwtGuard)
    @Delete('logout')
    async logout(
        @CurrentUser() user: User,
        @Res({ passthrough: true }) res: Response,
    ) {
        await this.authService.logout(user, res);
        res.redirect(this.REDIRECT_URL);
    }

    @ApiOperation(Me.Operation)
    @ApiResponse(Me._200)
    @ApiResponse(Me._401)
    @UseGuards(JwtGuard)
    @Get('me')
    async me(@CurrentUser() user: User): Promise<UserDTO> {
        return {
            id: user.id,
            nickname: user.nickname,
            email: user.email,
        };
    }
}
