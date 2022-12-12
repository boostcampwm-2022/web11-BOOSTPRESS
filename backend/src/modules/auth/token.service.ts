import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { CookieOptions } from 'express';
import { Env } from 'src/types';

@Injectable()
export class TokenService {
    private readonly LOGIN_LIFESPAN: number;
    private readonly JWT_LIFESPAN: number;
    private readonly JWT_SECRET: string;

    constructor(
        private readonly jwtService: JwtService,
        config: ConfigService<Env>,
    ) {
        this.LOGIN_LIFESPAN = parseInt(config.get('LOGIN_LIFESPAN'));
        this.JWT_LIFESPAN = parseInt(config.get('JWT_LIFESPAN'));
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

    createToken(user: User) {
        const payload = { sub: user.id };
        const jwt = this.jwtService.sign(payload, {
            secret: this.JWT_SECRET,
            expiresIn: `${this.JWT_LIFESPAN}ms`,
        });

        return jwt;
    }
}
