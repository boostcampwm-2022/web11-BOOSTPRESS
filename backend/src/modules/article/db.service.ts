import {
    BadRequestException,
    ForbiddenException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { FilterDTO, UpsertDTO } from './dto';

@Injectable()
export class DatabaseService {
    private readonly take = 12;

    constructor(private readonly prisma: PrismaService) {}

    async create(user: User, dto: UpsertDTO) {
        const connect = dto.tagId.map((value) => ({ id: value }));
        const article = await this.prisma.article.create({
            data: {
                authorId: user.id,
                title: dto.title,
                tags: { connect },
                categoryId: dto.categoryId,
            },
            include: this.includeOption(),
        });

        return article;
    }

    async readOne(id: number) {
        const article = await this.prisma.article.findUnique({
            where: { id },
            include: this.includeOption(),
        });

        if (article === null || article.deleted) {
            const message = `게시글 #${id}이(가) 존재하지 않습니다!`;
            throw new UnauthorizedException(message);
        }

        return article;
    }

    async readMany(query: FilterDTO) {
        const page: number = query.page ?? 1;
        delete query.page;

        const [articles, articleCount] = await Promise.all([
            this.prisma.article.findMany({
                where: {
                    ...query,
                    deleted: false,
                },
                include: this.includeOption(),
                skip: (page - 1) * this.take,
                take: this.take,
            }),
            this.prisma.article.count({ where: query }),
        ]);

        return {
            articles,
            totalPages: Math.ceil(articleCount / this.take),
        };
    }

    async update(user: User, dto: UpsertDTO, id: number) {
        await this.validateDbArticle(id, user.id);

        const article = await this.prisma.article.update({
            where: { id },
            data: {
                title: dto.title,
                categoryId: dto.categoryId,
                tags: {
                    connect: dto.tagId.map((value) => ({ id: value })),
                },
            },
            include: this.includeOption(),
        });

        return article;
    }

    async delete(user: User, id: number) {
        await this.validateDbArticle(id, user.id);

        const article = await this.prisma.article.update({
            where: { id },
            data: { deleted: true },
            include: this.includeOption(),
        });

        return article;
    }

    private includeOption() {
        return {
            author: true,
            tags: true,
            category: true,
        };
    }

    private async validateDbArticle(articleId: number, authorId: number) {
        const article = await this.prisma.article.findFirst({
            where: { id: articleId },
            include: this.includeOption(),
        });

        if (article === null) {
            const message = `게시글 #${article.id}이(가) 존재하지 않습니다!`;
            throw new UnauthorizedException(message);
        }
        if (article.authorId !== authorId) {
            const message = '게시글이 현재 사용자가 작성한 게시글이 아닙니다!';
            throw new ForbiddenException(message);
        }
        if (article.deleted) {
            const message = '삭제된 게시글입니다!';
            throw new BadRequestException(message);
        }
    }
}
