import { ApiProperty } from '@nestjs/swagger';
import { Tag } from '@prisma/client';
import { ArticleIdResponseDTO } from '../Id.dto';
import { AuthorDTO, CategoryDTO, TagDTO } from './join';

export class ArticleQueryResponseDTO extends ArticleIdResponseDTO {
    @ApiProperty({ description: '게시글의 제목' })
    title: string;

    @ApiProperty({ description: '게시글 작성자의 ID' })
    author: AuthorDTO;

    @ApiProperty({ description: '게시글이 생성된 시간의 Date 객체' })
    createdAt: Date;

    @ApiProperty({ description: '게시글이 마지막으로 수정된 시간의 Date 객체' })
    updatedAt: Date;

    @ApiProperty({ description: '게시글의 태그 목록' })
    tags: TagDTO[];

    @ApiProperty({ description: '게시글의 카테고리' })
    category?: CategoryDTO;

    @ApiProperty({ description: '게시글의 메인 이미지 URL' })
    mainImageURL: string;
}
