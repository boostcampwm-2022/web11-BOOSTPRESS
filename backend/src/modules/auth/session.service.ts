import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { Response } from 'express';
import { Auth } from 'src/types';
import { PrismaService } from '../prisma/prisma.service';
import { TokenService } from './token.service';

@Injectable()
export class SessionService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly tokenService: TokenService,
    ) {}

    async login(user: User, res: Response) {
        const userId = user.id,
            expiresAt = this.tokenService.loginExpirationDate();

        const accessToken = this.tokenService.createToken(user);
        res.cookie(
            Auth,
            `Bearer ${accessToken}`,
            this.tokenService.bearerOption(),
        );

        const where = { userId },
            create = { userId, accessToken, expiresAt },
            update = { accessToken, expiresAt };

        return await this.prisma.session.upsert({ where, create, update });
    }

    async logout(user: User, res: Response) {
        res.clearCookie(Auth);

        return this.prisma.session.update({
            where: { userId: user.id },
            data: {
                accessToken: '',
                expiresAt: new Date(new Date().getTime() - 1000),
            },
        });
    }
}
