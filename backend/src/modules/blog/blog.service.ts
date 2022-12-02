import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BlogService {
    constructor(private readonly prisma: PrismaService) {}

    private getBasicInfo(id: number) {
        return this.prisma.user.findUnique({
            where: { id },
            select: {
                bio: true,
                imageURL: true,
                blogName: true,
            },
        });
    }

    private articleCountPerTag(id: number) {
        return this.prisma.tag.findMany({
            where: {
                articles: {
                    every: {
                        authorId: id,
                    },
                },
            },
            select: {
                name: true,
                _count: {
                    select: {
                        articles: true,
                    },
                },
            },
        });
    }

    async read(id: number) {
        const [basicInfo, counts] = await Promise.all([
            this.getBasicInfo(id),
            this.articleCountPerTag(id),
        ]);

        return {
            ...basicInfo,
            tag: counts.map((item) => ({
                name: item.name,
                articleCount: item._count.articles,
            })),
        };
    }
}
