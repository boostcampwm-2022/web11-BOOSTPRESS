import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class PostArticle {
    @ApiProperty({ description: '게시글의 제목' })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({ description: '게시글의 내용' })
    @IsString()
    @IsNotEmpty()
    content: string;
}
