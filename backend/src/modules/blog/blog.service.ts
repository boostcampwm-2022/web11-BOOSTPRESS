import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { BlogBriefResponseDTO, BlogDetailedResponseDTO, PatchDTO } from './dto';

@Injectable()
export class BlogService {
    constructor(private readonly prisma: PrismaService) {}

    private getBasicInfo(id: number) {
        return this.prisma.user.findUnique({
            where: { id },
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

    async read(id: number): Promise<BlogDetailedResponseDTO> {
        const [user, articles] = await Promise.all([
            this.getBasicInfo(id),
            this.articlePerTag(id),
        ]);

        return {
            ...BlogBriefResponseDTO.toBrief(user),
            tag: articles.map((item) => ({
                id: item.id,
                name: item.name,
                articleCount: item.articles.length,
            })),
        };
    }

    async patch(user: User, dto: PatchDTO) {
        const { id } = user;
        const {
            nickname,
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
                nickname,
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
