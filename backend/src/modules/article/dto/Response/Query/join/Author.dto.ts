import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';

export class AuthorDTO {
    @ApiProperty({ description: '작성자의 ID' })
    id: number;

    @ApiProperty({ description: '작성자의 닉네임' })
    nickname: string;

    static fromUser(user: User) {
        const { id, nickname } = user;
        return { id, nickname };
    }
}
