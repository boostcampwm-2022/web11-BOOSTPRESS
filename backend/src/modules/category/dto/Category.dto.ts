import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CategoryDTO {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: '카테고리의 이름' })
    name: string;

    @IsNumber()
    @IsOptional()
    @ApiProperty({ description: '부모 카테고리의 id' })
    parentId?: number;
}
