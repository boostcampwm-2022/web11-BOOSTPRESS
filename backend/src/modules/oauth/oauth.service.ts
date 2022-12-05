import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { TwitterDTO } from './dto';

@Injectable()
export class OAuthService {
    constructor(private readonly prisma: PrismaService) {}

    setTwitter(user: User, dto: TwitterDTO) {
        return this.prisma.userTwitter.upsert({
            where: {
                userId: user.id,
            },
            create: {
                userId: user.id,
                username: dto.data.username,
            },
            update: {
                username: dto.data.username,
            },
        });
    }
}
