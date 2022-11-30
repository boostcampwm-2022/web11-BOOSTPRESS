import { ApiProperty } from '@nestjs/swagger';
import { User, Tag, Article } from '@prisma/client';
import { ArticleDTO } from './Article.dto';

class ArticleJoin {
    author: User;
    tags: Tag[];
}

export class ArticleResponseDTO {
    @ApiProperty({ description: '게시글의 ID' })
    id: number;

    @ApiProperty({ description: '게시글의 제목' })
    title: string;

    @ApiProperty({ description: '게시글 작성자의 ID' })
    authorId: number;

    @ApiProperty({ description: '게시글이 생성된 시간의 Date 객체' })
    createdAt: Date;

    @ApiProperty({ description: '게시글이 마지막으로 수정된 시간의 Date 객체' })
    updatedAt: Date;

    static toBreif(article: Article): ArticleResponseDTO {
        return {
            id: article.id,
            title: article.title,
            authorId: article.authorId,
            createdAt: article.createdAt,
            updatedAt: article.updatedAt,
        };
    }

    static toDetail(
        article: Article & ArticleJoin,
        content: string,
    ): ArticleResponseDTO & ArticleDTO {
        return {
            ...ArticleResponseDTO.toBreif(article),
            content,
            tagId: article.tags.map((tag) => tag.id),
        };
    }
}
