import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
    constructor(private readonly jwtService: JwtService) {}

    create(user: User) {
        return this.jwtService.sign({ sub: user.id });
    }

    verify(token: string) {
        return this.jwtService.verify(token);
    }
}
