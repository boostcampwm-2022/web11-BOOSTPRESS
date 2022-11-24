import { ApiProperty } from '@nestjs/swagger';

export class PostArticleResponseDTO {
    @ApiProperty({ description: '게시글의 ID' })
    id: number;
}
