import { User } from '@prisma/client';

export class AuthorDTO {
    id: number;
    nickname: string;

    static fromUser(user: User) {
        const { id, nickname } = user;
        return { id, nickname };
    }
}
