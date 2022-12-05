import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { OAuthController } from './oauth.controller';
import { OAuthService } from './oauth.service';
import { TwitterStrategy } from './strategy';

@Module({
    imports: [HttpModule],
    controllers: [OAuthController],
    providers: [OAuthService, TwitterStrategy],
})
export class OAuthModule {}
