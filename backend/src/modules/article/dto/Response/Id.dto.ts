import { ApiProperty } from '@nestjs/swagger';

export class ArticleIdResponseDTO {
    @ApiProperty({ description: '게시글의 ID' })
    id: number;
}
