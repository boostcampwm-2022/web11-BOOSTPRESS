import {
    HttpException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@prisma/client';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { Auth } from 'src/types';
import { AuthService } from '../auth.service';
import { TokenService } from '../token.service';

const bearerRegExp = /^Bearer /;
const cookieToToken = (request: Request) =>
    request.cookies[Auth]?.replace(bearerRegExp, '') ?? '';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        private readonly prisma: PrismaService,
        private readonly tokenService: TokenService,
        private readonly authService: AuthService,
        config: ConfigService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([cookieToToken]),
            ignoreExpiration: true,
            secretOrKey: config.get('JWT_SECRET'),
            passReqToCallback: true,
        });
    }

    handleRequest(err: any, user: any, info: any, context: any, status: any) {
        console.log('errorGuard', err);
        if (err || !user) {
            throw new HttpException(err.message, err.status);
        }
        return user;
    }

    async validate(req: Request, payload: any) {
        const id = payload.sub as number;

        const [user, session] = await Promise.all([
            this.prisma.user.findUnique({ where: { id } }),
            this.prisma.session.findUnique({ where: { userId: id } }),
        ]);

        // 사용자 혹은 사용자의 세션에 대응되는 DB 레코드가 없다면 에러 반환
        if (user === null || session === null) {
            req.res.clearCookie(Auth);
            throw new UnauthorizedException('사용자 정보를 찾을 수 없습니다!');
        }
        // 사용자가 DB에 없는 토큰을 이용해 접근한다면 강제로 로그아웃
        if (session.accessToken !== cookieToToken(req))
            await this.forceLogout(req, user);

        const isTokenValid = new Date().getTime() - payload.exp * 1000 <= 0;
        const isLoginValid =
            new Date().getTime() - session.expiresAt.getTime() <= 0;

        if (!isTokenValid && !isLoginValid) await this.forceLogout(req, user);
        else if (!isTokenValid) await this.resetAccessToken(req, user);
        else if (!isLoginValid) await this.resetExpiration(user);

        return user;
    }

    // 사용자를 강제로 로그아웃
    private async forceLogout(req: Request, user: User) {
        await this.authService.logout(user, req.res);
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
