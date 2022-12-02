import { IsNumber, IsOptional } from 'class-validator';

export class FilterDTO {
    @IsNumber()
    @IsOptional()
    page: number;

    @IsNumber()
    @IsOptional()
    authorId: number;

    @IsNumber()
    @IsOptional()
    tagId: number;

    @IsNumber()
    @IsOptional()
    categoryId: number;
}
