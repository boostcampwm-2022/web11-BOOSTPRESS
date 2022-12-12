import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { SessionService } from './session.service';
import { GitHubStrategy, JwtStrategy } from './strategy';
import { TokenService } from './token.service';
import { UserService } from './user.service';

@Module({
    imports: [HttpModule, PassportModule, JwtModule.register({})],
    controllers: [AuthController],
    providers: [
        UserService,
        SessionService,
        TokenService,
        GitHubStrategy,
        JwtStrategy,
    ],
})
export class AuthModule {}
