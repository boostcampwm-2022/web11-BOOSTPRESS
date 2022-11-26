import { ApiProperty } from '@nestjs/swagger';

export class ArticleResponseDTO {
    @ApiProperty({ description: '게시글의 ID' })
    id: number;
}
