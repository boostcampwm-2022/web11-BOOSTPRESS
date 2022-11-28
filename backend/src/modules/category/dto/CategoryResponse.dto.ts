import { ApiProperty } from '@nestjs/swagger';
import { CategoryDTO } from './Category';

export class CategoryResponse extends CategoryDTO {
    @ApiProperty({ description: '카테고리의 ID' })
    id: number;
}
