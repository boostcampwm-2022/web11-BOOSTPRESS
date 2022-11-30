import { ArticleResponseDTO } from './ArticleResponse.dto';

export class ArticleListResponseDTO {
    articles: ArticleResponseDTO[];
    totalPages: number;
}
