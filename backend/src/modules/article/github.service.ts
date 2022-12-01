import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Article, User } from '@prisma/client';
import { AxiosInstance } from 'axios';
import { PrismaService } from '../prisma/prisma.service';
import { GitHubPullDTO, GitHubPushDTO } from './dto';
import { Env } from 'src/types';

@Injectable()
export class ArticleService {
    private readonly SERVER_ACCESS_TOKEN: string;
    private readonly axios: AxiosInstance;

    constructor(
        private readonly prisma: PrismaService,
        config: ConfigService<Env>,
        httpService: HttpService,
    ) {
        this.SERVER_ACCESS_TOKEN = config.get('SERVER_ACCESS_TOKEN');
        this.axios = httpService.axiosRef;
    }

    async getContent(author: User, id: number) {
        const { data } = await this.axios.get<GitHubPullDTO>(
            `https://api.github.com/repos/${author.login}/${author.repoName}/readme/${id}`,
        );

        return Buffer.from(data.content, 'base64').toString();
    }

    async commit(article: Article, content: string, author: User) {
        const requestData = {
            message: article.title,
            content: Buffer.from(content).toString('base64'),
            committer: {
                name: author.login,
                email: author.email,
            },
            sha: article.updateSHA,
        };
        const headers = {
            Authorization: `Bearer ${this.SERVER_ACCESS_TOKEN}`,
        };

        const { data } = await this.axios.put<GitHubPushDTO>(
            `https://api.github.com/repos/${author.login}/${author.repoName}/contents/${article.id}/README.md`,
            requestData,
            { headers },
        );

        await this.prisma.article.update({
            where: { id: article.id },
            data: { updateSHA: data.content.sha },
        });

        return data;
    }
}
