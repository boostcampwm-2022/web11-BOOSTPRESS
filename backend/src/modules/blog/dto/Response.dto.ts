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
    @ApiProperty({ description: '사용자의 bio' })
    bio: string;

    @ApiProperty({ description: '사용자의 블로그 이름' })
    blogName: string;

    @ApiProperty({ description: '사용자의 프로필 사진 URL' })
    imageURL: string;

    static toBrief(user: User) {
        const { bio, blogName, imageURL } = user;
        return { bio, blogName, imageURL };
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
