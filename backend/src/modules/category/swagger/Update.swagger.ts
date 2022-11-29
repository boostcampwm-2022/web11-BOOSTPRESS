import { ApiOperationOptions } from '@nestjs/swagger';

export const Operation: ApiOperationOptions = {
    summary: '카테고리 수정 API',
    description: '게시글을 분류할 카테고리를 수정',
};

export const _200 = {
    status: 200,
    description: '수정된 카테고리',
};
