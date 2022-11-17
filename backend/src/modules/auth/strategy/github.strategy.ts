import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-oauth2';
import { AuthService } from '../auth.service';

@Injectable()
export class GitHubStrategy extends PassportStrategy(Strategy, 'github') {
    constructor(
        config: ConfigService,
        private readonly httpService: HttpService,
        private readonly authService: AuthService,
    ) {
        super({
            authorizationURL:
                'https://github.com/login/oauth/authorize?scope=public_repos',
            tokenURL: 'https://github.com/login/oauth/access_token',
            clientID: config.get('GITHUB_CLIENT_ID'),
            clientSecret: config.get('GITHUB_CLIENT_SECRET'),
        });
    }

    async validate(accessToken: string) {
        const { data } = await this.httpService.axiosRef.get(
            'https://api.github.com/user',
            { headers: { Authorization: `Bearer ${accessToken}` } },
        );

        const { id, login: nickname } = data;

        return this.authService.login(id, nickname);
    }
}
