import { ApiProperty } from '@nestjs/swagger';

class ContentDTO {
    @ApiProperty({ description: '업로드한 .md 파일의 blob 해시값' })
    sha: string;
}

export class GitHubCommitDTO {
    @ApiProperty({ description: '업로드한 .md 파일' })
    content: ContentDTO;
}

export class GitHubReadDTO {
    @ApiProperty({ description: '깃허브에 존재하는 .md 파일의 내용' })
    content: string;
}
