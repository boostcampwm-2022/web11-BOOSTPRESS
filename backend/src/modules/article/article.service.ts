import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Article, User } from '@prisma/client';
import { AxiosInstance } from 'axios';
import { repoName } from '../auth/test';
import { PrismaService } from '../prisma/prisma.service';
import { CommitResponseDTO, PostArticle } from './dto';

@Injectable()
export class ArticleService {
    private readonly TEST_ACCESS_TOKEN: string;
    private readonly axios: AxiosInstance;

    constructor(
        private readonly prisma: PrismaService,
        config: ConfigService,
        httpService: HttpService,
    ) {
        this.TEST_ACCESS_TOKEN = config.get('TEST_ACCESS_TOKEN');
        this.axios = httpService.axiosRef;
    }

    async create(user: User, dto: PostArticle) {
        const article = await this.prisma.article.create({
            data: {
                authorId: user.id,
                title: dto.title,
            },
        });

        const { content } = await this.commit(user, dto, article);

        await this.prisma.article.update({
            where: { id: article.id },
            data: { updateSHA: content.sha },
        });

        return { id: article.id };
    }

    private async commit(user: User, dto: PostArticle, article: Article) {
        const requestData = {
            message: article.title,
            content: Buffer.from(dto.content).toString('base64'),
            committer: {
                name: user.login,
                email: user.email,
            },
            sha: article.updateSHA,
        };

        if (article.updateSHA === '') delete requestData.sha;

        const { data } = await this.axios.put<CommitResponseDTO>(
            `https://api.github.com/repos/${user.login}/${repoName}/contents/${article.id}/README.md`,
            requestData,
            { headers: { Authorization: `Bearer ${this.TEST_ACCESS_TOKEN}` } },
        );

        return data;
    }
}
