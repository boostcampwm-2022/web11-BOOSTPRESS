import { AxiosInstance } from 'axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { PrismaService } from '../prisma/prisma.service';
import { GitHubUser } from './dto';
import { githubServerUser, repoName } from './test';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
    private readonly TEST_ACCESS_TOKEN: string;
    private readonly axios: AxiosInstance;

    constructor(
        private readonly prisma: PrismaService,
        private readonly config: ConfigService,
        httpService: HttpService,
    ) {
        this.TEST_ACCESS_TOKEN = this.config.get('TEST_ACCESS_TOKEN');
        this.axios = httpService.axiosRef;
    }

    private async createRepo(data: GitHubUser, accessToken: string) {
        const { login: nickname } = data;
        const userHeader = { Authorization: `Bearer ${accessToken}` };
        const serverHeader = {
            Authorization: `Bearer ${this.TEST_ACCESS_TOKEN}`,
        };

        // 사용자 github에 repoName으로 repo 생성
        await this.axios.post(
            'https://api.github.com/user/repos',
            { name: repoName },
            { headers: userHeader },
        );

        // 생성한 repo에 BoostPress가 관리하는 사용자를 admin 사용자로 초대
        const { data: invitation } = await this.axios.put(
            `https://api.github.com/repos/${nickname}/${repoName}/collaborators/${githubServerUser.name}`,
            { permission: 'admin' },
            { headers: userHeader },
        );

        // 사용자 초대를 수락
        this.axios.patch(invitation.url, {}, { headers: serverHeader });
    }

    private async signup(data: GitHubUser, accessToken: string) {
        const { id, login: nickname, email } = data;

        // 사용자가 작성한 글을 백업하기 위한 repo를 생성
        this.createRepo(data, accessToken);

        return await this.prisma.user.create({ data: { id, nickname, email } });
    }

    async login(data: GitHubUser, accessToken: string) {
        const { id } = data;

        const user = await this.prisma.user.findUnique({ where: { id } });
        return user ?? (await this.signup(data, accessToken));
    }

    async commit(user: User) {
        const { data } = await this.axios.put(
            `https://api.github.com/repos/${user.nickname}/${repoName}/contents/test.md`,
            {
                message: '',
                content: Buffer.from(`this is a test text`).toString('base64'),
                committer: {
                    name: user.nickname,
                    email: user.email,
                },
            },
            { headers: { Authorization: `Bearer ${this.TEST_ACCESS_TOKEN}` } },
        );

        return data;
    }
}
