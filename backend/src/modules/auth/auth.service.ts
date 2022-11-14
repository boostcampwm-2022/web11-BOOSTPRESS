import { decode } from 'node:querystring';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { GitHubUser } from './dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly httpService: HttpService,
        private readonly config: ConfigService,
        private readonly prisma: PrismaService,
    ) {}

    private async githubAccessToken(code: string) {
        const CLIENT_ID = this.config.get('GITHUB_CLIENT_ID'),
            CLIENT_SECRET = this.config.get('GITHUB_CLIENT_SECRET');

        const oAuthLink = `https://github.com/login/oauth/access_token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${code}`;
        const oAuth = await this.httpService.axiosRef.post(oAuthLink);

        return decode(oAuth.data).access_token as string;
    }

    private async githubUser(accessToken: string) {
        const githubRes = await this.httpService.axiosRef.get(
            'https://api.github.com/user',
            {
                headers: { Authorization: `Bearer ${accessToken}` },
            },
        );

        return githubRes.data as GitHubUser;
    }

    private signup(data: GitHubUser) {
        const { id, login: nickname } = data;
        return this.prisma.user.create({ data: { id, nickname } });
    }

    async login(code: string) {
        const accessToken = await this.githubAccessToken(code);
        const data = await this.githubUser(accessToken);

        const { id } = data;
        const idCount = await this.prisma.user.count({ where: { id } });
        if (idCount < 1) await this.signup(data);

        return data;
    }
}
