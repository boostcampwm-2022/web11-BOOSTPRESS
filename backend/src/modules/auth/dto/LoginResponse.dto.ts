import { ApiProperty } from '@nestjs/swagger';

class Builder {
    private _nickname: string;
    private _email: string;

    nickname(nickname: string) {
        this._nickname = nickname;
        return this;
    }

    email(email: string) {
        this._email = email;
        return this;
    }

    build() {
        const dto = new LoginResponseDTO();
        dto.email = this._email;
        dto.nickname = this._nickname;

        return dto;
    }
}

export class LoginResponseDTO {
    @ApiProperty({ description: '사용자 닉네임' })
    nickname: string;

    @ApiProperty({ description: '사용자 이메일' })
    email: string;

    static builder() {
        return new Builder();
    }
}
