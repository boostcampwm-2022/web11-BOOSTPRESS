
import { Controller, Delete, Get, Res, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { Response } from 'express';
import { CurrentUser } from 'src/decorator';
import { GitHubGuard, JwtGuard } from 'src/guard';
import { Auth } from 'src/types';
import { AuthService } from './auth.service';
import { LoginResponseDTO } from './dto';
import { GetGitHub, DeleteLogout, GetMe } from './swagger';
import { TokenService } from './token.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly tokenService: TokenService,
    ) {}

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

        return LoginResponseDTO.builder()
            .email(user.email)
            .nickname(user.nickname)
            .build();
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
        await this.authService.logout(user, res.clearCookie);
        return {};
    }

    @ApiOperation(GetMe.Operation)
    @ApiResponse(GetMe._200)
    @ApiResponse(GetMe._401)
    @UseGuards(JwtGuard)
    @Get('me')
    async me(@CurrentUser() user: User) {
        return LoginResponseDTO.builder()
            .email(user.email)
            .nickname(user.nickname)
            .build();
    }
}
