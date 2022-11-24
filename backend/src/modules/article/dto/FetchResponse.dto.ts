import { ApiProperty } from '@nestjs/swagger';

export class FetchResponseDTO {
    @ApiProperty({ description: '깃허브에 존재하는 .md 파일' })
    content: string;
}
