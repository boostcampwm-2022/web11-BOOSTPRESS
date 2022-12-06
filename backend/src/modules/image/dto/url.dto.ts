import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UrlDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: '이미지 URL 경로' })
    imageURL: string;
}
