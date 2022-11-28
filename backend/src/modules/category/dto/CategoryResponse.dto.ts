import { ApiProperty } from '@nestjs/swagger';
import { Category } from '@prisma/client';
import { CategoryDTO } from './Category.dto';

export class CategoryResponse extends CategoryDTO {
    @ApiProperty({ description: '카테고리의 ID' })
    id: number;

    static fromCategory(category: Category): CategoryResponse {
        return {
            id: category.id,
            name: category.name,
        };
    }
}
