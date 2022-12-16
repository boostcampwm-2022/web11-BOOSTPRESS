import { ApiProperty } from '@nestjs/swagger';
import { Tag } from '@prisma/client';

export class TagDTO {
    @ApiProperty({ description: '태그의 ID' })
    id: number;

    @ApiProperty({ description: '태그의 이름' })
    name: string;

    static fromTag(tag: Tag) {
        const { id, name } = tag;
        return { id, name };
    }
}
