import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { CookieOptions } from 'express';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TokenService {
    private readonly LOGIN_LIFESPAN: number;
    private readonly JWT_LIFESPAN: number;
    private readonly JWT_SECRET: string;

    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
        config: ConfigService,
    ) {
        this.LOGIN_LIFESPAN = parseInt(config.get('LOGIN_LIFESPAN'));
        this.JWT_LIFESPAN = config.get<number>('JWT_LIFESPAN');
        this.JWT_SECRET = config.get('JWT_SECRET');
    }

    loginExpirationDate() {
        return new Date(new Date().getTime() + this.LOGIN_LIFESPAN);
    }

    bearerOption(): CookieOptions {
        return {
            maxAge: this.loginExpirationDate().getTime(),
            httpOnly: true,
        };
    }

    async setToken(user: User, accessToken: string) {
        const userId = user.id,
            expiresAt = this.loginExpirationDate();

        const where = { userId },
            create = { userId, accessToken, expiresAt },
            update = { accessToken, expiresAt };

        return await this.prisma.session.upsert({ where, create, update });
    }

    create(user: User) {
        const payload = { sub: user.id };
        const jwt = this.jwtService.sign(payload, {
            secret: this.JWT_SECRET,
            expiresIn: `${this.JWT_LIFESPAN}ms`,
        });

        return jwt;
    }

    softDelete(user: User) {
        return this.prisma.session.update({
            where: { userId: user.id },
            data: {
                accessToken: '',
                expiresAt: new Date(new Date().getTime() - 1000),
            },
        });
    }

    verify(token: string) {
        return this.jwtService.verify(token);
    }
}
