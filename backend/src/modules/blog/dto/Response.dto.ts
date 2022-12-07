import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';

class TagInfoDTO {
    @ApiProperty({ description: '태그의 ID' })
    id: number;

    @ApiProperty({ description: '태그의 이름' })
    name: string;

    @ApiProperty({ description: '해당 태그를 가진 게시글의 개수' })
    articleCount: number;
}

export class BlogBriefResponseDTO {
    @ApiProperty({ description: '사용자의 닉네임' })
    nickname: string;

    @ApiProperty({ description: '사용자의 bio' })
    bio: string;

    @ApiProperty({ description: '사용자의 블로그 이름' })
    blogName: string;

    @ApiProperty({ description: '사용자의 프로필 사진 URL' })
    imageURL: string;

    @ApiProperty({ description: '사용자의 트위터 페이지 URL' })
    twitterLink: string;

    @ApiProperty({ description: '사용자의 페이스북 페이지 URLL' })
    facebookLink: string;

    @ApiProperty({ description: '사용자의 링크드인 사진 URL' })
    linkedinLink: string;

    static toBrief(user: User) {
        const {
            nickname,
            bio,
            blogName,
            imageURL,
            twitterLink,
            facebookLink,
            linkedinLink,
        } = user;
        return {
            nickname,
            bio,
            blogName,
            imageURL,
            twitterLink,
            facebookLink,
            linkedinLink,
        };
    }
}

export class BlogDetailedResponseDTO extends BlogBriefResponseDTO {
    @ApiProperty({
        description: '사용자가 작성한 게시글의 태그 정보',
        isArray: true,
        type: TagInfoDTO,
    })
    tag: TagInfoDTO[];
}
