import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class FilterDTO {
    @IsNumber()
    @IsOptional()
    @ApiProperty({ description: 'pagination에 사용할 페이지 번호' })
    page: number;

    @IsNumber()
    @IsOptional()
    @ApiProperty({ description: '게시글 작성자의 ID' })
    authorId: number;

    @IsNumber()
    @IsOptional()
    @ApiProperty({ description: '게시글의 태그 ID' })
    tagId: number;

    @IsNumber()
    @IsOptional()
    @ApiProperty({ description: '게시글의 카테고리 ID' })
    categoryId: number;

    @IsString()
    @IsOptional()
    @ApiProperty({ description: '게시글의 제목에 포함된 문자열' })
    searchWord: string;
}
