import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly httpService: HttpService,
    ) {}

    private async signup(id: number, nickname: string, accessToken: string) {
        const repoName = 'test-repo';

        await this.httpService.axiosRef.post(
            'https://api.github.com/user/repos',
            { name: repoName },
            { headers: { Authorization: `Bearer ${accessToken}` } },
        );

        return await this.prisma.user.create({ data: { id, nickname } });
    }

    async login(id: number, nickname: string, accessToken: string) {
        const user = await this.prisma.user.findUnique({ where: { id } });
        return user ?? (await this.signup(id, nickname, accessToken));
    }
}
