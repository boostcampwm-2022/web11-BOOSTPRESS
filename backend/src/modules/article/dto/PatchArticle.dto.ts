import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { PostArticleDTO } from './PostArticle.dto';

export class PatchArticleDTO extends PostArticleDTO {
    @ApiProperty({ description: '게시글의 DB id' })
    @IsNumber()
    @IsNotEmpty()
    id: number;

    // @ApiProperty({
    //     description: 'GitHub에서 게시글을 수정할 때 필요한 blob SHA',
    // })
    // @IsString()
    // @IsNotEmpty()
    // sha: string;
}
