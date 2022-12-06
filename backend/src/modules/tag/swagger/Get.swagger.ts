import {
    ApiOperationOptions,
    ApiProperty,
    ApiResponseOptions,
} from '@nestjs/swagger';

class TagDTO {
    @ApiProperty({ description: '태그의 ID' })
    id: number;

    @ApiProperty({ description: '태그의 이름' })
    name: string;
}

export const Operation: ApiOperationOptions = {
    summary: '태그 정보 API',
    description: '사전에 정의된 태그 정보를 가져오는 API',
};

export const _200: ApiResponseOptions = {
    status: 200,
    description: '사전에 정의된 태그 정보',
    type: TagDTO,
    isArray: true,
};
