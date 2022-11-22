import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-oauth2';
import { AuthService } from '../auth.service';

import { GitHubUser } from '../dto';


@Injectable()
export class GitHubStrategy extends PassportStrategy(Strategy, 'github') {
    constructor(
        config: ConfigService,
        private readonly httpService: HttpService,
        private readonly authService: AuthService,
    ) {
        super({
            authorizationURL: 'https://github.com/login/oauth/authorize',

            scope: ['public_repo', 'read:user', 'user:email'],

            tokenURL: 'https://github.com/login/oauth/access_token',
            clientID: config.get('GITHUB_CLIENT_ID'),
            clientSecret: config.get('GITHUB_CLIENT_SECRET'),
        });
    }

    async validate(accessToken: string) {

        const { data } = await this.httpService.axiosRef.get<GitHubUser>(

            'https://api.github.com/user',
            { headers: { Authorization: `Bearer ${accessToken}` } },
        );


        return this.authService.login(data, accessToken);

    }
}
