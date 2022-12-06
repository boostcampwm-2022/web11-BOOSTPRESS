import { ApiProperty } from '@nestjs/swagger';
import { User, Tag, Article } from '@prisma/client';
import { CategoryDTO } from './Category.dto';
import { JoinDTO } from './Join.dto';

class AuthorDTO {
    id: number;
    nickname: string;

    static fromUser(user: User) {
        const { id, nickname } = user;
        return { id, nickname };
    }
}

class ArticleResponseDTO {
    @ApiProperty({ description: '게시글의 ID' })
    id: number;

    @ApiProperty({ description: '게시글의 제목' })
    title: string;

    @ApiProperty({ description: '게시글 작성자의 ID' })
    author: AuthorDTO;

    @ApiProperty({ description: '게시글이 생성된 시간의 Date 객체' })
    createdAt: Date;

    @ApiProperty({ description: '게시글이 마지막으로 수정된 시간의 Date 객체' })
    updatedAt: Date;

    @ApiProperty({ description: '게시글의 태그 목록' })
    tags: Tag[];

    @ApiProperty({ description: '게시글의 카테고리' })
    category?: CategoryDTO;
}

export class ArticleBriefResponseDTO extends ArticleResponseDTO {
    static fromArticle(article: Article & JoinDTO): ArticleBriefResponseDTO {
        return {
            id: article.id,
            title: article.title,
            author: AuthorDTO.fromUser(article.author),
            createdAt: article.createdAt,
            updatedAt: article.updatedAt,
            tags: article.tags,
            category:
                article.category && CategoryDTO.fromCategory(article.category),
        };
    }
}

export class ArticleListResponseDTO {
    @ApiProperty({
        description: '게시글의 내용을 포함하지 않는 정보',
        type: [ArticleBriefResponseDTO],
    })
    articles: ArticleBriefResponseDTO[];

    @ApiProperty({ description: '특정 조건을 지닌 게시글 목록의 페이지 수' })
    totalPages: number;
}

export class ArticleDetailedResponseDTO extends ArticleResponseDTO {
    @ApiProperty({ description: '게시글의 내용' })
    content: string;

    static fromArticle(
        article: Article & JoinDTO,
        content: string,
    ): ArticleDetailedResponseDTO {
        return {
            ...ArticleBriefResponseDTO.fromArticle(article),
            content,
        };
    }
}
