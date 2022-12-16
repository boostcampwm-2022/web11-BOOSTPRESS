import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosInstance } from 'axios';
import { randomUUID } from 'node:crypto';
import { Env } from 'src/types';
import { PrismaService } from '../prisma/prisma.service';
import { GitHubEmailDTO, GitHubUserDTO } from './dto';

@Injectable()
export class UserService {
    private readonly SERVER_ACCESS_TOKEN: string;
    private readonly SERVER_USER_NAME: string;
    private readonly axios: AxiosInstance;

    constructor(
        private readonly prisma: PrismaService,
        httpService: HttpService,
        config: ConfigService<Env>,
    ) {
        this.SERVER_ACCESS_TOKEN = config.get('SERVER_ACCESS_TOKEN');
        this.SERVER_USER_NAME = config.get('SERVER_USER_NAME');
        this.axios = httpService.axiosRef;
    }

    private async createRepo(data: GitHubUserDTO, accessToken: string) {
        const { login } = data;
        const userHeader = { Authorization: `Bearer ${accessToken}` };
        const serverHeader = {
            Authorization: `Bearer ${this.SERVER_ACCESS_TOKEN}`,
        };

        const repoName = `BoostPress-${data.login}-${
            randomUUID().split('-')[0]
        }`;

        // 사용자 github에 repoName으로 repo 생성
        await this.axios.post(
            'https://api.github.com/user/repos',
            { name: repoName },
            { headers: userHeader },
        );

        // 생성한 repo에 BoostPress가 관리하는 사용자를 admin 사용자로 초대
        const { data: invitation } = await this.axios.put(
            `https://api.github.com/repos/${login}/${repoName}/collaborators/${this.SERVER_USER_NAME}`,
            { permission: 'admin' },
            { headers: userHeader },
        );

        // 사용자 초대를 수락
        await this.axios.patch(invitation.url, {}, { headers: serverHeader });

        return repoName;
    }

    private async getEmail(accessToken: string) {
        const headers = { Authorization: `Bearer ${accessToken}` };
        const { data } = await this.axios.get<GitHubEmailDTO[]>(
            'https://api.github.com/user/emails',
            { headers },
        );

        if (data.length === 0) {
            const message = '이메일을 가져올 수 없습니다!';
            throw new BadRequestException(message);
        }

        return data[0].email;
    }

    private async createUser(data: GitHubUserDTO, accessToken: string) {
        const { id, login } = data;

        const [email, repoName] = await Promise.all([
            this.getEmail(accessToken),
            this.createRepo(data, accessToken),
        ]);

        return await this.prisma.user.create({
            data: {
                id,
                login,
                email,
                nickname: login,
                repoName,
                blogName: `${login}의 블로그`,
                bio: `${login}의 블로그입니다`,
                imageURL: `https://avatars.githubusercontent.com/${login}`,
            },
        });
    }

    async getUser(accessToken: string) {
        const { data } = await this.axios.get<GitHubUserDTO>(
            'https://api.github.com/user',
            { headers: { Authorization: `Bearer ${accessToken}` } },
        );

        const { id } = data;

        const user = await this.prisma.user.findUnique({ where: { id } });
        return user ?? (await this.createUser(data, accessToken));
    }
}
