import { ApiProperty } from '@nestjs/swagger';

export class UserDTO {
    @ApiProperty({ description: '사용자 ID' })
    id: number;

    @ApiProperty({ description: '사용자 닉네임' })
    nickname: string;

    @ApiProperty({ description: '사용자 이메일' })
    email: string;
}
