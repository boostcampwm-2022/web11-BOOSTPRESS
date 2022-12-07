import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { PatchDTO } from './dto';

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

    private articlePerTag(authorId: number) {
        return this.prisma.tag.findMany({
            // 사용자가 게시글을 작성하지 않은 태그를 필터링
            where: {
                articles: {
                    some: { authorId },
                },
            },
            // 사용자가 게시글을 작성한 적 있는 태그와 그 태그를 가진 게시글의 집합
            include: {
                articles: {
                    where: { authorId },
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

    async patch(user: User, dto: PatchDTO) {
        const { id } = user;
        const {
            bio,
            blogName,
            imageURL,
            twitterLink,
            facebookLink,
            linkedinLink,
        } = dto;
        return this.prisma.user.update({
            where: { id },
            data: {
                bio,
                blogName,
                imageURL,
                twitterLink,
                facebookLink,
                linkedinLink,
            },
        });
    }
}
