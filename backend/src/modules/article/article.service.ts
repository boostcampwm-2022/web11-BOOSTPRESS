import { HttpService } from '@nestjs/axios';
import {
    BadRequestException,
    ForbiddenException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Article, User } from '@prisma/client';
import { AxiosInstance } from 'axios';
import { repoName } from '../auth/test';
import { PrismaService } from '../prisma/prisma.service';
import {
    CommitResponseDTO,
    FetchResponseDTO,
    PatchArticleDTO,
    PostArticleDTO,
} from './dto';

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

    async create(user: User, dto: PostArticleDTO) {
        const article = await this.prisma.article.create({
            data: {
                authorId: user.id,
                title: dto.title,
            },
        });

        await this.commit(user, dto, article);
        return { id: article.id };
    }

    async readOne(id: number) {
        const article = await this.prisma.article.findUnique({
            where: { id },
            select: { author: true, deleted: true },
        });

        if (article === null || article.deleted) {
            const message = `게시글 #${id}이(가) 존재하지 않습니다!`;
            throw new UnauthorizedException(message);
        }

        const { data } = await this.axios.get<FetchResponseDTO>(
            `https://api.github.com/repos/${article.author.login}/${repoName}/readme/${id}`,
        );

        data.content = Buffer.from(data.content, 'base64').toString();

        return { content: data.content };
    }

    async update(user: User, dto: PatchArticleDTO) {
        const article = await this.getArticleWithUser(dto.id, user.id);

        await Promise.all([
            this.commit(user, dto, article),
            this.prisma.article.update({
                where: { id: dto.id },
                data: { title: dto.title },
            }),
        ]);

        return { id: article.id };
    }

    async delete(user: User, id: number) {
        const article = await this.getArticleWithUser(id, user.id);

        await this.prisma.article.update({
            where: { id },
            data: { deleted: true },
        });

        return { id: article.id };
    }

    private async getArticleWithUser(id: number, authorId: number) {
        const article = await this.prisma.article.findFirst({
            where: { id },
        });

        if (article.authorId !== authorId) {
            const message = '게시글이 현재 사용자가 작성한 게시글이 아닙니다!';
            throw new ForbiddenException(message);
        }
        if (article.deleted) {
            const message = '삭제된 게시글입니다!';
            throw new BadRequestException(message);
        }

        return article;
    }

    private async commit(user: User, dto: PostArticleDTO, article: Article) {
        const requestData = {
            message: dto.title,
            content: Buffer.from(dto.content).toString('base64'),
            committer: {
                name: user.login,
                email: user.email,
            },
            sha: article.updateSHA ?? '',
        };

        if (requestData.sha === '') delete requestData.sha;

        const { data } = await this.axios.put<CommitResponseDTO>(
            `https://api.github.com/repos/${user.login}/${repoName}/contents/${article.id}/README.md`,
            requestData,
            { headers: { Authorization: `Bearer ${this.TEST_ACCESS_TOKEN}` } },
        );

        await this.prisma.article.update({
            where: { id: article.id },
            data: { updateSHA: data.content.sha },
        });

        return data;
    }
}
