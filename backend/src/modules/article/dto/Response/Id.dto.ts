import { ApiProperty } from '@nestjs/swagger';

export class ArticleIdResponseDTO {
    @ApiProperty({ description: 'κ²μκΈμ ID' })
    id: number;
}
