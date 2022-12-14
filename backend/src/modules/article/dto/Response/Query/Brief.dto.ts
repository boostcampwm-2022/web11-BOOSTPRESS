import { Article } from '@prisma/client';
import { AuthorDTO, CategoryDTO, JoinDTO } from './join';
import { ArticleQueryResponseDTO } from './Query.dto';

export class ArticleBriefResponseDTO extends ArticleQueryResponseDTO {
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
            mainImageURL: article.mainImageURL,
        };
    }
}
