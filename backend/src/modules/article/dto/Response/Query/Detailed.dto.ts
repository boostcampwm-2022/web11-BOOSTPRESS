import { ApiProperty } from '@nestjs/swagger';
import { Article } from '@prisma/client';
import { ArticleBriefResponseDTO } from './Brief.dto';
import { JoinDTO } from './join';
import { ArticleQueryResponseDTO } from './Query.dto';

export class ArticleDetailedResponseDTO extends ArticleQueryResponseDTO {
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
