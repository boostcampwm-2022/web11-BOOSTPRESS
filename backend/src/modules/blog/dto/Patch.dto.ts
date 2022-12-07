import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

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
    @ApiProperty({ description: '사용자의 트위터 페이지 URL' })
    twitterLink: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ description: '사용자의 페이스북 페이지 URLL' })
    facebookLink: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ description: '사용자의 링크드인 사진 URL' })
    linkedinLink: string;
}
