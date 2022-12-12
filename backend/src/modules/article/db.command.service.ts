import {
    BadRequestException,
    ForbiddenException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { parseMainImageURL } from 'src/utils';
import { PrismaService } from '../prisma/prisma.service';
import { ArticleCommandResponseDTO, UpsertDTO } from './dto';

@Injectable()
export class DatabaseCommandService {
    constructor(private readonly prisma: PrismaService) {}

    async create(user: User, dto: UpsertDTO) {
        const article = await this.prisma.article.create({
            data: {
                authorId: user.id,
                ...this.dtoToData(dto),
            },
        });

        return article;
    }

    async update(user: User, dto: UpsertDTO, id: number) {
        await this.validateDbArticle(id, user.id);

        const article = await this.prisma.article.update({
            where: { id },
            data: this.dtoToData(dto),
        });

        return article;
    }

    async delete(user: User, id: number): Promise<ArticleCommandResponseDTO> {
        await this.validateDbArticle(id, user.id);

        const article = await this.prisma.article.update({
            where: { id },
            data: { deleted: true },
            select: { id: true },
        });

        return article;
    }

    private dtoToData(dto: UpsertDTO) {
        const connectTag = dto.tagId.map((value) => ({ id: value }));
        return {
            title: dto.title,
            categoryId: dto.categoryId,
            tags: { connect: connectTag },
            mainImageURL: parseMainImageURL(dto.content),
        };
    }

    private async validateDbArticle(articleId: number, authorId: number) {
        const article = await this.prisma.article.findUnique({
            where: { id: articleId },
            select: { authorId: true, deleted: true },
        });

        if (article === null) {
            const message = `게시글 #${articleId}이(가) 존재하지 않습니다!`;
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
