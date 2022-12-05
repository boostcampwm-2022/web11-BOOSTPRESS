import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class PatchDTO {
    @IsString()
    @IsOptional()
    @ApiProperty({ description: '사용자의 bio' })
    bio: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ description: '사용자의 블로그 이름' })
    blogName: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ description: '사용자의 프로필 사진 URL' })
    imageURL: string;
}