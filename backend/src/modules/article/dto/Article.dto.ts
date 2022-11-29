import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ArticleDTO {
    @ApiProperty({ description: '게시글의 제목' })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({ description: '게시글의 내용' })
    @IsString()
    @IsNotEmpty()
    content: string;

    @IsNumber()
    categoryId?: number | undefined;
}
