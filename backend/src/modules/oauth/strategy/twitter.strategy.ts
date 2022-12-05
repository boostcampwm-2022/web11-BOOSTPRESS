import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@prisma/client';
import { Request } from 'express';
import { Strategy } from 'passport-oauth2';
import { Env } from 'src/types';
import { TwitterDTO } from '../dto';
import { OAuthService } from '../oauth.service';

@Injectable()
export class TwitterStrategy extends PassportStrategy(Strategy, 'twitter') {
    constructor(
        private readonly httpService: HttpService,
        private readonly oAuthService: OAuthService,
        config: ConfigService<Env>,
    ) {
        super({
            authorizationURL: 'https://twitter.com/i/oauth2/authorize',
            callbackURL: config.get('TWITTER_REDIRECT_URL'),
            scope: ['tweet.read', 'users.read', 'offline.access'],
            state: true,
            pkce: true,

            tokenURL: 'https://api.twitter.com/2/oauth2/token',
            clientType: 'confidential',
            customHeaders: {
                Authorization:
                    'Basic ' +
                    Buffer.from(
                        `${config.get('TWITTER_CLIENT_ID')}:${config.get(
                            'TWITTER_CLIENT_SECRET',
                        )}`,
                    ).toString('base64'),
            },

            clientID: config.get('TWITTER_CLIENT_ID'),
            clientSecret: config.get('TWITTER_CLIENT_SECRET'),

            passReqToCallback: true,
        });
    }

    async validate(req: Request, accessToken: any) {
        const { data } = await this.httpService.axiosRef.get<TwitterDTO>(
            'https://api.twitter.com/2/users/me',
            { headers: { authorization: `Bearer ${accessToken}` } },
        );

        await this.oAuthService.setTwitter(req.user as User, data);

        return req.user;

        // return req.user;

        // return this.authService.login(data, accessToken);
    }
}
