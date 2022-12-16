import { Article } from '@prisma/client';
import { ArticleIdResponseDTO } from './Id.dto';

export class ArticleCommandResponseDTO extends ArticleIdResponseDTO {
    static fromArticle(article: Article): ArticleCommandResponseDTO {
        return { id: article.id };
    }
}
