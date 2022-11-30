import { ApiProperty } from '@nestjs/swagger';
import { Category } from '@prisma/client';
import { CategoryDTO } from './Category.dto';

export class CategoryResponseDTO extends CategoryDTO {
    @ApiProperty({ description: '카테고리의 ID' })
    id: number;

    static fromCategory(category: Category): CategoryResponseDTO {
        return {
            id: category.id,
            name: category.name,
        };
    }
}
