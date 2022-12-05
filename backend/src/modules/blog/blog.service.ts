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

    private articlePerTag(id: number) {
        return this.prisma.tag.findMany({
            // 사용자가 게시글을 작성하지 않은 태그를 필터링
            where: {
                articles: {
                    some: {
                        authorId: id,
                    },
                },
            },
            // 사용자가 게시글을 작성한 적 있는 태그와 그 태그를 가진 게시글의 집합
            select: {
                id: true,
                name: true,
                articles: {
                    where: {
                        authorId: id,
                    },
                },
            },
        });
    }

    async read(id: number) {
        const [basicInfo, articles] = await Promise.all([
            this.getBasicInfo(id),
            this.articlePerTag(id),
        ]);

        return {
            ...basicInfo,
            tag: articles.map((item) => ({
                name: item.name,
                articleCount: item.articles.length,
            })),
        };
    }
}
