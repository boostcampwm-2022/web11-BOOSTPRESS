import { ApiProperty } from '@nestjs/swagger';
import { UserSNS } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';

export class SNSDTO {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: 'SNS의 이름' })
    snsName: string;
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: 'SNS의 링크' })
    link: string;

    static toExport(snsLink: UserSNS): SNSDTO {
        const { name, link } = snsLink;
        return { snsName: name, link };
    }
}
