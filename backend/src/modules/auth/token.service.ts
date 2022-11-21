import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { CookieOptions } from 'express';

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

    bearerOption(): CookieOptions {
        return {
            expires: new Date(new Date().getTime() + this.JWT_LIFESPAN),
            maxAge: this.JWT_LIFESPAN,
            httpOnly: true,
        };
    }

    create(user: User) {
        const payload = { sub: user.id };
        const jwt = this.jwtService.sign(payload, {
            secret: this.JWT_SECRET,
            expiresIn: `${this.JWT_LIFESPAN}ms`,
        });

        return jwt;
    }

    verify(token: string) {
        return this.jwtService.verify(token);
    }
}
