import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-oauth2';
import { GitHubAccessTokenDTO } from '../dto';

@Injectable()
export class GitHubStrategy extends PassportStrategy(Strategy, 'github') {
    constructor(config: ConfigService) {
        super({
            authorizationURL: 'https://github.com/login/oauth/authorize',
            scope: ['public_repo', 'read:user'],
            tokenURL: 'https://github.com/login/oauth/access_token',
            clientID: config.get('GITHUB_CLIENT_ID'),
            clientSecret: config.get('GITHUB_CLIENT_SECRET'),
        });
    }

    validate(accessToken: string): GitHubAccessTokenDTO {
        return { accessToken };
    }
}
