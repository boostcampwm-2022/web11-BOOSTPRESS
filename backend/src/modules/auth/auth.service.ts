import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';
import { AxiosInstance } from 'axios';
import { Response } from 'express';
import { Auth } from 'src/types';
import { PrismaService } from '../prisma/prisma.service';
import { GitHubUser } from './dto';
import { githubServerUser, repoName } from './test';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
    private readonly TEST_ACCESS_TOKEN: string;
    private readonly axios: AxiosInstance;

    constructor(
        private readonly prisma: PrismaService,
        private readonly config: ConfigService,
        private readonly tokenService: TokenService,
        httpService: HttpService,
    ) {
        this.TEST_ACCESS_TOKEN = this.config.get('TEST_ACCESS_TOKEN');
        this.axios = httpService.axiosRef;
    }

    private async createRepo(data: GitHubUser, accessToken: string) {
        const { login } = data;
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
            `https://api.github.com/repos/${login}/${repoName}/collaborators/${githubServerUser.name}`,
            { permission: 'admin' },
            { headers: userHeader },
        );

        // 사용자 초대를 수락
        this.axios.patch(invitation.url, {}, { headers: serverHeader });
    }

    private async signup(data: GitHubUser, accessToken: string) {
        const { id, login, email } = data;

        // 사용자가 작성한 글을 백업하기 위한 repo를 생성
        this.createRepo(data, accessToken);

        return await this.prisma.user.create({
            data: { id, login, email, nickname: login },
        });
    }

    async login(data: GitHubUser, accessToken: string) {
        const { id } = data;

        const user = await this.prisma.user.findUnique({ where: { id } });
        return user ?? (await this.signup(data, accessToken));
    }

    async logout(user: User, res: Response) {
        res.clearCookie(Auth);
        return await this.tokenService.softDelete(user);
    }
}
