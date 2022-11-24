import { ApiProperty } from '@nestjs/swagger';

export class ExceptionResponse {
    @ApiProperty({ description: 'HTTP 에러 코드' })
    statusCode: number;

    @ApiProperty({ description: '에러 메세지' })
    message: string;

    @ApiProperty()
    error: any;
}
