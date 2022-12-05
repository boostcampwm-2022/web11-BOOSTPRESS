import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class PatchDTO {
    @IsString()
    @IsOptional()
    bio: string;

    @IsString()
    @IsOptional()
    blogName: string;
}
