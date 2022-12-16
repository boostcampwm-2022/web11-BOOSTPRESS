import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class GitHubUserDTO {
    @IsNumber()
    @IsNotEmpty()
    id: number;

    @IsString()
    @IsNotEmpty()
    login: string;
}

export class GitHubAccessTokenDTO {
    @IsString()
    @IsNotEmpty()
    accessToken: string;
}

export class GitHubEmailDTO {
    @IsEmail()
    @IsNotEmpty()
    email: string;
}
