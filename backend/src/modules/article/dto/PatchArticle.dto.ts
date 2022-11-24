import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { PostArticleDTO } from './PostArticle.dto';

export class PatchArticleDTO extends PostArticleDTO {
    @ApiProperty({ description: '게시글의 DB id' })
    @IsNumber()
    @IsNotEmpty()
    id: number;
}
