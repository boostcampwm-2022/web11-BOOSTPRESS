import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-oauth2';

@Injectable()
export class LinkedInStrategy extends PassportStrategy(Strategy, 'github') {
    constructor(config: ConfigService) {
        super({
            // authorizationURL: 'https://github.com/login/oauth/authorize',
            // scope: ['public_repo', 'read:user', 'user:email'],
            // tokenURL: 'https://github.com/login/oauth/access_token',
            // clientID: config.get('GITHUB_CLIENT_ID'),
            // clientSecret: config.get('GITHUB_CLIENT_SECRET'),
        });
    }
}
