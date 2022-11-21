import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { Request } from 'express';
import { AuthController } from '../auth.controller';

const bearerRegExp = /^Bearer /;
const cookieToToken = (request: Request) =>
    request.cookies[AuthController.Auth].replace(bearerRegExp, '');

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(private readonly prisma: PrismaService, config: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([cookieToToken]),
            ignoreExpiration: false,
            secretOrKey: config.get('JWT_SECRET'),
        });
    }

    async validate(payload: any) {
        const id = payload.sub;
        const user = await this.prisma.user.findUnique({ where: { id } });

        return user;
    }
}
