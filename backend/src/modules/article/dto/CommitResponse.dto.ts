import { ApiProperty } from '@nestjs/swagger';

class ContentDTO {
    @ApiProperty({ description: '업로드한 .md 파일의 blob 해시값' })
    sha: string;
}

export class CommitResponseDTO {
    @ApiProperty({ description: '업로드한 .md 파일' })
    content: ContentDTO;
}
