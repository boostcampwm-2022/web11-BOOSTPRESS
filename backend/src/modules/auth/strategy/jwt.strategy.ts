import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@prisma/client';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { Auth } from 'src/types';
import { TokenService } from '../token.service';

const bearerRegExp = /^Bearer /;
const cookieToToken = (request: Request) =>
    request.cookies[Auth]?.replace(bearerRegExp, '') ?? '';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        private readonly prisma: PrismaService,
        private readonly tokenService: TokenService,
        config: ConfigService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([cookieToToken]),
            ignoreExpiration: true,
            secretOrKey: config.get('JWT_SECRET'),
            passReqToCallback: true,
        });
    }

    async validate(req: Request, payload: any) {
        const id = payload.sub as number;

        const [user, session] = await Promise.all([
            this.prisma.user.findUnique({ where: { id } }),
            this.prisma.session.findUnique({ where: { userId: id } }),
        ]);

        const isTokenValid = new Date().getTime() - payload.exp * 1000 <= 0;
        const isLoginValid =
            new Date().getTime() - session.expiresAt.getTime() <= 0;

        if (!isTokenValid && !isLoginValid) this.forceLogout(user);
        else if (!isTokenValid) this.resetAccessToken(req, user);
        else if (!isLoginValid) this.resetExpiration(user);

        return user;
    }

    // 사용자를 강제로 로그아웃
    private async forceLogout(user: User) {
        this.tokenService.softDelete(user);
        throw new UnauthorizedException('로그인이 만료되었습니다!');
    }

    // 인증에 사용되는 JWT를 갱신
    private async resetAccessToken(req: Request, user: User) {
        const jwt = this.tokenService.create(user);

        req.res.cookie(Auth, `Bearer ${jwt}`, this.tokenService.bearerOption());

        await this.prisma.session.update({
            where: { userId: user.id },
            data: { accessToken: jwt },
        });
    }

    // 로그인 만료 기간을 갱신
    private async resetExpiration(user: User) {
        await this.prisma.session.update({
            where: { userId: user.id },
            data: { expiresAt: this.tokenService.loginExpirationDate() },
        });
    }
}
