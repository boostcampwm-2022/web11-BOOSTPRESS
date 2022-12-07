import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { SNSDTO } from './SNS.dto';

export class PatchDTO {
    @IsString()
    @IsOptional()
    @ApiProperty({ description: '사용자의 닉네임' })
    nickname: string;

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

    @IsString()
    @IsOptional()
    @ApiProperty({ description: '사용자의 SNS 링크', type: [SNSDTO] })
    snsLink: SNSDTO[];
}
