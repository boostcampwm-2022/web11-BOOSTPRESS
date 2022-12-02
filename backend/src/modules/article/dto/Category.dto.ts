import { ApiProperty } from '@nestjs/swagger';
import { Category } from '@prisma/client';

export class CategoryDTO {
    @ApiProperty({ description: '카테고리의 id' })
    id: number;

    @ApiProperty({ description: '카테고리의 이름' })
    name: string;

    static fromCategory(category: Category): CategoryDTO {
        const { id, name } = category;
        return { id, name };
    }
}
