import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
    constructor(private readonly prisma: PrismaService) {}

    private signup(id: number, nickname: string) {
        return this.prisma.user.create({ data: { id, nickname } });
    }

    async login(id: number, nickname: string) {
        const user = await this.prisma.user.findUnique({ where: { id } });
        return user ?? (await this.signup(id, nickname));
    }
}
