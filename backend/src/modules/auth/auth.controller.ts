import { Controller, Get, UseGuards } from '@nestjs/common';
import { User } from 'src/decorator';
import { GitHubGuard } from 'src/guard';

@Controller('auth')
export class AuthController {
    @UseGuards(GitHubGuard)
    @Get('github')
    async github(@User() user) {
        return user;
    }
}
