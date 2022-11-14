import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GitHubStrategy } from './strategy';

@Module({
    imports: [HttpModule, PassportModule],
    controllers: [AuthController],
    providers: [AuthService, GitHubStrategy],
})
export class AuthModule {}
