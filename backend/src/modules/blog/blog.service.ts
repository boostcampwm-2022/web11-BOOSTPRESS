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
            include: {
                snsLink: true,
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
        const { nickname, bio, blogName, imageURL, snsLink } = dto;

        console.log(snsLink);

        // TODO: 트랜잭션을 이용해 사용자의 모든 SNS 링크를 수정해주어야 할까?
        if (snsLink !== undefined)
            await Promise.all(
                snsLink.map(
                    async (item) =>
                        await this.prisma.userSNS.upsert({
                            where: {
                                userId_name: { userId: id, name: item.snsName },
                            },
                            create: {
                                user: { connect: { id } },
                                name: item.snsName,
                                link: item.link,
                            },
                            update: { link: item.link },
                        }),
                ),
            );

        return this.prisma.user.update({
            where: { id },
            data: {
                nickname,
                bio,
                blogName,
                imageURL,
            },
            include: { snsLink: true },
        });
    }
}
