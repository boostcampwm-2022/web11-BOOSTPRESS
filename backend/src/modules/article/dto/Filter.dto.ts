import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

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

    @IsString()
    @IsOptional()
    searchWord: string;
}
