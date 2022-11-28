import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CategoryDTO {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: '카테고리의 이름' })
    name: string;
}
