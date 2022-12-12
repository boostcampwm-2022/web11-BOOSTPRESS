import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';

export class UserDTO {
    @ApiProperty({ description: '사용자 ID' })
    id: number;

    @ApiProperty({ description: '사용자 닉네임' })
    nickname: string;

    @ApiProperty({ description: '사용자 이메일' })
    email: string;

    @ApiProperty({ description: '사용자의 프로필 사진 URL' })
    imageURL: string;

    static fromUser(user: User) {
        return {
            id: user.id,
            nickname: user.nickname,
            email: user.email,
            imageURL: user.imageURL,
        };
    }
}
