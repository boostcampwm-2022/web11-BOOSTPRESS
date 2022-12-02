import { IsNotEmpty, IsString } from 'class-validator';

export class UrlDto {
    @IsString()
    @IsNotEmpty()
    imageURL: string;
}
