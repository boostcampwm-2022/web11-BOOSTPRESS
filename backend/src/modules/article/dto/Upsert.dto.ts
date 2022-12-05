import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpsertDTO {
    @ApiProperty({ description: '게시글의 제목' })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({ description: '게시글의 내용' })
    @IsString()
    @IsNotEmpty()
    content: string;

    @ApiProperty({
        description: '게시글의 태그의 ID 목록',
        type: 'array',
        items: { type: 'number' },
    })
    @IsNumber({}, { each: true })
    tagId: number[];

    @IsNumber()
    @ApiProperty({ description: '게시글의 카테고리 ID' })
    categoryId?: number | undefined;
}
