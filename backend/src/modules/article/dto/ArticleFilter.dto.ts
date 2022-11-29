import { IsNumber } from 'class-validator';

export class ArticleFilterDTO {
    @IsNumber()
    page: number;

    @IsNumber()
    authorId: number;

    @IsNumber()
    tagId: number;

    @IsNumber()
    categoryId: number;
}
