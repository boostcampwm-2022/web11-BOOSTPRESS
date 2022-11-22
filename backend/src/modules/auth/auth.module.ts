import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GitHubStrategy, JwtStrategy } from './strategy';
import { TokenService } from './token.service';

@Module({
    imports: [HttpModule, PassportModule, JwtModule.register({})],
    controllers: [AuthController],
    providers: [AuthService, TokenService, GitHubStrategy, JwtStrategy],

})
export class AuthModule {}
