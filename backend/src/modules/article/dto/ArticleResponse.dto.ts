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

    @ApiProperty({ description: '게시글 작성자의 ID' })
    authorId: number;

    static toBreif(article: Article): ArticleResponseDTO {
        return { id: article.id, authorId: article.authorId };
    }

    static toDetail(
        article: Article & ArticleJoin,
        content: string,
    ): ArticleResponseDTO & ArticleDTO {
        return {
            id: article.id,
            authorId: article.authorId,
            title: article.title,
            content,
            tagId: article.tags.map((tag) => tag.id),
        };
    }
}
