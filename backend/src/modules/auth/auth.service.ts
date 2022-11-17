import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { GitHubUser } from './dto';
import { collaborator } from './test';

@Injectable()
export class AuthService {
    name = 'test-repo';

    constructor(
        private readonly prisma: PrismaService,
        private readonly config: ConfigService,
        private readonly httpService: HttpService,
    ) {}

    private async signup(data: GitHubUser, accessToken: string) {
        const { id, login: nickname } = data;
        const headers = { Authorization: `Bearer ${accessToken}` };

        await this.httpService.axiosRef.post(
            'https://api.github.com/user/repos',
            { name: this.name },
            { headers },
        );

        await this.httpService.axiosRef.put(
            `https://api.github.com/repos/${nickname}/${this.name}/collaborators/${collaborator.name}`,
            { permission: 'admin' },
            { headers },
        );

        return await this.prisma.user.create({ data: { id, nickname } });
    }

    async login(data: GitHubUser, accessToken: string) {
        const { id } = data;

        const user = await this.prisma.user.findUnique({ where: { id } });
        return user ?? (await this.signup(data, accessToken));
    }

    async commit() {
        const accessToken = this.config.get('TEST_ACCESS_TOKEN');

        const { data } = await this.httpService.axiosRef.put(
            `https://api.github.com/repos/${collaborator.name}/${this.name}/contents/test.md`,
            {
                message: '',
                content: Buffer.from(`this is a test text`).toString('base64'),
                committer: collaborator,
            },
            { headers: { Authorization: `Bearer ${accessToken}` } },
        );

        return data;
    }
}
