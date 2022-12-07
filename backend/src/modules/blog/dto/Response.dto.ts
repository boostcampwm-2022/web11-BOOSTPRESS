import { ApiProperty } from '@nestjs/swagger';
import { User, UserSNS } from '@prisma/client';
import { SNSDTO } from './SNS.dto';

class TagInfoDTO {
    @ApiProperty({ description: '태그의 ID' })
    id: number;

    @ApiProperty({ description: '태그의 이름' })
    name: string;

    @ApiProperty({ description: '해당 태그를 가진 게시글의 개수' })
    articleCount: number;
}

export class JoinDTO {
    snsLink: UserSNS[];
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

    @ApiProperty({ description: '사용자의 SNS 페이지 URL' })
    snsLink: SNSDTO[];

    static toBrief(user: User & JoinDTO) {
        const { nickname, bio, blogName, imageURL, snsLink } = user;

        return {
            nickname,
            bio,
            blogName,
            imageURL,
            snsLink: snsLink.map(SNSDTO.toExport),
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
