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
import * as path from 'path';
import * as fs from 'fs';
import { PrismaService } from '../prisma/prisma.service';
import {
    ArticleDTO,
    ArticleResponseDTO,
    CommitResponseDTO,
    FetchResponseDTO,
} from './dto';
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

    async create(user: User, dto: ArticleDTO) {
        const article = await this.prisma.article.create({
            data: {
                authorId: user.id,
                title: dto.title,
                categoryId: dto.categoryId,
            },
        });

        await this.commit(user, dto, article);

        const goalPath = path.resolve(
            __dirname,
            `../../../articles/${article.id}`,
        );
        if (fs.existsSync(goalPath)) {
            throw new Error('fileId already exists.');
        }
        fs.mkdirSync(goalPath, { recursive: true });
        fs.writeFileSync(goalPath + `/${dto.title}.md`, dto.content);

        return { id: article.id };
    }

    async readOne(id: number) {
        const article = await this.prisma.article.findUnique({
            where: { id },
            include: { author: true },
        });

        if (article === null || article.deleted) {
            const message = `게시글 #${id}이(가) 존재하지 않습니다!`;
            throw new UnauthorizedException(message);
        }

        const { data } = await this.axios.get<FetchResponseDTO>(
            `https://api.github.com/repos/${article.author.login}/${article.author.repoName}/readme/${id}`,
        );

        data.content = Buffer.from(data.content, 'base64').toString();

        return ArticleDTO.fromArticle(article, data.content);
    }

    async update(user: User, dto: ArticleDTO, id: number) {
        const article = await this.getArticleWithUser(id, user.id);

        await Promise.all([
            this.commit(user, dto, article),
            this.prisma.article.update({
                where: { id },
                data: {
                    title: dto.title,
                    categoryId: dto.categoryId,
                },
            }),
        ]);

        let basePath = path.resolve(__dirname, `../../../articles/${id}`);
        if (!fs.existsSync(basePath + `/${article.title}.md`)) {
            throw new Error('수정하려는 파일이 존재하지 않습니다.');
        }
        fs.renameSync(
            basePath + `/${article.title}.md`,
            basePath + `/${dto.title}.md`,
        );
        fs.writeFileSync(basePath + `/${dto.title}.md`, dto.content);

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

    private async commit(user: User, dto: ArticleDTO, article: Article) {
        const requestData = {
            message: dto.title,
            content: Buffer.from(dto.content).toString('base64'),
            committer: {
                name: user.login,
                email: user.email,
            },
            sha: article.updateSHA ?? '',
        };
        const headers = {
            Authorization: `Bearer ${this.SERVER_ACCESS_TOKEN}`,
        };

        if (requestData.sha === '') delete requestData.sha;

        const { data } = await this.axios.put<CommitResponseDTO>(
            `https://api.github.com/repos/${user.login}/${user.repoName}/contents/${article.id}/README.md`,
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
