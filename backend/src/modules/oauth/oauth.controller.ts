import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { JwtGuard, TwitterGuard } from 'src/guard';
import { Env } from 'src/types';

@Controller('oauth')
export class OAuthController {
    private readonly REDIRECT_URL: string;

    constructor(config: ConfigService<Env>) {
        this.REDIRECT_URL = config.get('REDIRECT_URL');
    }

    @UseGuards(JwtGuard, TwitterGuard)
    @Get('twitter')
    test(@Res({ passthrough: true }) res: Response) {
        res.redirect(this.REDIRECT_URL);
    }
}
