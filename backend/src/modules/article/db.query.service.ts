import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { FilterDTO } from './dto';

@Injectable()
export class DatabaseQueryService {
    private readonly take = 12;

    constructor(private readonly prisma: PrismaService) {}

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

        const { authorId, tagId, categoryId, searchWord } = query;
        const where = {
            authorId,
            title: { contains: searchWord },
            categoryId,
            tags: { every: { id: tagId } },
            deleted: false,
        };

        const [articles, articleCount] = await Promise.all([
            this.prisma.article.findMany({
                where,
                include: this.includeOption(),
                skip: (page - 1) * this.take,
                orderBy: {
                    id: 'desc',
                },
                take: this.take,
            }),
            this.prisma.article.count({ where }),
        ]);

        return {
            articles,
            totalPages: Math.ceil(articleCount / this.take),
        };
    }

    private includeOption() {
        return {
            author: true,
            tags: true,
            category: true,
        };
    }
}
