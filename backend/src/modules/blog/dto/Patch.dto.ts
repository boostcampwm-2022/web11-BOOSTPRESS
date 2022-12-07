import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class PatchDTO {
    @IsString()
    @IsOptional()
    bio: string;

    @IsString()
    @IsOptional()
    blogName: string;

    @IsString()
    @IsOptional()
    imageURL: string;

    @IsString()
    @IsOptional()
    twitterLink: string;

    @IsString()
    @IsOptional()
    facebookLink: string;

    @IsString()
    @IsOptional()
    linkedinLink: string;
}
