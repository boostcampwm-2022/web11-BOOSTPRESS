import { Controller, Delete, Get, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { Response } from 'express';
import { CurrentUser } from 'src/decorator';
import { GitHubGuard, JwtGuard } from 'src/guard';
import { Auth, Env } from 'src/types';
import { SessionService } from './session.service';
import { GitHubAccessTokenDTO, UserDTO } from './dto';
import { Login, Logout, Me } from './swagger';
import { TokenService } from './token.service';
import { UserService } from './user.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    private readonly REDIRECT_URL: string;

    constructor(
        private readonly userService: UserService,
        private readonly sessionService: SessionService,
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
        @CurrentUser() dto: GitHubAccessTokenDTO,
        @Res({ passthrough: true }) res: Response,
    ) {
        const user = await this.userService.getUser(dto.accessToken);

        const jwt = this.tokenService.createToken(user);
        res.cookie(Auth, `Bearer ${jwt}`, this.tokenService.bearerOption());
        await this.sessionService.login(user, jwt);

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
        await this.sessionService.logout(user, res);
        res.redirect(this.REDIRECT_URL);
    }

    @ApiOperation(Me.Operation)
    @ApiResponse(Me._200)
    @ApiResponse(Me._401)
    @UseGuards(JwtGuard)
    @Get('me')
    me(@CurrentUser() user: User): UserDTO {
        return UserDTO.fromUser(user);
    }
}
