import { ApiProperty } from '@nestjs/swagger';
import { Category } from '@prisma/client';
import { CategoryDTO } from './Category.dto';

export class CategoryResponseDTO extends CategoryDTO {
    @ApiProperty({ description: '카테고리의 ID' })
    id: number;

    @ApiProperty({
        description: '카테고리의 자식 카테고리들',
        isArray: true,
    })
    children: CategoryResponseDTO[];

    static fromCategory(
        category: Category & { childCategory?: Category[] },
    ): CategoryResponseDTO {
        return {
            id: category.id,
            name: category.name,
            parentId: category.parentCategoryId,
            children: [],
        };
    }
}
