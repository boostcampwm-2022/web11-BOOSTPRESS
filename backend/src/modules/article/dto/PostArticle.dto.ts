import { IsNotEmpty, IsString } from 'class-validator';

export class PostArticle {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    content: string;
}
