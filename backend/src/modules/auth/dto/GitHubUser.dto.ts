import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class GitHubUser {
    @IsNumber()
    @IsNotEmpty()
    id: number;

    @IsString()
    @IsNotEmpty()
    login: string;

    // @IsEmail()
    // @IsNotEmpty()
    // email: string;
}
